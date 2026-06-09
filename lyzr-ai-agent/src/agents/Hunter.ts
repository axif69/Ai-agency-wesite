import axios from 'axios';
import { addLog, transition } from '../server/db';
import { sleep } from '../lib/throttle';
import { pickBestCandidate, parseDesignations, scoreTitle } from '../lib/titles';
import { renderPage } from '../lib/browserScraper';
import { findEmail } from '../lib/emailVerifier';
import { findPhones } from '../lib/phoneExtractor';

// ─── Google Search for LinkedIn Profiles ──────────────────────────────────────
const searchLinkedIn = async (companyName: string, titles: string[]): Promise<{ name: string; linkedin: string; title: string } | null> => {
  const query = `site:linkedin.com/in ${companyName} ${titles.slice(0, 3).join(' OR ')}`;
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;

  try {
    addLog('HUNTER', `🔍 Google search: ${query.slice(0, 60)}...`, 'INFO');
    const { links } = await renderPage(searchUrl);

    // Extract LinkedIn profile URLs (links is array of {href, text} objects)
    const linkedinLinks = links
      .map(link => link.href)
      .filter(href =>
        href.includes('linkedin.com/in/') && !href.includes('/pub/dir/')
      );

    if (linkedinLinks.length === 0) return null;

    // Try to extract name from LinkedIn URL
    const linkedinUrl = linkedinLinks[0];
    const nameMatch = linkedinUrl.match(/linkedin\.com\/in\/([^\/]+)/);
    if (!nameMatch) return null;

    const name = nameMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
      name,
      linkedin: linkedinUrl,
      title: 'Executive'
    };
  } catch (error: any) {
    addLog('HUNTER', `Google search failed: ${error.message}`, 'WARNING');
    return null;
  }
};

// ─── Website Scraping for Contact Details ─────────────────────────────────────
const scrapeWebsiteContacts = async (website: string): Promise<{ email: string; phone: string } | null> => {
  try {
    addLog('HUNTER', `🌐 Scraping website for contacts: ${website}`, 'INFO');
    const { text } = await renderPage(website);

    // Extract emails using regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];

    // Filter out common non-business emails
    const businessEmails = emails.filter(email =>
      !email.match(/@(gmail|yahoo|hotmail|outlook|icloud|aol)\./i) &&
      !email.includes('example') &&
      !email.includes('test')
    );

    // Extract phone numbers (international formats)
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const phones = text.match(phoneRegex) || [];

    if (businessEmails.length === 0 && phones.length === 0) {
      return null;
    }

    return {
      email: businessEmails[0] || '',
      phone: phones[0] || ''
    };
  } catch (error: any) {
    addLog('HUNTER', `Website scraping failed: ${error.message}`, 'WARNING');
    return null;
  }
};

