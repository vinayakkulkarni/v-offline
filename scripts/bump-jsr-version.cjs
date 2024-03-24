#!/usr/bin/env node

const fs = require('fs');

// Read package.json and parse the version
const pkg = JSON.parse(fs.readFileSync('package.json').toString());

// Read jsr.json and parse it
const jsr = JSON.parse(fs.readFileSync('jsr.json').toString());

// Update the version property in jsr object
jsr.version = pkg.version;

// Write the updated jsr.json file
fs.writeFileSync('jsr.json', JSON.stringify(jsr, null, 2));
