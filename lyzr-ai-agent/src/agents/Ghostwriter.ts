import db, { addLog, transition } from '../server/db';
import axios from 'axios';
import { sleep } from '../lib/throttle';

export class Ghostwriter {
  static async process(lead: any, campaign: any) {
    const repName = campaign.agency_rep; 
    const agencyName = campaign.agency_name;
    const strategy = campaign.campaign_strategy || 'Strategic Growth Partnership';
    const model = campaign.openrouter_model || 'google/gemma-7b-it:free';
    const apiKey = campaign.openrouter_key;
    const baseUrl = campaign.openrouter_base_url || 'https://openrouter.ai/api/v1';
    const brochure = campaign.brochure_content || '';
    
    if (!apiKey) {
      addLog('WRITER', `CRITICAL: No OpenRouter API Key. Using local fallback for ${lead.company_name}.`, 'WARNING');
      this.localFallback(lead, campaign);
      return;
    }

    addLog('WRITER', `Drafting intelligent pitch via ${model} for ${lead.contact_name}...`, 'INFO');

    if (!transition(lead.id, 'WRITING')) return;

    // Mandatory 15-45s stealth delay before LLM call
    await sleep();

    try {
      const prompt = `
        You are ${repName} from ${agencyName}. 
        Our Agency Expertise (Ingested from Brochure): ${brochure.substring(0, 2000)}
        Our Campaign Strategy: ${strategy}
        Target Company: ${lead.company_name}
        Contact Person: ${lead.contact_name} (Title: ${lead.top_designation})

        Task: Write a high-convertion, hyper-technical, and zero-fluff outreach email. 
        Focus on specific value add. Don't use generic greetings like "hope you are well".
        Keep it under 100 words. Format with line breaks.
        End with: Regards, ${repName}
      `;

      const response = await axios.post(`${baseUrl}/chat/completions`, {
        model: model,
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: { 'Authorization': `Bearer ${apiKey}`, 'HTTP-Referer': 'https://gmevents.ae' },
        timeout: 20000
      });

      const draft = response.data?.choices[0]?.message?.content || 'Drafting failed.';

      transition(lead.id, 'COMPLETED', 'pitch_draft = ?', [draft]);

      addLog('WRITER', `Hyper-Personalized pitch generated for ${lead.company_name}. Intelligence Sync: 100%.`, 'SUCCESS');

    } catch (error: any) {
      addLog('WRITER', `AI Error: ${error.message}. Switching to technical template for ${lead.company_name}.`, 'ERROR');
      this.localFallback(lead, campaign);
    }
  }

  private static localFallback(lead: any, campaign: any) {
    const draft = `Hi ${lead.contact_name},\n\nI've been reviewing ${lead.company_name}'s global footprint. We're currently architecting the technical framework for our upcoming ${campaign.agency_name} campaigns. Zero fluff—just wanted to see if your team is prepared for the scale.\n\nRegards,\n${campaign.agency_rep}`;
    // Force-update via raw db (bypass state machine) since we may be called from any state on failure
    db.prepare("UPDATE leads SET status = 'COMPLETED', pitch_draft = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?").run(draft, lead.id);
  }
}