export class Hunter {
  static async process(lead: any, campaign: any) {
    const apolloKey = campaign.apollo_key;
    const titles = parseDesignations(campaign.target_designations);

    addLog('HUNTER', `Sniping C-Suite for ${lead.company_name}...`, 'INFO');
    if (!transition(lead.id, 'HUNTING')) return;

    // Mandatory 15-45s stealth delay before any call
    await sleep();

    const domain = lead.website.replace(/^https?:\/\//, '').split('/')[0];

    // Try Apollo API if key exists, otherwise skip to fallbacks
    if (apolloKey) {
      try {
        addLog('HUNTER', `Trying Apollo API for ${lead.company_name}...`, 'INFO');
        // Apollo v1 — header-auth mixed_people search returns up to 25 candidates
        const searchRes = await axios.post(
          'https://api.apollo.io/v1/mixed_people/search',
          {
            q_organization_domains: domain,
            person_titles: titles,
            page: 1,
            per_page: 25,
          },
          {
            headers: {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json',
              'X-Api-Key': apolloKey,
            },
            timeout: 20000,
          }
        );

        const people: any[] = searchRes.data?.people || [];
        if (people.length === 0) {
          addLog('HUNTER', `No Apollo hits for ${lead.company_name}. Trying Google search...`, 'WARNING');

          // Fallback to Google search for LinkedIn
          const linkedinResult = await searchLinkedIn(lead.company_name, titles);
          if (linkedinResult) {
            addLog('HUNTER', `Found LinkedIn profile: ${linkedinResult.linkedin}`, 'INFO');
            transition(
              lead.id,
              'DRAFTING',
              'contact_name = ?, top_designation = ?, contact_linkedin = ?',
              [linkedinResult.name, linkedinResult.title, linkedinResult.linkedin]
            );
            addLog('HUNTER', `✓ ${linkedinResult.name} via Google search for ${lead.company_name}`, 'SUCCESS');
            return;
          }

          // Third fallback: scrape company website for contacts
          if (lead.website) {
            addLog('HUNTER', `Google search failed. Trying website scraping...`, 'WARNING');
            const websiteContacts = await scrapeWebsiteContacts(lead.website);
            if (websiteContacts && (websiteContacts.email || websiteContacts.phone)) {
              addLog('HUNTER', `Found contacts on website: ${websiteContacts.email || websiteContacts.phone}`, 'INFO');
              transition(
                lead.id,
                'VERIFIED',
                'verified_email = ?, verified_mobile = ?',
                [websiteContacts.email || '', websiteContacts.phone || '']
              );
              addLog('HUNTER', `✓ Website contacts for ${lead.company_name} - moved to Verified Leads`, 'SUCCESS');
              return;
            }
          }

          transition(lead.id, 'HUNT_FAILED');
          return;
        }

        // Rank by Top-6 priority + Global/EMEA boost
        const best = pickBestCandidate(people);
        if (!best) {
          addLog('HUNTER', `No qualifying C-suite title in Apollo results for ${lead.company_name}.`, 'WARNING');
          transition(lead.id, 'HUNT_FAILED');
          return;
        }

        // Enrich the chosen person to get email + phone (separate Apollo endpoint)
        let email: string = best.email || '';
        let phone: string = best.phone_numbers?.[0]?.sanitized_number || best.phone_numbers?.[0]?.raw_number || '';

        if (!email && best.id) {
          try {
            await sleep(3000, 8000); // small gap between Apollo calls
            const enrichRes = await axios.post(
              'https://api.apollo.io/v1/people/match',
              { id: best.id, reveal_personal_emails: true, reveal_phone_number: true },
              {
                headers: {
                  'Cache-Control': 'no-cache',
                  'Content-Type': 'application/json',
                  'X-Api-Key': apolloKey,
                },
                timeout: 20000,
              }
            );
            const p = enrichRes.data?.person;
            email = email || p?.email || '';
            phone = phone || p?.phone_numbers?.[0]?.sanitized_number || '';
          } catch (_) {}
        }

        if (!email) {
          addLog('HUNTER', `Apollo returned ${best.first_name} ${best.last_name} but no verified email.`, 'WARNING');
          transition(lead.id, 'HUNT_FAILED');
          return;
        }

        const fullName = `${best.first_name || ''} ${best.last_name || ''}`.trim();
        const rank = scoreTitle(best.title || '');

        // Additional verification with email verifier if Apollo email exists
        let verifiedEmail = email;
        if (email && lead.website) {
          const emailCheck = await findEmail(fullName, domain, lead.company_name);
          if (emailCheck && emailCheck.confidence === 'verified-public') {
            verifiedEmail = emailCheck.email;
            addLog('HUNTER', `✓ Email verified via public sources: ${emailCheck.email}`, 'INFO');
          }
        }

        // Phone extraction if Apollo didn't provide phone
        let verifiedPhone = phone || 'N/A';
        if (!phone && lead.website) {
          const phones = await findPhones(lead.website, lead.country, fullName);
          if (phones.length > 0) {
            verifiedPhone = phones[0].phone;
            addLog('HUNTER', `✓ Phone extracted from website: ${phones[0].phone}`, 'INFO');
          }
        }

        transition(
          lead.id,
          'DRAFTING',
          'contact_name = ?, top_designation = ?, verified_email = ?, verified_mobile = ?, contact_linkedin = ?',
          [fullName, best.title || 'Executive', verifiedEmail, verifiedPhone, best.linkedin_url || '']
        );

        addLog(
          'HUNTER',
          `\u2713 ${fullName} [${best.title}] (score ${rank}) for ${lead.company_name}.`,
          'SUCCESS'
        );
      } catch (error: any) {
        const status = error.response?.status;
        const detail = status === 401 ? 'Invalid Apollo key' : error.message;
        addLog('HUNTER', `Apollo API Error (${status || 'net'}): ${detail}. Trying fallbacks...`, 'ERROR');
        
        // Fall back to Google search on Apollo error
        const linkedinResult = await searchLinkedIn(lead.company_name, titles);
        if (linkedinResult) {
          addLog('HUNTER', `Found LinkedIn profile: ${linkedinResult.linkedin}`, 'INFO');
          transition(
            lead.id,
            'DRAFTING',
            'contact_name = ?, top_designation = ?, contact_linkedin = ?',
            [linkedinResult.name, linkedinResult.title, linkedinResult.linkedin]
          );
          addLog('HUNTER', `✓ ${linkedinResult.name} via Google search for ${lead.company_name}`, 'SUCCESS');
          return;
        }

        // Third fallback: scrape company website for contacts
        if (lead.website) {
          addLog('HUNTER', `Google search failed. Trying website scraping...`, 'WARNING');
          const websiteContacts = await scrapeWebsiteContacts(lead.website);
          if (websiteContacts && (websiteContacts.email || websiteContacts.phone)) {
            addLog('HUNTER', `Found contacts on website: ${websiteContacts.email || websiteContacts.phone}`, 'INFO');
            transition(
              lead.id,
              'VERIFIED',
              'verified_email = ?, verified_mobile = ?',
              [websiteContacts.email || '', websiteContacts.phone || '']
            );
            addLog('HUNTER', `✓ Website contacts for ${lead.company_name} - moved to Verified Leads`, 'SUCCESS');
            return;
          }
        }

        transition(lead.id, 'HUNT_FAILED');
      }
    } else {
      // No Apollo key - go straight to fallbacks
      addLog('HUNTER', `No Apollo API key. Trying Google search for ${lead.company_name}...`, 'INFO');
      
      // Fallback to Google search for LinkedIn
      const linkedinResult = await searchLinkedIn(lead.company_name, titles);
      if (linkedinResult) {
        addLog('HUNTER', `Found LinkedIn profile: ${linkedinResult.linkedin}`, 'INFO');
        transition(
          lead.id,
          'DRAFTING',
          'contact_name = ?, top_designation = ?, contact_linkedin = ?',
          [linkedinResult.name, linkedinResult.title, linkedinResult.linkedin]
        );
        addLog('HUNTER', `✓ ${linkedinResult.name} via Google search for ${lead.company_name}`, 'SUCCESS');
        return;
      }

      // Third fallback: scrape company website for contacts
      if (lead.website) {
        addLog('HUNTER', `Google search failed. Trying website scraping...`, 'WARNING');
        const websiteContacts = await scrapeWebsiteContacts(lead.website);
        if (websiteContacts && (websiteContacts.email || websiteContacts.phone)) {
          addLog('HUNTER', `Found contacts on website: ${websiteContacts.email || websiteContacts.phone}`, 'INFO');
          transition(
            lead.id,
            'VERIFIED',
            'verified_email = ?, verified_mobile = ?',
            [websiteContacts.email || '', websiteContacts.phone || '']
          );
          addLog('HUNTER', `✓ Website contacts for ${lead.company_name} - moved to Verified Leads`, 'SUCCESS');
          return;
        }
      }

      transition(lead.id, 'HUNT_FAILED');
    }
  }
}
