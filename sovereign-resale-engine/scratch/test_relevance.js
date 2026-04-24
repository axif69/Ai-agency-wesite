import axios from 'axios';
import { isRelevant } from '../search_service.js';

async function testRejection(url) {
    try {
        console.log(`Testing: ${url}`);
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = res.data.toLowerCase();
        const relevant = isRelevant(html);
        console.log(`Relevance: ${relevant}`);
        
        // Check which filters hit
        const forbiddenSectors = [
            'supermarket', 'restaurant', 'school', 'university', 'clinic', 'hospital',
            'wholesale market', 'fashion boutique', 'beauty salon', 'hair salon',
            'directory', 'listing', 'aggregator', 'yellow pages'
        ];
        const hitForbidden = forbiddenSectors.filter(k => html.includes(k));
        console.log(`Hit Forbidden: ${hitForbidden.join(', ')}`);
        
        const BUYER_EXTREME = [
            'marketing agency', 'digital agency', 'digital marketing', 'social media agency',
            'seo agency', 'performance marketing', 'branding agency', 'content marketing',
            'web design', 'creative agency', 'advertising agency', 'media agency', 'pr agency',
            'software development', 'it solutions', 'saas', 'cloud services', 'cloud provider',
            'cybersecurity', 'erp solutions', 'app development', 'ai technology', 'data analytics',
            'it consulting', 'managed services', 'fintech', 'software company', 'tech company',
            'recruitment agency', 'hr consultancy', 'executive search', 'staffing agency',
            'manpower supply', 'headhunting',
            'real estate brokerage', 'property brokerage', 'mortgage broker', 'financial advisory',
            'investment consultancy', 'insurance brokerage', 'wealth management',
            'business coaching', 'corporate training', 'management consultancy',
            'sales training', 'business consultant', 'management consulting',
            'event management', 'event company', 'exhibition company',
            'freight forwarding', 'logistics company', 'customs clearance',
            'healthcare technology', 'medical software', 'law firm', 'legal firm',
            'accounting firm', 'business setup consultancy'
        ];
        const hitBuyer = BUYER_EXTREME.filter(k => html.includes(k));
        console.log(`Hit Buyer: ${hitBuyer.join(', ')}`);
        
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}

testRejection('https://omegainsurance.ae');
