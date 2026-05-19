import { readFileSync, writeFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
const jsr = JSON.parse(readFileSync('jsr.json', 'utf-8'));
jsr.version = pkg.version;
writeFileSync('jsr.json', JSON.stringify(jsr, null, 2) + '\n');
console.log(`Synced jsr.json to version ${jsr.version}`);
