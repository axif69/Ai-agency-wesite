export interface CaseStudy {
  id: number;
  service: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  img: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    service: "Sovereign AI Hub",
    client: "Al-Mansour Capital",
    industry: "Institutional Finance",
    title: "How Autonomous SDR Swarms Generated a $14M Investment Pipeline in 45 Days",
    challenge: "Al-Mansour Capital was struggling with traditional outreach. Their high-ticket investment products required deep cultural nuance that generic offshore SDRs couldn't provide, leading to a 0.8% reply rate.",
    solution: "We deployed a 'Sovereign Sales Swarm'—a cluster of autonomous agents fine-tuned on Khaleeji business etiquette and OSINT intelligence.",
    results: [
      "Reply rates increased from 0.8% to 22.4%",
      "41 qualified board-level meetings secured in 45 days",
      "$14M in attributable investment pipeline generated",
      "Cost-per-meeting reduced by 74%"
    ],
    tags: ["Autonomous SDR", "Khaleeji NLP", "B2B Sales"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 2,
    service: "Arabic NLP Engineering",
    client: "Elite Legal Partners UAE",
    industry: "Legal & Compliance",
    title: "Reducing Arabic Contract Review Time by 92% Using Sovereign Arabic LLMs",
    challenge: "Elite Legal Partners handled thousands of complex Arabic real estate contracts monthly. Manual review was slow, expensive, and prone to human error.",
    solution: "We engineered a private, sovereign Arabic LLM fine-tuned on UAE Federal Decree-Law No. 45. The system automated the gap analysis and risk assessment.",
    results: [
      "Review time per document reduced from 4 hours to 18 minutes",
      "92% reduction in manual legal paralegal hours",
      "Zero-data-leakage architecture compliant with UAE law",
      "Annual operational savings of AED 1.2M"
    ],
    tags: ["Arabic NLP", "LegalTech", "Sovereign LLM"],
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 3,
    service: "Real Estate Intelligence",
    client: "Palm Jumeirah Developers",
    industry: "Real Estate",
    title: "Closing AED 25M in Luxury Off-Plan Sales via Predictive Intent Mapping",
    challenge: "Traditional ad campaigns for luxury off-plan projects were yielding low-quality 'tire-kicker' leads.",
    solution: "We implemented 'Predictive Intent Mapping.' By analyzing DLD transaction records and global capital flight patterns, we identified the specific moment investors were moving into Dubai.",
    results: [
      "AED 25M in attributable off-plan sales in 30 days",
      "Lead-to-Viewing conversion rate increased by 310%",
      "Targeted HNW investors from 14 different countries",
      "Total marketing ROI of 18.4x"
    ],
    tags: ["Predictive AI", "DLD Integration", "Real Estate"],
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 4,
    service: "Sovereign Wealth AI",
    client: "Al-Zayani Family Office",
    industry: "Private Wealth",
    title: "Portfolio Intelligence Hub: Automating Analysis for a $2B Multi-Asset Portfolio",
    challenge: "The family office was relying on manual Excel reporting for a global portfolio spanning Real Estate, Equities, and Private Equity, leading to 2-week delays in reporting.",
    solution: "We built a private 'Sovereign Intelligence Hub' that ingested live data from 12 different bank APIs and real estate portals, providing a real-time, AI-powered dashboard for the board.",
    results: [
      "Real-time visibility into $2B across 4 continents",
      "Reporting cycle reduced from 14 days to 0 days",
      "Identified $4.2M in annual fee leakages across custodian banks",
      "Board-level strategic pivots now based on live data"
    ],
    tags: ["WealthTech", "Private Equity", "AI Reporting"],
    img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 5,
    service: "AI Automation",
    client: "Gulf Logistics FZCO",
    industry: "Logistics & Supply Chain",
    title: "AI Automation That Saved 2,400 Employee Hours Per Month and Cut Operational Costs by 38%",
    challenge: "Gulf Logistics employed 8 full-time staff for manual data entry and shipment updates. Errors were frequent and client satisfaction was falling.",
    solution: "We built an n8n-powered automation ecosystem with a WhatsApp AI chatbot for shipment queries and a GPT-4 email triage system.",
    results: ["2,400 manual employee hours saved monthly", "Operational cost reduction of 38%", "Client query response time from 4 hours to under 2 minutes", "Customer satisfaction improved from 6.2 to 9.1 / 10"],
    tags: ["AI Automation", "Chatbot Development", "Process Automation"],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 6,
    service: "Web Design + SEO",
    client: "Zenith Properties Dubai",
    industry: "Real Estate",
    title: "How a New Website & SEO Strategy Generated AED 4.2M in Property Sales in 90 Days",
    challenge: "Zenith Properties had an outdated website that ranked on page 4 of Google. Their competitors were capturing leads they should have been winning.",
    solution: "We redesigned the entire website and executed a Local SEO campaign targeting 'luxury apartments Dubai' and 'off-plan properties Dubai Marina'.",
    results: ["Ranked #1 for 'luxury apartments Dubai' in 11 weeks", "Bounce rate reduced from 78% to 34%", "312% increase in qualified organic leads", "AED 4.2M in attributable property sales within 90 days"],
    tags: ["Web Design", "SEO", "Local SEO"],
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 7,
    service: "Ecommerce + PPC",
    client: "TechGadgets UAE",
    industry: "E-Commerce / Retail",
    title: "Rebuilding an Ecommerce Platform That Increased Revenue by 340% in 6 Months",
    challenge: "The existing WooCommerce store had a 4.1-second mobile load time and a high cost-per-acquisition.",
    solution: "We migrated to a headless Next.js + Shopify architecture and rebuilt Google Shopping campaigns with smart bidding strategies.",
    results: ["Page load time reduced from 4.1s to 1.4s", "Mobile conversion rate up 187%", "Cost-per-acquisition reduced from AED 87 to AED 31", "Monthly revenue increased 340%"],
    tags: ["Ecommerce", "PPC", "Web Development"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 8,
    service: "UI/UX Redesign",
    client: "Meza Health — Dubai",
    industry: "HealthTech / SaaS",
    title: "UI/UX Redesign That Increased SaaS Trial-to-Paid Conversion by 210%",
    challenge: "Meza Health's onboarding flow confused new users—only 11% of free trial users were converting to paid plans.",
    solution: "We conducted 12 user interviews and identification of 7 friction points, redesigning the entire in-app experience from the ground up.",
    results: ["Trial-to-paid conversion rate increased from 11% to 34%", "Support tickets reduced by 71%", "Net Promoter Score improved from 28 to 67", "Time-to-first-value reduced to 4 minutes"],
    tags: ["UI/UX Design", "SaaS", "User Research"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 9,
    service: "Social Media + Branding",
    client: "Aurum Café — Sharjah",
    industry: "Food & Beverage",
    title: "How a Sharjah Café Grew from 800 to 28,000 Instagram Followers and 5x Revenue",
    challenge: "Aurum Café had no social media strategy and excellent food was invisible online, relying entirely on walk-in traffic.",
    solution: "Created a complete brand identity and executed a content strategy anchored on Reels and micro-influencer collaborations.",
    results: ["Instagram: 800 → 28,000 followers in 12 months", "Average post reach increased from 200 to 14,000", "Saturday revenue increased 5x", "Featured in Time Out Dubai"],
    tags: ["Social Media", "Branding", "Graphic Design"],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format,compress&fm=webp&q=75&w=1200"
  },
  {
    id: 10,
    service: "PPC + Landing Page",
    client: "AutoElite — Sharjah",
    industry: "Automotive",
    title: "Google Ads Overhaul That Reduced Cost Per Lead from AED 420 to AED 67",
    challenge: "AutoElite was spending AED 35,000/month with a high cost-per-lead and zero conversion tracking.",
    solution: "Rebuilt account structure with themed ad groups, 6 dedicated landing pages, and implemented server-side tracking.",
    results: ["Cost-per-lead reduced by 84%", "Monthly leads increased from 83 to 410", "Ad spend maintained at original level", "Test drive bookings increased 5x"],
    tags: ["PPC", "Google Ads", "Landing Page Design"],
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format,compress&fm=webp&q=75&w=1200"
  }
];
