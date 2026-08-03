import Imap from 'node-imap';
import { loadSystemConfig } from '../config_manager.js';

const config = await loadSystemConfig();
const imap = new Imap({
  user: config.email,
  password: config.gmail_pass,
  host: config.imap_host || String(config.smtp_host || '').replace(/^smtp\./i, 'imap.'),
  port: Number(config.imap_port || 993),
  tls: true,
  connTimeout: 12000,
  authTimeout: 12000,
  tlsOptions: { rejectUnauthorized: true }
});

const run = () => new Promise<void>((resolve, reject) => {
  imap.once('ready', () => {
    imap.getBoxes((boxError, boxes: any) => {
      if (boxError) return reject(boxError);
      const folders: Array<{ name: string; attributes: string[] }> = [];
      const walk = (nodes: any, prefix = '') => {
        for (const [name, box] of Object.entries<any>(nodes || {})) {
          const delimiter = String(box.delimiter || '.');
          const fullName = prefix ? `${prefix}${delimiter}${name}` : name;
          const attributes = (box.attribs || []).map(String);
          folders.push({ name: fullName, attributes });
          if (box.children) walk(box.children, fullName);
        }
      };
      walk(boxes);
      const sent = folders.find(folder => folder.attributes.some(value => value.toLowerCase() === '\\sent'))
        || folders.find(folder => /(^|\.)(sent|sent items|sent messages)$/i.test(folder.name));
      if (!sent) return reject(new Error('No Sent mailbox found.'));

      imap.openBox(sent.name, true, (openError, box) => {
        if (openError) return reject(openError);
        if (!box.messages.total) {
          console.log(JSON.stringify({ sentFolder: sent.name, total: 0, messages: [] }));
          imap.end();
          return resolve();
        }
        const start = Math.max(1, box.messages.total - 19);
        const fetch = imap.seq.fetch(`${start}:${box.messages.total}`, {
          bodies: 'HEADER.FIELDS (MESSAGE-ID SUBJECT TO DATE)',
          struct: false
        });
        const messages: any[] = [];
        fetch.on('message', message => {
          let header = '';
          let sequence = 0;
          message.on('body', stream => stream.on('data', chunk => { header += chunk.toString('utf8'); }));
          message.once('attributes', attrs => { sequence = attrs.uid; });
          message.once('end', () => messages.push({ uid: sequence, header: header.replace(/\r?\n[ \t]+/g, ' ').trim() }));
        });
        fetch.once('error', reject);
        fetch.once('end', () => {
          console.log(JSON.stringify({ sentFolder: sent.name, total: box.messages.total, messages }, null, 2));
          imap.end();
          resolve();
        });
      });
    });
  });
  imap.once('error', reject);
  imap.connect();
});

await run();
