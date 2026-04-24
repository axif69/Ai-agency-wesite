import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const imapConfig = {
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
};

async function fetchLatestReply() {
    const imap = new Imap(imapConfig);

    function openInbox(cb: any) {
        imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
        openInbox(function(err: any, box: any) {
            if (err) throw err;
            // Search for emails from Asif's specific address
            imap.search([['FROM', 'asifk199707@gmail.com']], function(err, results) {
                if (err) throw err;
                if (!results || !results.length) {
                    console.log("No emails found from Asif.");
                    imap.end();
                    return;
                }

                // Get the latest email
                const f = imap.fetch(results.slice(-1), { bodies: '' });
                f.on('message', function(msg, seqno) {
                    msg.on('body', function(stream, info) {
                        simpleParser(stream, async (err, parsed) => {
                            console.log("---------- LATEST EMAIL FROM ASIF ----------");
                            console.log("Subject:", parsed.subject);
                            console.log("Date:", parsed.date);
                            console.log("Body:", parsed.text);
                            console.log("--------------------------------------------");
                            imap.end();
                        });
                    });
                });
            });
        });
    });

    imap.once('error', function(err: any) {
        console.log(err);
    });

    imap.connect();
}

fetchLatestReply().catch(console.error);
