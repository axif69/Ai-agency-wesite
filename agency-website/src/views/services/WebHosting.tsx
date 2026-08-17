"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, Shield, Zap, Lock, HardDrive, Cpu, 
  CheckCircle2, ArrowRight, RefreshCw, Globe, 
  Activity, PhoneCall, HelpCircle, Layers, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function WebHosting() {
  // Interactive Hosting Latency & TTFB Simulator State
  const [dataCenterLocation, setDataCenterLocation] = useState<"uae" | "europe" | "usa">("uae");
  const [monthlyTrafficGb, setMonthlyTrafficGb] = useState(150);

  // Latency & TTFB Calculations
  const ttfbMs = dataCenterLocation === "uae" ? 18 : dataCenterLocation === "europe" ? 145 : 280;
  const pageSpeedGain = dataCenterLocation === "uae" ? "Sub-0.6s Instant Render" : dataCenterLocation === "europe" ? "1.8s Noticeable Delay" : "3.4s High Bounce Risk";
  const dataSovereigntyCompliance = dataCenterLocation === "uae" ? "100% UAE Federal Data Law Compliant" : "Non-Compliant (Cross-Border Transfer)";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Asif Digital: AI Automation, Web & Graphic Design",
    "alternateName": "Asif Digital UAE Cloud Web Hosting",
    "image": "https://www.asifdigital.agency/icon-512.png",
    "url": "https://www.asifdigital.agency/services/web-hosting-uae",
    "telephone": "+971545866094",
    "priceRange": "AED 1,800 - AED 18,000 / year",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Muwaileh Commercial - Industrial Area",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "United Arab Emirates", "GCC"],
    "description": "Ultra-fast UAE cloud web hosting with local data centers in Dubai and Abu Dhabi. Sub-20ms GCC latency, LiteSpeed Enterprise caching, NVMe storage, automated daily backups, and 99.99% uptime SLA."
  };

  const faqData = [
    {
      q: "Why is hosting my website in local UAE data centers better than using cheap US/Europe shared hosting?",
      a: "Physical distance dictates network latency. When a Dubai user accesses a website hosted in the US or Europe, data must travel over 12,000 km across underwater fiber optic cables, adding 200ms to 350ms of Time to First Byte (TTFB) delay. By hosting your website in local UAE data centers (Dubai / Abu Dhabi), network round-trips drop to sub-20ms. This instant page loading directly reduces bounce rates, improves Google Core Web Vitals, and accelerates customer conversions."
    },
    {
      q: "How does local UAE web hosting help with UAE Federal Data Protection Law compliance?",
      a: "Under UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL), businesses that handle sensitive customer data, financial records, or government-related contracts are required to adhere to strict data residency and sovereignty standards. Hosting your website and customer databases on local UAE cloud servers ensures that your company data remains securely stored within national borders."
    },
    {
      q: "What security measures and DDoS protection do you provide?",
      a: "Every hosting tier includes multi-layered enterprise defense: Cloudflare Enterprise DDoS mitigation capable of absorbing multi-terabit volumetric attacks, automated Web Application Firewall (WAF) rule sets that block SQL injections and zero-day exploits, free auto-renewing Wildcard SSL certificates, and daily malware/virus isolation scanners."
    },
    {
      q: "How are backups handled, and how quickly can a website be restored in an emergency?",
      a: "We execute automated daily off-site snapshots stored across redundant secondary storage zones. In the rare event of accidental file deletion, corrupted database updates, or malware attacks, our engineering team can restore your full website and database to any historical restore point within 15 minutes."
    },
    {
      q: "What web server technology do you use to maximize speed?",
      a: "We deploy high-performance LiteSpeed Enterprise web servers paired with LSCache and Redis object caching. LiteSpeed handles thousands of simultaneous connections with negligible CPU overhead compared to traditional slow Apache servers, resulting in up to 6x faster PHP execution and instantaneous dynamic page rendering."
    },
    {
      q: "Do you include corporate email accounts with anti-spam filtering?",
      a: "Yes. We provision secure business email mailboxes linked to your domain (e.g. info@yourcompany.ae), configured with strict SPF, DKIM, and DMARC DNS authentication to ensure 100% email inbox delivery and prevent spoofing or phishing attempts."
    },
    {
      q: "What is your uptime guarantee and Service Level Agreement (SLA)?",
      a: "We guarantee a 99.99% network and server uptime SLA. Our infrastructure is monitored 24 hours a day, 7 days a week, 365 days a year with automated heartbeat checks every 60 seconds. If an anomaly is detected, our on-call engineers receive immediate alerts to resolve it proactively."
    },
    {
      q: "Can you migrate our existing website from another hosting provider without downtime?",
      a: "Yes. Our senior engineers handle the entire migration process end-to-end at zero additional charge. We transfer all website files, databases, SSL certificates, and email mailboxes to our UAE servers on a staging environment first, test thoroughly, and switch DNS records seamlessly with zero downtime for your visitors."
    },
    {
      q: "What type of storage drives power your UAE servers?",
      a: "We exclusively utilize enterprise-grade PCIe NVMe SSD storage in RAID-10 arrays. NVMe drives deliver up to 7,000 MB/s read/write speeds—over 14x faster than standard SATA SSDs and 50x faster than legacy rotational hard drives—ensuring instant database queries."
    },
    {
      q: "Can you scale server resources as our traffic increases during seasonal sales or marketing campaigns?",
      a: "Yes. Our cloud hosting environment is fully elastic. If your company launches a major Black Friday, Ramadan, or Dubai Shopping Festival campaign, we can scale CPU, RAM, and bandwidth allocations on demand with zero server restarts or interruptions."
    },
    {
      q: "How does your technical support work when we need assistance?",
      a: "Unlike budget hosting providers that hide behind robotic automated chatbots or slow overseas ticketing queues, Asif Digital provides direct UAE-based technical support. You can reach our engineering team directly via phone on +971 54 586 6094 or via high-priority WhatsApp for emergency issues."
    },
    {
      q: "How do we get started and choose the right hosting plan for our business?",
      a: "Contact our infrastructure team today. We will analyze your website size, current traffic volume, and application stack to recommend the ideal hosting configuration, complete with a free migration plan."
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
    "name": "How to Migrate Your Website to High-Speed UAE Cloud Hosting",
    "description": "The zero-downtime engineering protocol for transferring web assets to local UAE cloud infrastructure.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Current Infrastructure & Database Audit",
        "text": "We evaluate your current hosting setup, database size, PHP versions, and custom modules to ensure 100% compatibility."
      },
      {
        "@type": "HowToStep",
        "name": "Staging Environment Provisioning",
        "text": "We configure a dedicated UAE LiteSpeed server instance with NVMe storage and Redis caching."
      },
      {
        "@type": "HowToStep",
        "name": "File & Database Synchronization",
        "text": "We transfer all web files, SQL databases, email accounts, and SSL certificates securely using encrypted rsync."
      },
      {
        "@type": "HowToStep",
        "name": "Pre-Launch Testing & Latency Benchmarks",
        "text": "We verify all forms, payment checkouts, and admin logins via a private staging URL."
      },
      {
        "@type": "HowToStep",
        "name": "Zero-Downtime DNS Cutover",
        "text": "We switch domain DNS records to the new UAE server with zero downtime and activate 24/7 uptime telemetry."
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
            <Globe className="w-4 h-4 text-emerald-400" /> Local UAE Cloud &bull; Dubai & Abu Dhabi Data Centers
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
            High-Speed UAE <br />
            <span className="italic text-white/50 font-normal">Cloud Web Hosting.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-3xl">
            Don't force your UAE customers to wait on slow overseas servers. We host your websites in tier-3 local Dubai and Abu Dhabi data centers—delivering sub-20ms latency, LiteSpeed Enterprise caching, automated daily backups, and 99.99% uptime.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2"
            >
              Get Free Migration & Hosting Audit <ArrowRight className="w-4 h-4" />
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

      {/* ── 2. Infrastructure Reliability Metrics ── */}
      <section className="px-6 md:px-12 py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "sub-20ms", label: "Local GCC Network Ping", sub: "Dubai & Abu Dhabi Nodes" },
            { metric: "99.99%", label: "Guaranteed Uptime SLA", sub: "Enterprise Multi-Zone Redundancy" },
            { metric: "PCI-DSS", label: "Security & WAF Shield", sub: "Cloudflare Enterprise Layer" },
            { metric: "Free", label: "Zero-Downtime Migration", sub: "Full White-Glove Transfer" }
          ].map((item, i) => (
            <div key={i} className="text-left border-l border-white/10 pl-6">
              <div className="text-3xl sm:text-4xl font-serif text-white mb-1">{item.metric}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/90">{item.label}</div>
              <div className="text-[11px] text-white/50 font-light mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Interactive Data Residency & Latency Simulator ── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="border border-white/10 rounded-3xl p-8 md:p-12 bg-white/[0.02]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
              Live Network Benchmark
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">
              Compare Server Distance & Response Time
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
              Select where your current web server is located to visualize the network latency experienced by customers browsing from Dubai, Sharjah, Abu Dhabi, or Riyadh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono block mb-3 font-bold">
                  Select Server Location:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setDataCenterLocation("uae")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${dataCenterLocation === "uae" ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    🇦🇪 Local UAE (Dubai)
                  </button>
                  <button
                    onClick={() => setDataCenterLocation("europe")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${dataCenterLocation === "europe" ? "bg-yellow-500/20 border border-yellow-400 text-yellow-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    🇩🇪 Europe (Frankfurt)
                  </button>
                  <button
                    onClick={() => setDataCenterLocation("usa")}
                    className={`py-3 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all ${dataCenterLocation === "usa" ? "bg-red-500/20 border border-red-400 text-red-300" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"}`}
                  >
                    🇺🇸 USA (Virginia)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-sm mb-2 font-mono">
                  <span className="text-white/70">Estimated Monthly Bandwidth:</span>
                  <span className="text-white font-bold">{monthlyTrafficGb} GB / month</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="1000" 
                  step="10" 
                  value={monthlyTrafficGb} 
                  onChange={(e) => setMonthlyTrafficGb(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>

            {/* Output Diagnostics Card */}
            <div className={`p-8 rounded-2xl border transition-all space-y-6 ${dataCenterLocation === "uae" ? "border-emerald-500/30 bg-emerald-950/10" : dataCenterLocation === "europe" ? "border-yellow-500/30 bg-yellow-950/10" : "border-red-500/30 bg-red-950/10"}`}>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold block mb-1 font-mono text-white/60">
                  UAE User Time to First Byte (TTFB)
                </span>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  {ttfbMs} ms <span className="text-xs font-sans text-white/50">({pageSpeedGain})</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">Data Residency:</span>
                  <span className={`font-bold ${dataCenterLocation === "uae" ? "text-emerald-300" : "text-red-400"}`}>{dataSovereigntyCompliance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">LiteSpeed Caching:</span>
                  <span className="text-white font-bold">{dataCenterLocation === "uae" ? "Active (Enterprise Tier)" : "Standard Web Server"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/contact" 
                  className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/80 transition-colors"
                >
                  Migrate to UAE Cloud Hosting <ArrowRight className="w-4 h-4" />
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
            Infrastructure Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            How Asif Digital UAE Hosting Outperforms Shared Providers
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-white/50 font-mono">
                <th className="py-4 pr-6">Hosting Parameter</th>
                <th className="py-4 px-4 text-white/40">Budget Shared (Bluehost/GoDaddy)</th>
                <th className="py-4 px-4 text-white/40">Generic VPS</th>
                <th className="py-4 px-4 text-white/40">Overseas Cloud (AWS US)</th>
                <th className="py-4 pl-6 text-emerald-400 font-bold">Asif Digital UAE Sovereign Cloud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light text-white/80">
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Physical Server Location</td>
                <td className="py-5 px-4 text-red-400">USA / Europe</td>
                <td className="py-5 px-4 text-yellow-400">Germany / Singapore</td>
                <td className="py-5 px-4 text-yellow-400">North America</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Dubai & Abu Dhabi, UAE</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Server Hardware & Disks</td>
                <td className="py-5 px-4 text-red-400">Slow HDD / Shared SATA</td>
                <td className="py-5 px-4 text-yellow-400">Standard Cloud SSD</td>
                <td className="py-5 px-4 text-yellow-400">EBS Volumes</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">PCIe Gen4 NVMe in RAID-10</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Web Server & PHP Accelerator</td>
                <td className="py-5 px-4 text-red-400">Standard Apache</td>
                <td className="py-5 px-4 text-yellow-400">Basic Nginx</td>
                <td className="py-5 px-4 text-yellow-400">Custom Setup Required</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">LiteSpeed Enterprise + Redis Object Cache</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Automated Disaster Backups</td>
                <td className="py-5 px-4 text-red-400">Weekly / Paid Extra</td>
                <td className="py-5 px-4 text-red-400">Manual Config</td>
                <td className="py-5 px-4 text-yellow-400">Paid AWS Snapshots</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Automated Daily Off-Site Snapshots</td>
              </tr>
              <tr>
                <td className="py-5 pr-6 font-medium text-white">Technical Support Speed</td>
                <td className="py-5 px-4 text-red-400">Chatbot / 48hr Ticket</td>
                <td className="py-5 px-4 text-red-400">Unmanaged (DIY)</td>
                <td className="py-5 px-4 text-yellow-400">Expensive Support Tier</td>
                <td className="py-5 pl-6 text-emerald-300 font-semibold">Direct UAE Phone & WhatsApp Escalation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Enterprise Infrastructure Features ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2 font-semibold">
              Engineered for Zero Downtime
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Enterprise Cloud Hosting Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="w-6 h-6 text-emerald-400" />,
                title: "Tier-3 UAE Data Center Nodes",
                desc: "High-security physical data centers located in Dubai and Abu Dhabi with redundant power feeds, precision climate control, and biometrically secured cages."
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "LiteSpeed Enterprise & Redis",
                desc: "Accelerate dynamic website execution by up to 600% with native LiteSpeed server architecture and persistent memory caching."
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "Enterprise WAF & DDoS Shield",
                desc: "Continuous real-time packet inspection blocking brute-force login attempts, SQL injections, and multi-gigabit volumetric network floods."
              },
              {
                icon: <HardDrive className="w-6 h-6 text-emerald-400" />,
                title: "PCIe Gen4 NVMe RAID Storage",
                desc: "Blazing 7,000 MB/s disk read/write throughput ensuring your database queries, image loads, and search filters respond without lag."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
                title: "Automated Daily Offsite Backups",
                desc: "Complete daily snapshots stored across encrypted secondary zones, enabling 1-click restore to any historical state in under 15 minutes."
              },
              {
                icon: <Lock className="w-6 h-6 text-emerald-400" />,
                title: "Free SSL & Corporate Email",
                desc: "Automated Let's Encrypt Wildcard SSL certificates and spam-protected business mailboxes with full SPF, DKIM, and DMARC authentication."
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
            Our 5-Stage Zero-Downtime Migration Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Stack Audit", text: "We inspect your database sizes, PHP configuration, and cron jobs to select the optimal UAE cloud container." },
            { step: "02", title: "Server Setup", text: "We provision a dedicated LiteSpeed instance with NVMe disks and configure SSL certificates." },
            { step: "03", title: "Encrypted Sync", text: "We transfer all web assets and SQL databases securely using encrypted rsync protocols." },
            { step: "04", title: "Staging QA", text: "We verify form submissions, payment checkouts, and admin access on a private testing domain." },
            { step: "05", title: "DNS Cutover", text: "We update DNS records seamlessly with zero visitor downtime and activate 24/7 uptime monitoring." }
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
              Infrastructure Clarity
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm mt-4">
              Everything UAE companies need to know about cloud hosting, data residency, latency, and migration.
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
            Zero-Downtime Migration Included
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Upgrade to Local UAE Cloud Speed Today.
          </h2>
          <p className="text-white/70 font-light text-base leading-relaxed">
            Experience sub-20ms page loads and rock-solid 99.99% uptime. Our engineers will migrate your entire website and email accounts for free.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link 
              href="/contact" 
              className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all flex items-center gap-2 shadow-2xl"
            >
              Start Free Hosting Migration <ArrowRight className="w-4 h-4" />
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
