const fs = require('fs');
const path = require('path');

const updates = [
  { file: 'Branding.tsx', newDesc: "Establish a powerful market presence with the leading Branding Agency in Dubai and Sharjah. From corporate identity design to brand strategy and guidelines, we craft memorable brands that resonate with the UAE market and drive lasting customer loyalty." },
  { file: 'CreativeWebDesign.tsx', newDesc: "Transform your online presence with an elite Creative Web Design Agency in Dubai. We specialize in building visually stunning, high-performance websites optimized for user experience, mobile responsiveness, and maximum lead conversion in the UAE market." },
  { file: 'Design.tsx', newDesc: "Capture your audience's attention with the top Graphic Design Agency in Dubai and Sharjah. Our creative team delivers premium marketing materials, social media graphics, and print designs that elevate your brand and communicate your message effectively." },
  { file: 'EcommerceWebsites.tsx', newDesc: "Maximize your online sales with professional E-Commerce Website Development in Dubai. We build fast, secure, and highly optimized online stores on Shopify, WooCommerce, and custom platforms, designed specifically to turn UAE visitors into loyal customers." },
  { file: 'PPC.tsx', newDesc: "Drive immediate, high-quality traffic with the leading PPC & Google Ads Agency in Dubai. We manage highly targeted pay-per-click campaigns designed to lower your customer acquisition cost, maximize ROI, and dominate the top of Google search results." },
  { file: 'SaaSServices.tsx', newDesc: "Scale your business with the premier SaaS Development Specialist in the UAE. We architect, build, and deploy custom cloud-based software applications that are secure, highly scalable, and tailored to automate your unique enterprise workflows." },
  { file: 'SEO.tsx', newDesc: "Dominate search rankings with the best SEO Agency in Dubai and Sharjah. Our data-driven search engine optimization strategies, technical audits, and high-quality backlink campaigns ensure your website reaches page 1 for the keywords your customers are actually searching." },
  { file: 'SocialMedia.tsx', newDesc: "Grow your audience and drive sales with the top Social Media Management Agency in Dubai. We create engaging content, manage community interactions, and run targeted ad campaigns across Instagram, LinkedIn, and TikTok tailored for the UAE market." },
  { file: 'UIUX.tsx', newDesc: "Deliver flawless digital experiences with an expert UI/UX Design Agency in Dubai. We design intuitive, user-centric interfaces for web and mobile applications that reduce friction, increase engagement, and drive higher conversion rates." },
  { file: 'WebDesign.tsx', newDesc: "Launch a high-converting digital storefront with a premier Web Design Agency in Dubai. We create modern, fast, and SEO-optimized websites that not only look incredible but are strategically built to generate leads and grow your business." },
  { file: 'WebsiteSupport.tsx', newDesc: "Secure your digital assets with reliable Website Maintenance & Support in Dubai. We provide 24/7 monitoring, security updates, regular backups, and technical troubleshooting to ensure your website remains fast, secure, and always online." }
];

const dir = 'c:\\\\Users\\\\USER\\\\Desktop\\\\Asif Agency Website\\\\Ai-agency-wesite\\\\agency-website\\\\src\\\\views\\\\services';

updates.forEach(update => {
  const filePath = path.join(dir, update.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We look for the <p className="... text-xl ..."> block that usually follows the H1 or the Hero section.
    // It's usually the first <p> after </section>
    
    const regex = /(<section[^>]*>[\s\S]*?<\/section>[\s\S]*?<motion\.div[^>]*>[\s\S]*?<p[^>]*>)([\s\S]*?)(<\/p>)/i;
    const match = content.match(regex);
    if (match) {
      content = content.replace(regex, `$1\n            ${update.newDesc}\n          $3`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${update.file}`);
    } else {
      console.log(`Failed to update ${update.file}. Content structure mismatch.`);
    }
  } else {
    console.log(`File not found: ${update.file}`);
  }
});
