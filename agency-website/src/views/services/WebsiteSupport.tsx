"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, RefreshCw, Zap, Lock, HardDrive, Clock, 
  CheckCircle2, ArrowRight, Server, PhoneCall, AlertTriangle,
  HelpCircle, Layers, BarChart3, Wrench
} from "lucide-react";
import Link from "next/link";

export default function WebsiteSupport() {
  // Interactive Downtime Risk Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState(85000); // AED
  const [expectedDowntimeHours, setExpectedDowntimeHours] = useState(4); // hours/month
  const [customerTrustImpact, setCustomerTrustImpact] = useState<"low" | "medium" | "high">("medium");

  // Calculations
  const revenuePerHour = monthlyRevenue / 720;
  const directRevenueLoss = Math.round(revenuePerHour * expectedDowntimeHours);
  const trustMultiplier = customerTrustImpact === "low" ? 1.2 : customerTrustImpact === "medium" ? 2.5 : 4.0;
  const totalFinancialRisk = Math.round(directRevenueLoss * trustMultiplier);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital Website Maintenance Dubai",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/website-maintenance-support-dubai",
    "telephone": "+971545866094",
    "priceRange": "AED 1,500 - AED 8,500 / month",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "24/7 Website Maintenance and Technical Support in Dubai and Sharjah. Rapid 30-minute SLA response times, daily off-site backups, security patching, Core Web Vitals speed optimization, and malware monitoring."
  };

  const faqData = [
    {
      q: "Why does my UAE business need a professional monthly website maintenance contract?",
      a: "An unmaintained website will inevitably slow down, accumulate security vulnerabilities, and suffer broken forms or payment gateways following unmonitored CMS updates. In the competitive UAE market, even a few hours of downtime or a broken checkout can cost thousands of dirhams in lost revenue and permanently damage your brand reputation. A maintenance plan provides proactive 24/7 monitoring, security hardening, and instant technical support whenever you need changes."
    },
    {
      q: "What is your emergency response time (SLA) if our website crashes?",
      a: "Our enterprise maintenance clients benefit from a strict 30-minute emergency response SLA. Our monitoring systems ping your website every 60 seconds from multiple global checkpoints. If downtime or a critical server error is detected, our on-call engineers are automatically alerted to diagnose and resolve the issue immediately."
    },
    {
      q: "How do you test software and plugin updates without risking breaking the live website?",
      a: "We never apply core software or plugin updates directly to your live production environment. We maintain an isolated staging replica of your website. All security patches, plugin updates, and database migrations are thoroughly tested on staging first. Once verified bug-free, updates are deployed to the live website during low-traffic off-peak hours."
    },
    {
      q: "Are website backups included, and where are they stored?",
      a: "Yes. We execute automated daily backups of your complete website files and SQL databases. Backups are stored in redundant, encrypted off-site cloud storage independent of your hosting server. If your server ever suffers a catastrophic hardware failure, we can restore your entire web application in under 15 minutes."
    },
    {
      q: "Can we use our monthly support hours for content updates, banners, and new pages?",
      a: "Yes! Your dedicated monthly support hours can be utilized for any technical or design task: uploading new blog articles, replacing promotional banners, creating new service landing pages, updating pricing tables, or modifying contact forms. Simply send an email or WhatsApp request to our team."
    },
    {
      q: "How do you protect our website against malware, hackers, and DDoS attacks?",
      a: "We deploy active defense protocols: continuous file integrity scanners, real-time Web Application Firewalls (WAF), brute-force login throttling, two-factor authentication (2FA) enforcement, and automated database cleanup to eliminate spam and malicious scripts before they reach your customers."
    },
    {
      q: "Do you monitor and optimize our Google Core Web Vitals and loading speeds?",
      a: "Yes. Over time, new images and content can degrade page speed. Our monthly maintenance audits include Core Web Vitals benchmarking (LCP, FID, CLS), database overhead pruning, image WebP compression, and browser caching optimizations to keep your Google PageSpeed scores in the 90+ range."
    },
    {
      q: "Which platforms and CMS frameworks do you support?",
      a: "We support Next.js, React, Node.js custom web applications, WordPress / WooCommerce, Shopify, Magento / Adobe Commerce, and custom PHP / Laravel systems. Our senior full-stack developers have deep expertise across both modern headless stacks and legacy architectures."
    },
    {
      q: "What happens if we don't use all of our allocated maintenance hours in a month?",
      a: "On our growth and enterprise maintenance tiers, unused support hours rollover for up to 60 days, allowing your team to bank hours for larger seasonal campaigns, annual redesigns, or feature enhancements."
    },
    {
      q: "Will we receive monthly performance and security health reports?",
      a: "Yes. On the first business day of every month, you will receive an executive dashboard report summarizing your website uptime percentage, security scan logs, speed benchmarks, traffic metrics, and a detailed timesheet of all tasks completed."
    },
    {
      q: "How does your service compare to hiring an in-house full-time web developer in Dubai?",
      a: "Hiring an in-house web developer in Dubai costs AED 10,000 to AED 18,000+ per month plus visa, health insurance, gratuity, and office overheads—and a single developer rarely possesses full-stack design, DevOps, security, and SEO skills simultaneously. Asif Digital provides an entire multidisciplinary team of senior architects for a fraction of the cost."
    },
    {
      q: "How quickly can we activate a maintenance plan for our website?",
      a: "We can onboard your website within 24 hours. We begin with a comprehensive 50-point Health & Security Audit, establish automated off-site backups, and configure real-time 24/7 uptime monitoring immediately."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Onboard Your Website to 24/7 Technical Maintenance & Support",
    "description": "The rapid 24-hour onboarding protocol for securing and maintaining corporate websites in Dubai and Sharjah.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "50-Point Technical & Security Audit",
        "text": "We scan your website for broken links, outdated plugins, malware scripts, slow database queries, and server vulnerabilities."
      },
      {
        "@type": "HowToStep",
        "name": "Encrypted Off-Site Backup Setup",
        "text": "We configure daily automated snapshots stored securely across secondary cloud storage locations."
      },
      {
        "@type": "HowToStep",
        "name": "Staging Environment Configuration",
        "text": "We create a secure sandbox clone of your website to test all future updates before going live."
      },
      {
        "@type": "HowToStep",
        "name": "24/7 Uptime & Heartbeat Telemetry",
        "text": "We attach automated 60-second ping monitors that alert our engineers instantly in case of latency spikes or downtime."
      },
      {
        "@type": "HowToStep",
        "name": "Dedicated Support Channel Activation",
        "text": "Your team is granted direct WhatsApp and emergency phone access to our UAE technical desk on +971 54 586 6094."
      }
    ]
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 selection:bg-white/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── 1. Hero Section ── */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="text-white/95 text-xs font-bold tracking-[0.3em] uppercase mb-6 block flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> 24/7 Technical Support &bull; Dubai & Sharjah &bull; UAE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            Website Maintenance <br />
            <span className="italic text-white/50 font-normal">&amp; Support Dubai.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Never lose another customer to a crashed server, broken form, or slow page load. We protect your digital revenue with 24/7 uptime monitoring, 30-minute SLA response times, daily off-site backups, and ongoing speed optimization.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Get Free 50-Point Site Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. SLA & Reliability Metrics ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "30-min", label: "Emergency SLA Response", sub: "Direct Engineer Escalation" },
            { metric: "24/7/365", label: "Automated Uptime Pings", sub: "60-Second Interval Checks" },
            { metric: "Daily", label: "Encrypted Off-Site Backups", sub: "15-Min Disaster Recovery" },
            { metric: "100%", label: "Staging Environment Testing", sub: "Zero Broken Live Updates" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Downtime Risk Calculator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Financial Risk Assessment
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Calculate Your Website Downtime Exposure
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              When a corporate website goes offline or loads with broken checkout forms, the damage extends far beyond the immediate hour. Adjust your numbers below to visualize your monthly revenue at risk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Estimated Monthly Online Revenue:</span>
                  <span className="text-white font-bold">AED {monthlyRevenue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000" 
                  value={monthlyRevenue} 
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Unresolved Outage Hours / Month:</span>
                  <span className="text-white font-bold">{expectedDowntimeHours} hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  step="1" 
                  value={expectedDowntimeHours} 
                  onChange={(e) => setExpectedDowntimeHours(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Brand Reputation & Customer Churn Impact:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setCustomerTrustImpact("low")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${customerTrustImpact === "low" ? "bg-white/20 border border-white text-white" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Low Impact
                  </button>
                  <button
                    onClick={() => setCustomerTrustImpact("medium")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${customerTrustImpact === "medium" ? "bg-yellow-500/20 border border-yellow-400 text-yellow-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Moderate
                  </button>
                  <button
                    onClick={() => setCustomerTrustImpact("high")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${customerTrustImpact === "high" ? "bg-red-500/20 border border-red-400 text-red-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    Severe
                  </button>
                </div>
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className="p-8 rounded-2xl border border-red-500/30 bg-red-950/10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold block mb-1 font-mono text-red-300">
                  Estimated Revenue & Opportunity Loss
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  AED {totalFinancialRisk.toLocaleString()} <span className="text-xs font-sans text-white/50">/ incident</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">Direct Sales Loss:</span>
                  <span className="text-white font-bold">AED {directRevenueLoss.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Asif Digital Protection SLA:</span>
                  <span className="text-emerald-300 font-bold">30-Min Recovery Guarantee</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/80 transition-colors"
                >
                  Protect Your Website Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Comparison Benchmark ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Support Model Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Proactive Maintenance Beats Reactive Break-Fix
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Support Capability</th>
                <th className="py-4 px-4 text-white/40">Do Nothing (DIY)</th>
                <th className="py-4 px-4 text-white/40">Ad-Hoc Freelancer</th>
                <th className="py-4 px-4 text-white/40">In-House Developer</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital Managed Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Emergency Response Speed</td>
                <td className="py-5 px-4 text-red-400">Days to notice</td>
                <td className="py-5 px-4 text-red-400">24 to 48 hours</td>
                <td className="py-5 px-4 text-yellow-400">Working hours only</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">30-Minute SLA (24/7/365)</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Staging Sandbox Testing</td>
                <td className="py-5 px-4 text-red-400">None (breaks live site)</td>
                <td className="py-5 px-4 text-red-400">Rarely used</td>
                <td className="py-5 px-4 text-yellow-400">Manual setup</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Guaranteed Staging Isolation</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Security & Malware Defense</td>
                <td className="py-5 px-4 text-red-400">Zero protection</td>
                <td className="py-5 px-4 text-yellow-400">Basic cleanup after hack</td>
                <td className="py-5 px-4 text-yellow-400">Limited toolset</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Proactive WAF + Daily Scans</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Monthly Hours Rollover</td>
                <td className="py-5 px-4 text-red-400">N/A</td>
                <td className="py-5 px-4 text-red-400">Hourly billing surprises</td>
                <td className="py-5 px-4 text-red-400">Fixed salary overhead</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">60-Day Hours Rollover</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Monthly Investment</td>
                <td className="py-5 px-4 text-red-400">Costly downtime losses</td>
                <td className="py-5 px-4 text-yellow-400">AED 350/hr ad-hoc</td>
                <td className="py-5 px-4 text-red-400">AED 12k - 18k / month</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Predictable Flat Monthly Fee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Full Maintenance Scope ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Comprehensive Protection
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              What's Included in Your Maintenance Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6 text-emerald-400" />,
                title: "24/7/365 Uptime Monitoring",
                desc: "Continuous automated checks pinging your server every 60 seconds from multiple geographic locations to ensure instantaneous outage alerts."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "Safe Staging Plugin Updates",
                desc: "We test all core CMS, theme, and plugin updates in an isolated staging sandbox before pushing clean code to your production site."
              },
              {
                icon: <HardDrive className="w-6 h-6 text-emerald-400" />,
                title: "Daily Encrypted Backups",
                desc: "Complete daily snapshots of files and databases stored securely in off-site cloud storage with 15-minute 1-click restore capabilities."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Speed & Core Web Vitals Audits",
                desc: "Monthly optimization of database overhead, caching rules, and asset compression to maintain 90+ Google PageSpeed scores."
              },
              {
                icon: <Wrench className="w-6 h-6 text-emerald-400" />,
                title: "Content & Design Task Hours",
                desc: "Dedicated monthly developer hours for uploading banners, modifying text, creating new service pages, or tweaking contact forms."
              },
              {
                icon: <Lock className="w-6 h-6 text-emerald-400" />,
                title: "Malware Isolation & Security WAF",
                desc: "Active defense firewalls blocking brute-force attacks, SQL injections, and malicious bot traffic before it harms your site."
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                <div className="mb-5">{f.icon}</div>
                <h3 className="text-xl font-serif text-white mb-3">{f.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Step-by-Step Delivery Roadmap ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
            Onboarding Protocol
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Our 5-Stage Website Security Onboarding
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "50-Point Audit", text: "We inspect your website for broken links, security vulnerabilities, database bloat, and server response lag." },
            { step: "02", title: "Backup Setup", text: "We configure automated daily off-site cloud snapshots to ensure 15-minute disaster recovery." },
            { step: "03", title: "Staging Sandbox", text: "We clone your website to a private staging server to safely test all future updates." },
            { step: "04", title: "24/7 Monitoring", text: "We connect real-time 60-second heartbeat monitors and Web Application Firewalls." },
            { step: "05", title: "Active Support", text: "Your team receives direct WhatsApp access to our UAE technical desk on +971 54 586 6094." }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl font-serif text-emerald-400 mb-4 font-bold">{s.step}</div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (12 FAQs) ── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
              Operational Clarity
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE company directors need to know about website maintenance, security, SLAs, and support hours.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="text-lg md:text-xl font-serif cursor-pointer list-none flex justify-between items-center hover:text-emerald-300 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-white/40 group-open:rotate-45 group-open:text-emerald-400 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block font-semibold">
            Peace of Mind for Your Digital Assets
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Protect Your Website With 24/7 UAE Support.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Get started today with a complimentary 50-point security and performance audit. Our senior engineers will ensure your digital assets are impenetrable, fast, and always online.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Get Free 50-Point Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/971545866094" 
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-green-400" /> WhatsApp +971 54 586 6094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
