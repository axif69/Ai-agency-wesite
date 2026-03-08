/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import WebDevelopment from "./pages/services/WebDevelopment";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import AiMobileApps from "./pages/services/AiMobileApps";
import SaaSServices from "./pages/services/SaaSServices";
import GraphicDesign from "./pages/services/GraphicDesign";
import SeoAeo from "./pages/services/SeoAeo";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/web-development" element={<WebDevelopment />} />
            <Route path="services/digital-marketing" element={<DigitalMarketing />} />
            <Route path="services/ai-mobile-apps" element={<AiMobileApps />} />
            <Route path="services/saas-services" element={<SaaSServices />} />
            <Route path="services/graphic-design" element={<GraphicDesign />} />
            <Route path="services/seo-aeo" element={<SeoAeo />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
