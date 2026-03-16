/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Existing geo-optimized service pages
import WebDevelopment from "./pages/services/WebDevelopment";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import AiMobileApps from "./pages/services/AiMobileApps";
import SaaSServices from "./pages/services/SaaSServices";
import GraphicDesign from "./pages/services/GraphicDesign";
import SeoAeo from "./pages/services/SeoAeo";

// New 13 individual service pages
import WebDesign from "./pages/services/WebDesign";
import EcommerceWebsites from "./pages/services/EcommerceWebsites";
import WebHosting from "./pages/services/WebHosting";
import WebsiteSupport from "./pages/services/WebsiteSupport";
import SEO from "./pages/services/SEO";
import PPC from "./pages/services/PPC";
import SocialMedia from "./pages/services/SocialMedia";
import AiServices from "./pages/services/AiServices";
import Branding from "./pages/services/Branding";
import Design from "./pages/services/Design";
import UIUX from "./pages/services/UIUX";
import CreativeWebDesign from "./pages/services/CreativeWebDesign";

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
