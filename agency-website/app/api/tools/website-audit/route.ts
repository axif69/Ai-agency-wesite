import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

type Strategy = "mobile" | "desktop";

function isPrivateIp(address: string) {
  const ip = address.toLowerCase();
  if (ip === "::1" || ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80:")) return true;
  if (ip.startsWith("::ffff:")) return isPrivateIp(ip.slice(7));
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  return false;
}

async function assertPublicUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error("INVALID_URL");
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) throw new Error("PRIVATE_URL");
  const addresses = await lookup(host, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) throw new Error("PRIVATE_URL");
}

async function safeFetch(startUrl: URL) {
  let current = startUrl;
  for (let redirect = 0; redirect < 4; redirect += 1) {
    await assertPublicUrl(current);
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "User-Agent": "AsifDigitalWebsiteGrader/2.0 (+https://www.asifdigital.agency/tools/ai-website-grader)" },
      signal: AbortSignal.timeout(20000),
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("BAD_REDIRECT");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    if (!(response.headers.get("content-type") || "").includes("text/html")) throw new Error("NOT_HTML");
    // Read the body before this request's timeout expires. Lighthouse can take
    // much longer, so deferring response.text() until after it finishes can
    // otherwise leave this body attached to an aborted signal.
    const html = (await response.text()).slice(0, 1500000);
    return { html, finalUrl: current };
  }
  throw new Error("TOO_MANY_REDIRECTS");
}

function clean(value: unknown) {
  return String(value || "").replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1").replace(/`/g, "").slice(0, 700);
}

function score(category: any): number | null {
  return category?.score == null ? null : Math.round(category.score * 100);
}

function metric(audits: any, id: string) {
  const audit = audits?.[id];
  return audit ? { value: audit.numericValue ?? null, displayValue: audit.displayValue || null, score: audit.score ?? null } : null;
}

function normalizeCrux(data: any) {
  const source = data?.loadingExperience;
  if (!source?.metrics) return null;
  const read = (id: string) => source.metrics?.[id] ? { percentile: source.metrics[id].percentile ?? null, category: source.metrics[id].category ?? null } : null;
  return { overallCategory: source.overall_category || null, lcp: read("LARGEST_CONTENTFUL_PAINT_MS"), inp: read("INTERACTION_TO_NEXT_PAINT"), cls: read("CUMULATIVE_LAYOUT_SHIFT_SCORE"), fcp: read("FIRST_CONTENTFUL_PAINT_MS") };
}

function normalizePsi(data: any, strategy: Strategy) {
  const lighthouse = data?.lighthouseResult;
  if (!lighthouse || lighthouse.runtimeError) return null;
  const categories = lighthouse.categories || {};
  const audits = lighthouse.audits || {};
  const opportunities = Object.values(audits as Record<string, any>)
    .filter((audit: any) => audit?.details?.type === "opportunity" && audit.score != null && audit.score < 1)
    .sort((a: any, b: any) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
    .slice(0, 10)
    .map((audit: any) => ({ id: audit.id, title: audit.title, description: clean(audit.description), displayValue: audit.displayValue || null, savingsMs: audit.details?.overallSavingsMs || 0, savingsBytes: audit.details?.overallSavingsBytes || 0 }));

  const failedMap = new Map<string, any>();
  for (const [categoryKey, category] of Object.entries(categories as Record<string, any>)) {
    for (const ref of category.auditRefs || []) {
      const audit = audits[ref.id];
      if (!audit || audit.score == null || audit.score >= 1 || audit.scoreDisplayMode === "notApplicable" || audit.scoreDisplayMode === "manual" || audit.details?.type === "opportunity") continue;
      const existing = failedMap.get(audit.id);
      failedMap.set(audit.id, { id: audit.id, category: existing?.category ? `${existing.category}, ${categoryKey}` : categoryKey, title: audit.title, description: clean(audit.description), displayValue: audit.displayValue || null, score: audit.score });
    }
  }

  const failedAudits = [...failedMap.values()].sort((a, b) => a.score - b.score).slice(0, 18);
  const passedCount = Object.values(audits as Record<string, any>).filter((audit: any) => audit?.score === 1 && audit.scoreDisplayMode !== "notApplicable").length;

  return {
    strategy,
    source: "Google PageSpeed Insights / Lighthouse",
    fetchTime: lighthouse.fetchTime || null,
    lighthouseVersion: lighthouse.lighthouseVersion || null,
    scores: { performance: score(categories.performance), accessibility: score(categories.accessibility), bestPractices: score(categories["best-practices"]), seo: score(categories.seo) },
    metrics: { fcp: metric(audits, "first-contentful-paint"), lcp: metric(audits, "largest-contentful-paint"), speedIndex: metric(audits, "speed-index"), tbt: metric(audits, "total-blocking-time"), cls: metric(audits, "cumulative-layout-shift"), tti: metric(audits, "interactive") },
    fieldData: normalizeCrux(data),
    opportunities,
    failedAudits,
    passedCount,
    warnings: lighthouse.runWarnings || [],
  };
}

async function runPageSpeed(url: URL, strategy: Strategy) {
  const endpoint = new URL("https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url.toString());
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("locale", "en");
  ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach((category) => endpoint.searchParams.append("category", category));
  if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(65000), cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      const report = normalizePsi(data, strategy);
      return report ? { available: true, report } : { available: false, error: "Google returned an incomplete Lighthouse report." };
    }
    const body = await response.json().catch(() => null);
    return { available: false, error: body?.error?.message || `Google PageSpeed returned HTTP ${response.status}.` };
  } catch (error: any) {
    const timedOut = error?.name === "TimeoutError" || error?.name === "AbortError";
    return { available: false, error: timedOut ? "Google PageSpeed timed out." : "Google PageSpeed could not be reached." };
  }
}

