import { db } from './db.js';

// The user received a reply from kannan@powerandcoolingme.com 
const fromEmail = 'kannan@powerandcoolingme.com';
const domain = fromEmail.split('@')[1];

db.get(
    "SELECT * FROM leads WHERE email LIKE ?",
    [`%@${domain}`],
    (err, lead: any) => {
        if (err) {
            console.error("DB Error:", err);
            return;
        }

        if (lead) {
            console.log(`Found matching lead: ${lead.company_name} (Email: ${lead.email})`);
            
            // Insert fake reply just to sync dashboard state
            const body = "Thanks for your email. Can your share the price list as you mentioned ?";
            const sentiment = 'positive'; // This is a warm lead requesting price list!

            db.run(`INSERT INTO replies (lead_id, from_email, from_name, subject, body, sentiment, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [lead.id, fromEmail, 'Selva Kannan Subramanian', 'Re: Data Center // Electrical Support', body, sentiment, 'unread'], (err) => {
                    if (err) {
                        // Might already exist due to unique constraints or something else
                        console.log("Reply might already be inserted.");
                    }
                }
            );

            // Update leads table
            db.run(`UPDATE leads SET reply_sentiment = ?, status = 'replied' WHERE id = ?`, [sentiment, lead.id], (err) => {
                if (!err) {
                    console.log(`✅ successfully marked ${lead.company_name} as REPLIED with positive sentiment!`);
                    console.log(`Refresh your dashboard to see it under 'Companies That Replied'.`);
                } else {
                    console.error("Failed to update lead status:", err);
                }
            });

        } else {
            console.log(`❌ Could not find any lead matching domain: ${domain}`);
        }
    }
);
