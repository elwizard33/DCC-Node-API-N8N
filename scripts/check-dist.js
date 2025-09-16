#!/usr/bin/env node
/* Dist verification script: ensures compiled artifacts exist before publish */
const fs = require('fs');
const path = require('path');

const required = [
  'dist/credentials/DccApi.credentials.js',
  'dist/nodes/Dcc/Dcc.node.js',
  'dist/nodes/Dcc/dcc.svg',
];

let missing = [];
for (const rel of required) {
  const p = path.resolve(rel);
  if (!fs.existsSync(p)) {
    missing.push(rel);
  }
}

if (missing.length) {
  console.error('\n[check-dist] Missing required build artifacts:');
  for (const m of missing) console.error(' - ' + m);
  console.error('\nRun: npm run build');
  process.exit(1);
}

console.log('[check-dist] All required artifacts present.');