function runPageSpeedWithHardLimit(url: URL, strategy: Strategy) {
  return new Promise<any>((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      settled = true;
      resolve({ available: false, error: "Google PageSpeed timed out." });
    }, 70000);
    runPageSpeed(url, strategy).then((result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    }).catch(() => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ available: false, error: "Google PageSpeed could not be reached." });
    });
  });
}

function has(pattern: RegExp, value: string) { return pattern.test(value); }
function textContent(html: string) { return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function clamp(value: number) { return Math.max(0, Math.min(100, Math.round(value))); }
function average(values: Array<number | null | undefined>) { const valid = values.filter((value): value is number => typeof value === "number"); return valid.length ? Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length) : null; }

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 5000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const body = JSON.parse(raw);
    let input = String(body.url || "").trim().slice(0, 500);
    if (!/^https?:\/\//i.test(input)) input = `https://${input}`;
    const requestedUrl = new URL(input);
    await assertPublicUrl(requestedUrl);

    const [{ html, finalUrl }, mobile, desktop] = await Promise.all([safeFetch(requestedUrl), runPageSpeedWithHardLimit(requestedUrl, "mobile"), runPageSpeedWithHardLimit(requestedUrl, "desktop")]);
    const visibleText = textContent(html);
    const signals = {
      title: has(/<title[^>]*>\s*[^<]{10,70}\s*<\/title>/i, html), description: has(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,180}["']/i, html) || has(/<meta[^>]+content=["'][^"']{50,180}["'][^>]+name=["']description["']/i, html), canonical: has(/<link[^>]+rel=["']canonical["']/i, html), viewport: has(/<meta[^>]+name=["']viewport["']/i, html), h1: (html.match(/<h1\b/gi) || []).length === 1, structuredData: has(/application\/ld\+json/i, html), organization: has(/Organization|LocalBusiness|ProfessionalService/i, html), faq: has(/FAQ|Frequently Asked Questions/i, visibleText), aboutContact: has(/href=["'][^"']*(about|contact)/i, html), author: has(/author|reviewed by|written by/i, visibleText), sources: has(/sources|references|methodology/i, visibleText), cta: has(/contact|book|quote|consult|call|whatsapp|get started|request/i, visibleText), form: has(/<form\b/i, html), phoneOrWhatsApp: has(/tel:|wa\.me|whatsapp/i, html), trust: has(/case stud|testimonial|client|review|certif|privacy/i, visibleText), substantialText: visibleText.length > 1800,
    };

    const htmlSeo = clamp([signals.title, signals.description, signals.canonical, signals.h1, signals.structuredData].filter(Boolean).length * 20);
    const conversion = clamp([signals.cta, signals.form, signals.phoneOrWhatsApp, signals.trust, signals.aboutContact].filter(Boolean).length * 20);
    const aiReadiness = clamp([signals.structuredData, signals.organization, signals.faq, signals.aboutContact, signals.author, signals.sources, signals.substantialText].filter(Boolean).length / 7 * 100);
    const mobileReport: any = mobile.available ? mobile.report : null;
    const desktopReport: any = desktop.available ? desktop.report : null;
    const performance = average([mobileReport?.scores.performance, desktopReport?.scores.performance]);
    const technicalSeo = average([mobileReport?.scores.seo, desktopReport?.scores.seo, htmlSeo]);
    const mobileAccessibility = mobileReport?.scores.accessibility ?? desktopReport?.scores.accessibility ?? null;
    const bestPractices = average([mobileReport?.scores.bestPractices, desktopReport?.scores.bestPractices]);
    const verified = performance != null;
    const overall = verified ? clamp((performance || 0) * .25 + (technicalSeo || 0) * .20 + (mobileAccessibility || 0) * .15 + conversion * .15 + aiReadiness * .15 + (bestPractices || 0) * .10) : null;

    const customFindings = [!signals.title && "Add one descriptive page title of a useful length.", !signals.description && "Write a clear meta description for the page.", !signals.canonical && "Add a self-referencing canonical URL.", !signals.h1 && "Use one clear H1 that states the page's primary purpose.", !signals.cta && "Make the primary next action explicit and visible.", !signals.form && !signals.phoneOrWhatsApp && "Add a low-friction enquiry path such as a form, phone or WhatsApp.", !signals.structuredData && "Add structured data that matches visible content.", !signals.author && "Show clear authorship or reviewer information where expertise matters.", !signals.sources && "Add a methodology or sources section for factual guidance.", !signals.substantialText && "Make the page's essential information available as crawlable text."].filter(Boolean);

    return NextResponse.json({
      url: finalUrl.toString(), testedAt: new Date().toISOString(), overall, verified,
      scores: { performance, technicalSeo, mobileAccessibility, bestPractices, conversionReadiness: conversion, aiSearchReadiness: aiReadiness },
      pageSpeed: { mobile, desktop, keyConfigured: Boolean(process.env.PAGESPEED_API_KEY) },
      pageInspection: { source: "Server-side public HTML inspection", htmlSeo, signals, findings: customFindings },
    });
  } catch (error: any) {
    const code = error?.message;
    const message = code === "PRIVATE_URL" || code === "INVALID_URL" ? "Please enter a valid public website URL." : "We could not access that website. Check the URL or try again shortly.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
