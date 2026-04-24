import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  content = content.replace(/\?q=90&w=2560&auto=format&fit=crop/g, '?auto=format,compress&fm=webp&q=75&w=1200');
  content = content.replace(/\?q=90&w=2560/g, '?auto=format,compress&fm=webp&q=75&w=1200');
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    console.log(`Updated ${file}`);
  }
}
console.log(`Changed ${changed} files.`);
