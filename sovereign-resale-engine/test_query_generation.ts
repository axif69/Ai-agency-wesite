import { getSetting } from './db';

const DYNAMIC_SEED_MAP: Record<string, string[]> = {
    'Digital Marketing Agencies': [
        'Digital Marketing Agencies',
        'Digital Marketing Companies',
        'B2B Digital Marketing Firms',
        'Digital Advertising Agencies',
        'Performance Marketing Agencies',
        'SEO & Growth Marketing Agencies'
    ],
    'Software Development Companies': [
        'Software Development Companies',
        'Custom Software Development Firms',
        'IT Software Solutions Companies',
        'Web & Mobile App Development Agencies',
        'Software Engineering Companies',
        'Enterprise Software Development'
    ],
    'Commercial Interior Design Fitout Contractors': [
        'Commercial Interior Design Fitout Contractors',
        'Office Fitout Contractors',
        'Turnkey Commercial Interior Design',
        'Corporate Interior Fit Out Companies',
        'Commercial Joinery & Fitout Contractors',
        'Commercial Space Interior Designers'
    ],
    'Corporate Recruitment Staffing Agencies': [
        'Corporate Recruitment Staffing Agencies',
        'Executive Search & Recruitment Firms',
        'B2B Staffing & Manpower Agencies',
        'Corporate Talent Acquisition Consultancy',
        'Headhunting & Recruitment Agencies',
        'Human Resources & Staffing Solutions'
    ],
    'Logistics & Freight Forwarders': [
        'Logistics & Freight Forwarders',
        'Commercial Freight Forwarding Companies',
        'Cargo & Supply Chain Logistics',
        'International Freight Forwarders',
        '3PL Warehousing & Logistics Companies',
        'Air & Sea Freight Forwarders'
    ],
    'Commercial Real Estate Brokers': [
        'Commercial Real Estate Brokers',
        'Commercial Property Consultants',
        'Office & Retail Real Estate Brokers',
        'Corporate Real Estate Advisory',
        'Commercial Property Agents',
        'Industrial & Commercial Real Estate Agency'
    ]
};

const get6SeedsForNiche = (niche: string): string[] => {
    for (const [key, seeds] of Object.entries(DYNAMIC_SEED_MAP)) {
        if (key.toLowerCase() === niche.toLowerCase() || niche.toLowerCase().includes(key.toLowerCase())) {
            return seeds;
        }
    }
    const clean = niche.trim();
    return [
        clean,
        `${clean} Companies`,
        `${clean} Services`,
        `B2B ${clean} Firms`,
        `Leading ${clean} Agencies`,
        `Best ${clean} Solutions`
    ];
};

async function test() {
    const dbLoc = await getSetting('TARGET_LOCATION');
    const loc = String(dbLoc || 'UAE').replace(/[\s,]+$/g, '').trim();
    console.log(`=== 🎯 TESTING MULTI-SEED QUERY GENERATION FOR LOCATION: "${loc}" ===`);
    
    const niches = [
        'Digital Marketing Agencies',
        'Software Development Companies',
        'Commercial Interior Design Fitout Contractors',
        'Corporate Recruitment Staffing Agencies',
        'Logistics & Freight Forwarders',
        'Commercial Real Estate Brokers'
    ];

    let count = 0;
    for (const niche of niches) {
        console.log(`\n📌 Niche: "${niche}"`);
        const seeds = get6SeedsForNiche(niche);
        seeds.forEach((seed, idx) => {
            count++;
            console.log(`  Seed ${idx + 1}: "${seed} ${loc}"`);
        });
    }
    console.log(`\nTotal Seed Queries Generated: ${count}`);
}

test();
