import { isHardJunkDomain, isJunkAnchorText, unwrapSerpRedirect, registrableLabel } from './junkFilter';

const domainCases: Array<[string, boolean]> = [
  ['zhihu.com',                 true],
  ['poki.com',                  true],
  ['bing.com',                  true],
  ['bnn.de',                    true],
  ['stadtanzeiger-ortenau.de',  true],
  ['hotmail.com',               true],
  ['youtube.co.uk',            true],
  ['anydesk.com.cn',           true],
  ['softonic.com',             true],
  ['techspot.com',             true],
  ['britannica.com',           true],
  ['cnet.com',                 true],
  ['filehippo.com',            true],
  ['lockheedmartin.com',        false],
  ['rtx.com',                   false],
  ['baesystems.com',            false],
];

const anchorCases: Array<[string, boolean]> = [
  ['stopa.com \u203a unternehmen',       true],
  ['stopa.comhttps://www.stopa.com',     true],
  ['Some Long ... result fragment',      true],
  ['STOPA Anlagenbau GmbH',              false],
  ['Lockheed Martin',                    false],
  ['BAE Systems',                        false],
  ['',                                   true],
];

let pass = 0, fail = 0;
console.log('=== DOMAIN ===');
for (const [d, want] of domainCases) {
  const got = isHardJunkDomain(d);
  const ok  = got === want;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${d.padEnd(30)} junk=${got} (want ${want})`);
  ok ? pass++ : fail++;
}
console.log('=== ANCHOR ===');
for (const [t, want] of anchorCases) {
  const got = isJunkAnchorText(t);
  const ok  = got === want;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  [${t}] junk=${got} (want ${want})`);
  ok ? pass++ : fail++;
}
console.log('=== REDIRECT ===');
const bing = 'https://www.bing.com/ck/a?!&&p=abc&u=a1aHR0cHM6Ly9yZWFsLmV4YW1wbGUuY29tLw&ntb=1';
const out = unwrapSerpRedirect(bing);
console.log(`  ${out === 'https://real.example.com/' ? 'PASS' : 'FAIL'}  bing redirect \u2192 ${out}`);
out === 'https://real.example.com/' ? pass++ : fail++;
console.log(`\nTotal: ${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
