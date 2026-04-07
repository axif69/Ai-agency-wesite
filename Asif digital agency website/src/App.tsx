/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages for code splitting and better Page Speed Insights performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Sovereign AI Service Pages
const AgenticFinanceUAE = lazy(() => import("./pages/services/AgenticFinanceUAE"));
const AiHrEmirates = lazy(() => import("./pages/services/AiHrEmirates"));
const LogisticsResilience = lazy(() => import("./pages/services/LogisticsResilience"));
const WhatsAppAutomationGCC = lazy(() => import("./pages/services/WhatsAppAutomationGCC"));

// Geo-optimized service pages lazy loaded
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));
const AiMobileApps = lazy(() => import("./pages/services/AiMobileApps"));
const SaaSServices = lazy(() => import("./pages/services/SaaSServices"));
const GraphicDesign = lazy(() => import("./pages/services/GraphicDesign"));
const SeoAeo = lazy(() => import("./pages/services/SeoAeo"));

// New 13 individual service pages lazy loaded
const WebDesign = lazy(() => import("./pages/services/WebDesign"));
const EcommerceWebsites = lazy(() => import("./pages/services/EcommerceWebsites"));
const WebHosting = lazy(() => import("./pages/services/WebHosting"));
const WebsiteSupport = lazy(() => import("./pages/services/WebsiteSupport"));
const SEO = lazy(() => import("./pages/services/SEO"));
const PPC = lazy(() => import("./pages/services/PPC"));
const SocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const AiServices = lazy(() => import("./pages/services/AiServices"));
const Branding = lazy(() => import("./pages/services/Branding"));
const Design = lazy(() => import("./pages/services/Design"));
const UIUX = lazy(() => import("./pages/services/UIUX"));
const CreativeWebDesign = lazy(() => import("./pages/services/CreativeWebDesign"));

// Loading fallback for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="w-8 h-8 rounded-full border-t-2 border-white animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />

              {/* Sovereign AI Solutions routes */}
              <Route path="services/agentic-finance-uae" element={<AgenticFinanceUAE />} />
              <Route path="services/ai-hr-emirates" element={<AiHrEmirates />} />
              <Route path="services/logistics-resilience" element={<LogisticsResilience />} />
              <Route path="services/whatsapp-automation-gcc" element={<WhatsAppAutomationGCC />} />

              {/* Geo-optimized legacy routes */}
              <Route path="services/ai-web-development-dubai-sharjah" element={<WebDevelopment />} />
              <Route path="services/digital-marketing-agency-uae" element={<DigitalMarketing />} />
              <Route path="services/ai-mobile-apps-dubai" element={<AiMobileApps />} />
              <Route path="services/saas-development-uae" element={<SaaSServices />} />
              <Route path="services/graphic-design-sharjah" element={<GraphicDesign />} />
              <Route path="services/seo-agency-dubai-sharjah" element={<SeoAeo />} />

              {/* 13 individual service pages — geo-keyword URLs for local SEO */}
              <Route path="services/web-design-dubai-sharjah" element={<WebDesign />} />
              <Route path="services/web-development-dubai-uae" element={<WebDevelopment />} />
              <Route path="services/ecommerce-website-development-dubai" element={<EcommerceWebsites />} />
              <Route path="services/web-hosting-uae" element={<WebHosting />} />
              <Route path="services/website-maintenance-support-dubai" element={<WebsiteSupport />} />
              <Route path="services/seo-agency-dubai-sharjah-uae" element={<SEO />} />
              <Route path="services/ppc-google-ads-agency-dubai" element={<PPC />} />
              <Route path="services/social-media-management-dubai-uae" element={<SocialMedia />} />
              <Route path="services/ai-automation-chatbot-dubai" element={<AiServices />} />
              <Route path="services/branding-agency-dubai-sharjah" element={<Branding />} />
              <Route path="services/graphic-design-agency-dubai-sharjah" element={<Design />} />
              <Route path="services/ui-ux-design-agency-dubai" element={<UIUX />} />
              <Route path="services/creative-web-design-dubai" element={<CreativeWebDesign />} />

              <Route path="portfolio" element={<Portfolio />} />
              <Route path="case-studies" element={<CaseStudies />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
            </Route>
          </Routes>
      </Router>
    </HelmetProvider>
  );
}
