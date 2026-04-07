import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { db } from './db.js';
import { logToDashboard, analyzeSentiment } from './shared_utils.js';
import dotenv from 'dotenv';
dotenv.config();

const imapConfig = {
    user: process.env.GMAIL_USER || '',
    password: process.env.GMAIL_APP_PASS || '',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
};

export const startImapMonitor = () => {
    const imap = new Imap(imapConfig);

    function openInbox(cb: any) {
        imap.openBox('INBOX', false, cb);
    }

    imap.once('ready', () => {
        logToDashboard("IMAP: Connection established. Monitoring for replies...", "info");
        
        const checkNewEmails = () => {
            openInbox((err: any, box: any) => {
                if (err) return;
                imap.search(['UNSEEN'], (err, results) => {
                    if (err || !results || results.length === 0) return;

                    const f = imap.fetch(results, { bodies: '' });
                    f.on('message', (msg, seqno) => {
                        msg.on('body', (stream, info) => {
                            simpleParser(stream, async (err, mail) => {
                                if (err) return;
                                const fromEmail = mail.from?.value[0].address?.toLowerCase();
                                if (!fromEmail) return;

                                const domain = fromEmail.split('@')[1];
                                const isGenericDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'eim.ae'].includes(domain);
                                
                                const query = isGenericDomain 
                                    ? "SELECT * FROM leads WHERE email = ?" 
                                    : "SELECT * FROM leads WHERE email LIKE ?";
                                const param = isGenericDomain 
                                    ? fromEmail 
                                    : `%@${domain}`;

                                // Check if this is a lead we contacted
                                db.get(query, [param], async (err, lead: any) => {
                                    if (lead) {
                                        const body = mail.text || '';
                                        const sentiment = await analyzeSentiment(body);
                                        
                                        db.run(`INSERT INTO replies (lead_id, from_email, from_name, subject, body, sentiment, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                            [lead.id, fromEmail, mail.from?.value[0].name || '', mail.subject, body, sentiment, 'unread']);

                                        db.run(`UPDATE leads SET reply_sentiment = ?, status = 'replied' WHERE id = ?`, [sentiment, lead.id]);
                                        
                                        logToDashboard(`🔥 GOLD ALERT: Reply from ${lead.company_name} (${sentiment.toUpperCase()})`, sentiment === 'positive' ? 'success' : 'info');
                                    }
                                });
                            });
                        });
                    });
                    f.once('error', (err) => console.log('Fetch error: ' + err));
                    f.once('end', () => {
                        // Mark these as seen if processed
                        imap.addFlags(results, '\\Seen', (err) => {
                            if (err) console.log("Error marking as seen:", err);
                        });
                    });
                });
            });
        };

        // Poll every 2 minutes
        checkNewEmails();
        setInterval(checkNewEmails, 120000);
    });

    imap.once('error', (err: any) => {
        console.error('IMAP Error:', err);
        logToDashboard(`IMAP ERROR: ${err.message}`, "error");
    });

    imap.once('end', () => {
        logToDashboard("IMAP: Connection ended. Restarting...", "warning");
        setTimeout(() => imap.connect(), 30000);
    });

    imap.connect();
};
