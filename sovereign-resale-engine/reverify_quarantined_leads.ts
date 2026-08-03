import { db } from './db';
import { checkAIRelevance } from './search_service';
import { validateEmail } from './contact_validation';

/**
 * Sovereign Resale Engine — Quarantined Lead Recovery Pass v1.0
 * Re-evaluates all 710 quarantined leads using active Groq AI brain.
 */
export async function reverifyQuarantinedLeads(): Promise<void> {
    console.log('🚀 [RECOVERY] Starting 710 Quarantined Lead Recovery Pass with active Groq AI brain...');

    const leads: any[] = await new Promise((resolve, reject) => {
        db.all(
            `SELECT id, company_name, website, domain, email, phone, mobile_number, about_summary, analysis_notes
             FROM leads WHERE status = 'no_email' AND is_relevant = 0`,
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            }
        );
    });

    console.log(`📊 [RECOVERY] Found ${leads.length} quarantined leads to re-verify.`);
    let recoveredCount = 0;
    let promotedReadyCount = 0;

    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        const contentSample = `${lead.company_name} ${lead.about_summary || ''} ${lead.analysis_notes || ''}`;

        try {
            // 1. Run Groq AI B2B Relevance Check
            const aiFit = await checkAIRelevance(lead.company_name, contentSample);
            
            if (aiFit.relevant && aiFit.score >= 50) {
                recoveredCount++;

                // Check contact details
                let hasValidEmail = false;
                let validEmail = lead.email;

                if (lead.email) {
                    const emailCheck = await validateEmail(lead.email, lead.website || '', 'search_result', lead.website || '', true);
                    if (emailCheck.syntaxValid && emailCheck.mxValid !== false) {
                        hasValidEmail = true;
                        validEmail = emailCheck.normalizedAddress || lead.email;
                    }
                }

                const newStatus = hasValidEmail ? 'ready' : 'no_email';
                if (hasValidEmail) promotedReadyCount++;

                await new Promise<void>((resolve) => {
                    db.run(
                        `UPDATE leads SET 
                         is_relevant = 1,
                         status = ?,
                         email = ?,
                         relevance_score = ?,
                         analysis_notes = ?
                         WHERE id = ?`,
                        [newStatus, validEmail, aiFit.score, `[RECOVERED BY GROQ AI] ${aiFit.reason}`, lead.id],
                        () => resolve()
                    );
                });

                console.log(`  ✅ [RESTORED] #${lead.id} ${lead.company_name} → ${newStatus.toUpperCase()} (Score ${aiFit.score}/100)`);
            }
        } catch (e: any) {
            console.warn(`  ⚠️ Skipped #${lead.id} ${lead.company_name}: ${e.message}`);
        }
    }

    console.log(`============================================================`);
    console.log(`🎉 [RECOVERY COMPLETE] Restored ${recoveredCount} B2B companies!`);
    console.log(`🚀 Promoted ${promotedReadyCount} leads directly to READY FOR OUTREACH!`);
    console.log(`============================================================`);
}

// Run if called directly
if (process.argv[1]?.includes('reverify_quarantined_leads')) {
    reverifyQuarantinedLeads().then(() => process.exit(0)).catch(err => {
        console.error('Recovery pass failed:', err);
        process.exit(1);
    });
}
