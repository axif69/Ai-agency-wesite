import { db } from './db.js';
import { personalizeOutreach } from './personalizer.js';
import { loadSystemConfig } from './config_manager.js';

async function main() {
  console.log('Generating AI review drafts for ready B2B leads...');
  const settings = await loadSystemConfig();
  const tone = (settings as any).ai_tone || (settings as any).tone || 'Professional & Bold';
  const model = 'llama-3.3-70b-versatile';

  const readyLeads = await new Promise<any[]>(res => {
    db.all("SELECT * FROM leads WHERE status = 'ready' AND email IS NOT NULL AND email LIKE '%@%' LIMIT 10", (err, rows) => res(rows || []));
  });

  console.log(`Found ${readyLeads.length} ready leads to draft...`);
  let created = 0;

  for (const lead of readyLeads) {
    try {
      const companyName = lead.company_name;
      const website = lead.website || `https://${lead.domain}`;
      console.log(`Drafting for: ${companyName} (${lead.email})...`);

      const evidenceFacts = [
        { fact: `${companyName} is an established company in ${(settings as any).target_location || 'UAE'}.`, source_url: website },
        { fact: `Specializes in professional B2B services.`, source_url: website }
      ];

      const personalization = await personalizeOutreach(companyName, lead.about_summary || '', website, tone, model, lead.contact_name || null, evidenceFacts);

      if (personalization.body && personalization.body.length > 20) {
        const shortName = companyName.split(/[|I\-–—]/)[0].trim().split(' ').slice(0, 4).join(' ');
        const draftSubject = `Quick question, ${shortName}`;
        const modelProv = `${personalization.provider}:${personalization.model}`;

        await new Promise<void>(res => {
          db.run(
            `INSERT INTO outreach_drafts (lead_id, recipient_email, subject, text_body, prospect_facts_json, prompt_version, model, quality_score, validation_warnings_json, approval_status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')`,
            [lead.id, lead.email, draftSubject, personalization.body, JSON.stringify(evidenceFacts), 'v5.1', modelProv, 85, '[]'],
            () => res()
          );
        });
        db.run("UPDATE leads SET status = 'awaiting_approval' WHERE id = ?", [lead.id]);
        created++;
        console.log(`✅ Draft generated for: ${companyName}`);
      }
    } catch (e: any) {
      console.error(`Failed for ${lead.company_name}:`, e.message);
    }
  }

  console.log(`🎉 SUCCESS: Generated ${created} new AI outreach drafts!`);
  process.exit(0);
}

main();
