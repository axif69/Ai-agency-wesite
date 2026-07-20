import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
      headers: { "User-Agent": "AsifDigitalWebsiteGrader/1.0 (+https://www.asifdigital.agency/tools/ai-website-grader)" },
      signal: AbortSignal.timeout(15000),
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("BAD_REDIRECT");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) throw new Error("NOT_HTML");
    return { response, finalUrl: current };
  }
  throw new Error("TOO_MANY_REDIRECTS");
}

function has(pattern: RegExp, html: string) {
  return pattern.test(html);
}

function textContent(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function metric(audits: any, id: string) {
  return audits?.[id]?.numericValue ?? null;
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 5000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const body = JSON.parse(raw);
    let input = String(body.url || "").trim().slice(0, 500);
    if (!/^https?:\/\//i.test(input)) input = `https://${input}`;
    const requestedUrl = new URL(input);
    await assertPublicUrl(requestedUrl);

    const [{ response, finalUrl }, pageSpeedResult] = await Promise.all([
      safeFetch(requestedUrl),
      (async () => {
        try {
          const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
          endpoint.searchParams.set("url", requestedUrl.toString());
          endpoint.searchParams.set("strategy", "mobile");
          ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"].forEach((category) => endpoint.searchParams.append("category", category));
          if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
          const psi = await fetch(endpoint, { signal: AbortSignal.timeout(45000) });
          return psi.ok ? await psi.json() : null;
        } catch {
          return null;
        }
      })(),
    ]);

    const html = (await response.text()).slice(0, 1500000);
    const visibleText = textContent(html);
    const categories = pageSpeedResult?.lighthouseResult?.categories;
    const audits = pageSpeedResult?.lighthouseResult?.audits;
    const perf = categories?.performance?.score != null ? categories.performance.score * 100 : null;
    const seo = categories?.seo?.score != null ? categories.seo.score * 100 : null;
    const access = categories?.accessibility?.score != null ? categories.accessibility.score * 100 : null;

    const signals = {
      title: has(/<title[^>]*>\s*[^<]{10,70}\s*<\/title>/i, html),
      description: has(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,180}["']/i, html) || has(/<meta[^>]+content=["'][^"']{50,180}["'][^>]+name=["']description["']/i, html),
      canonical: has(/<link[^>]+rel=["']canonical["']/i, html),
      viewport: has(/<meta[^>]+name=["']viewport["']/i, html),
      h1: (html.match(/<h1\b/gi) || []).length === 1,
      structuredData: has(/application\/ld\+json/i, html),
      organization: has(/Organization|LocalBusiness|ProfessionalService/i, html),
      faq: has(/FAQ|Frequently Asked Questions/i, visibleText),
      aboutContact: has(/href=["'][^"']*(about|contact)/i, html),
      author: has(/author|reviewed by|written by/i, visibleText),
      sources: has(/sources|references|methodology/i, visibleText),
      cta: has(/contact|book|quote|consult|call|whatsapp|get started|request/i, visibleText),
      form: has(/<form\b/i, html),
      phoneOrWhatsApp: has(/tel:|wa\.me|whatsapp/i, html),
      trust: has(/case stud|testimonial|client|review|certif|privacy/i, visibleText),
      substantialText: visibleText.length > 1800,
    };

    const technicalFallback = [signals.title, signals.description, signals.canonical, signals.h1, signals.structuredData].filter(Boolean).length * 20;
    const conversion = clamp([signals.cta, signals.form, signals.phoneOrWhatsApp, signals.trust, signals.aboutContact].filter(Boolean).length * 20);
    const aiReadiness = clamp([signals.structuredData, signals.organization, signals.faq, signals.aboutContact, signals.author, signals.sources, signals.substantialText].filter(Boolean).length / 7 * 100);
    const scores = {
      performance: clamp(perf ?? 55),
      technicalSeo: clamp(seo ?? technicalFallback),
      mobileAccessibility: clamp(access ?? ([signals.viewport, signals.h1, signals.title].filter(Boolean).length / 3 * 100)),
      conversionReadiness: conversion,
      aiSearchReadiness: aiReadiness,
    };
    const overall = clamp(scores.performance * .25 + scores.technicalSeo * .20 + scores.mobileAccessibility * .15 + scores.conversionReadiness * .20 + scores.aiSearchReadiness * .20);

    const findings = [
      !signals.title && "Add one descriptive page title of a useful length.",
      !signals.description && "Write a clear meta description for the page.",
      !signals.canonical && "Add a self-referencing canonical URL.",
      !signals.h1 && "Use one clear H1 that states the page's primary purpose.",
      !signals.cta && "Make the primary next action explicit and visible.",
      !signals.form && !signals.phoneOrWhatsApp && "Add a low-friction enquiry path such as a form, phone or WhatsApp.",
      !signals.structuredData && "Add structured data that matches visible content.",
      !signals.author && "Show clear authorship or reviewer information where expertise matters.",
      !signals.sources && "Add a methodology or sources section for factual guidance.",
      !signals.substantialText && "Make the page's essential information available as crawlable text.",
    ].filter(Boolean).slice(0, 8);

    return NextResponse.json({
      url: finalUrl.toString(),
      testedAt: new Date().toISOString(),
      overall,
      scores,
      metrics: {
        lcpMs: metric(audits, "largest-contentful-paint"),
        cls: audits?.["cumulative-layout-shift"]?.numericValue ?? null,
        tbtMs: metric(audits, "total-blocking-time"),
        pageSpeedAvailable: Boolean(pageSpeedResult),
      },
      signals,
      findings,
    });
  } catch (error: any) {
    const code = error?.message;
    const message = code === "PRIVATE_URL" || code === "INVALID_URL"
      ? "Please enter a valid public website URL."
      : "We could not access that website. Check the URL or try again shortly.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

