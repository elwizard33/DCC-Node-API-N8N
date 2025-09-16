#!/usr/bin/env node
/* Dist verification script: ensures compiled artifacts exist before publish */
const fs = require('fs');
const path = require('path');

// Derive expected artifacts from package.json n8n manifest plus static extras
const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
const manifest = pkg.n8n || {};
const credArtifacts = (manifest.credentials || []).map((p) => p.replace(/\.js$/, '.js'));
const nodeArtifacts = (manifest.nodes || []).map((p) => p.replace(/\.js$/, '.js'));
// Extra assets that must accompany certain nodes (svg icons referenced via file: syntax)
const staticExtras = [
  'dist/nodes/Dcc/dcc.svg',
];
const required = Array.from(new Set([...credArtifacts, ...nodeArtifacts, ...staticExtras]));

async function waitFor(paths, attempts = 5, delayMs = 250) {
  for (let i = 0; i < attempts; i++) {
    const missingNow = paths.filter((rel) => !fs.existsSync(path.resolve(rel)));
    if (!missingNow.length) return [];
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
  }
  return paths.filter((rel) => !fs.existsSync(path.resolve(rel)));
}

// Fallback: if Dcc artifacts missing but source exists, try copying assets again (icons) without rerunning full build
function fallbackCopy() {
  const svgSrc = path.resolve('nodes', 'Dcc', 'dcc.svg');
  const svgDestDir = path.resolve('dist', 'nodes', 'Dcc');
  if (fs.existsSync(svgSrc) && !fs.existsSync(path.join(svgDestDir, 'dcc.svg'))) {
    fs.mkdirSync(svgDestDir, { recursive: true });
    fs.copyFileSync(svgSrc, path.join(svgDestDir, 'dcc.svg'));
  }
}

waitFor(required).then((missing) => {
  if (missing.length) {
    fallbackCopy();
  }
  return waitFor(required, 2, 150);
}).then((missing) => {
  if (missing.length) {
    console.error('\n[check-dist] Missing required build artifacts after retries:');
    for (const m of missing) console.error(' - ' + m);
    // Debug directory listings for diagnostics
    try {
      const list = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir) : []);
      console.error('\n[debug] dist/credentials:', list('dist/credentials'));
      console.error('[debug] dist/nodes/Dcc:', list('dist/nodes/Dcc'));
    } catch {}
    console.error('\nRun: npm run build');
    process.exit(1);
  }
  console.log('[check-dist] All required artifacts present.');
});
