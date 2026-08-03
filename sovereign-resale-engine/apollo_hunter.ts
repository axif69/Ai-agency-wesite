import axios from 'axios';
import { decryptLocalSecret } from './crypto_utils';
import { cleanContactName, isConsumerEmail, isGenericMailbox } from './contact_validation';
import { cleanCompanyName } from './search_service';

export interface ApolloResult {
    name: string;
    title: string;
    email: string | null;
    linkedinUrl: string | null;
    phone: string | null;
    source: 'apollo';
}

export interface HunterResult {
    name: string;
    email: string;
    position: string | null;
    confidence: number;
    source: 'hunter';
}

export interface ThirdPartyResult {
    name: string;
    title: string | null;
    email: string | null;
    linkedinUrl: string | null;
    phone: string | null;
    source: 'apollo' | 'hunter';
    confidence: number;
}

export async function lookupExecutiveViaApollo(companyName: string, domain: string, apolloApiKey: string): Promise<ApolloResult | null> {
    try {
        const cleanedCompany = cleanCompanyName(companyName);
        const response = await axios.post(
            'https://api.apollo.io/v1/mixed_people/search',
            {
                q_organization_domains: domain,
                person_seniorities: ['c_suite', 'founder', 'owner', 'partner', 'director', 'vp'],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'x-api-key': apolloApiKey
                },
                timeout: 10000
            }
        );

        if (response.data && response.data.people && response.data.people.length > 0) {
            for (const person of response.data.people) {
                const rawName = person.name || `${person.first_name || ''} ${person.last_name || ''}`.trim();
                const name = cleanContactName(rawName);
                const email = person.email;
                if (email && !isConsumerEmail(email) && !isGenericMailbox(email)) {
                    return {
                        name,
                        title: person.title || '',
                        email: email,
                        linkedinUrl: person.linkedin_url || null,
                        phone: person.phone_number || null,
                        source: 'apollo'
                    };
                }
            }
            
            const firstPerson = response.data.people[0];
            const rawName = firstPerson.name || `${firstPerson.first_name || ''} ${firstPerson.last_name || ''}`.trim();
            const name = cleanContactName(rawName);
            return {
                name,
                title: firstPerson.title || '',
                email: null,
                linkedinUrl: firstPerson.linkedin_url || null,
                phone: firstPerson.phone_number || null,
                source: 'apollo'
            };
        }
    } catch (error: any) {
        if (error.response) {
            console.warn(`Apollo API error: ${error.response.status} - ${error.message}`);
        } else {
            console.warn(`Apollo API request failed: ${error.message}`);
        }
    }
    return null;
}

export async function lookupEmailViaHunter(companyName: string, domain: string, hunterApiKey: string): Promise<HunterResult | null> {
    try {
        const cleanedCompany = cleanCompanyName(companyName);
        const response = await axios.get(
            `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&api_key=${encodeURIComponent(hunterApiKey)}&type=personal&seniority=executive,senior`,
            { timeout: 10000 }
        );

        if (response.data && response.data.data && response.data.data.emails && response.data.data.emails.length > 0) {
            for (const emailObj of response.data.data.emails) {
                const email = emailObj.value;
                if (email && !isConsumerEmail(email) && !isGenericMailbox(email)) {
                    const rawName = `${emailObj.first_name || ''} ${emailObj.last_name || ''}`.trim();
                    const name = cleanContactName(rawName);
                    return {
                        name,
                        email,
                        position: emailObj.position || null,
                        confidence: emailObj.confidence || 0,
                        source: 'hunter'
                    };
                }
            }
            
            const first = response.data.data.emails[0];
            const rawName = `${first.first_name || ''} ${first.last_name || ''}`.trim();
            const name = cleanContactName(rawName);
            return {
                name,
                email: first.value,
                position: first.position || null,
                confidence: first.confidence || 0,
                source: 'hunter'
            };
        }
    } catch (error: any) {
        if (error.response) {
            console.warn(`Hunter API error: ${error.response.status} - ${error.message}`);
        } else {
            console.warn(`Hunter API request failed: ${error.message}`);
        }
    }
    return null;
}

export async function enrichWithThirdParty(companyName: string, domain: string, config: any): Promise<ThirdPartyResult | null> {
    try {
        let apolloKey = config.apollo_api_key || config.APOLLO_API_KEY;
        if (apolloKey && apolloKey.startsWith('enc_v1:')) {
            apolloKey = await decryptLocalSecret(apolloKey);
        }

        if (apolloKey) {
            const apolloRes = await lookupExecutiveViaApollo(companyName, domain, apolloKey);
            if (apolloRes) {
                return {
                    name: apolloRes.name,
                    title: apolloRes.title,
                    email: apolloRes.email,
                    linkedinUrl: apolloRes.linkedinUrl,
                    phone: apolloRes.phone,
                    source: 'apollo',
                    confidence: 90
                };
            }
        }

        let hunterKey = config.hunter_api_key || config.HUNTER_API_KEY;
        if (hunterKey && hunterKey.startsWith('enc_v1:')) {
            hunterKey = await decryptLocalSecret(hunterKey);
        }

        if (hunterKey) {
            const hunterRes = await lookupEmailViaHunter(companyName, domain, hunterKey);
            if (hunterRes) {
                return {
                    name: hunterRes.name,
                    title: hunterRes.position,
                    email: hunterRes.email,
                    linkedinUrl: null,
                    phone: null,
                    source: 'hunter',
                    confidence: hunterRes.confidence
                };
            }
        }
    } catch (error) {
        console.warn('Error during third party enrichment:', error);
    }
    
    return null;
}
