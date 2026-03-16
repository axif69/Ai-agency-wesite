const fs = require('fs');
const path = require('path');

const services = [
  { id: 'WebDesign', title: 'Web Design', desc: 'Premium web design that converts.' },
  { id: 'WebDevelopment', title: 'Web Development', desc: 'Robust engineering for scalable platforms.' },
  { id: 'EcommerceWebsites', title: 'Ecommerce Websites', desc: 'High-converting online stores.' },
  { id: 'WebHosting', title: 'Web Hosting', desc: 'Lightning-fast secure hosting.' },
  { id: 'WebsiteSupport', title: 'Website Support', desc: '24/7 maintenance and updates.' },
  { id: 'SEO', title: 'Search Engine Optimization', desc: 'Rank #1 on Google.' },
  { id: 'PPC', title: 'Pay-Per-Click Advertising', desc: 'Data-driven paid media campaigns.' },
  { id: 'SocialMedia', title: 'Social Media Management', desc: 'Engaging brand presence across platforms.' },
  { id: 'AiMarketing', title: 'AI Marketing', desc: 'Predictive analytics and autonomous workflows.' },
  { id: 'Branding', title: 'Brand Identity', desc: 'Memorable branding systems.' },
  { id: 'Design', title: 'Graphic Design', desc: 'Stunning visual assets.' },
  { id: 'UIUX', title: 'UI/UX Design', desc: 'User-centric interface architecture.' },
  { id: 'CreativeWebDesign', title: 'Creative Web Design', desc: 'Award-winning digital experiences.' },
];

const template = (title, desc) => `import SEO from "../../components/SEO";
import { motion } from "motion/react";
import { Code, ArrowRight } from "lucide-react";

export default function ServiceTemplate() {
  return (
    <div className="pt-20">
      <SEO title="${title} | Asif Digital" description="${desc}" />
      
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-[#FFD700] text-sm font-bold tracking-widest uppercase mb-4 block">Asif Digital Services</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">${title}</h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            ${desc}
          </p>
          <button className="bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
            Consult With Us
          </button>
        </motion.div>
      </section>

      {/* Content Section Placeholder */}
      <section className="px-6 md:px-12 py-20 bg-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-serif mb-6">Strategic Approach</h2>
            <p className="text-white/60 font-light leading-relaxed">
              We leverage data-driven insights and AI automation to deliver superior results for our ${title} campaigns. Our methodology ensures maximum ROI for UAE enterprises.
            </p>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black/50 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <Code className="w-6 h-6 text-[#FFD700] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2">Core Feature {i}</h4>
                  <p className="text-sm text-white/40">Technical implementation detail highlighting expertise.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`;

const dir = path.join(__dirname, 'src/pages/services');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

services.forEach(s => {
  fs.writeFileSync(path.join(dir, s.id + '.tsx'), template(s.title, s.desc));
});

console.log('Successfully generated 13 service pages.');
