#!/usr/bin/env node
/* Force-copy DCC artifacts if missing */
const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function forceCopy(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`[force-copy] ${src} -> ${dest}`);
  } else {
    console.error(`[force-copy] WARNING: Source missing ${src}`);
  }
}

// Force copy DCC artifacts if dist is missing them
const dccCredJs = 'dist/credentials/DccApi.credentials.js';
const dccNodeJs = 'dist/nodes/Dcc/Dcc.node.js';
const dccSvg = 'dist/nodes/Dcc/dcc.svg';

if (!fs.existsSync(dccCredJs) || !fs.existsSync(dccNodeJs) || !fs.existsSync(dccSvg)) {
  console.log('[force-copy] Missing DCC artifacts, attempting manual copy...');
  
  // Try to copy from any existing similar structure or build again
  try {
    if (fs.existsSync('credentials/DccApi.credentials.js')) {
      forceCopy('credentials/DccApi.credentials.js', dccCredJs);
    }
    if (fs.existsSync('nodes/Dcc/Dcc.node.js')) {
      forceCopy('nodes/Dcc/Dcc.node.js', dccNodeJs);
    }
    forceCopy('nodes/Dcc/dcc.svg', dccSvg);
    
    // Attempt re-compile of specific files
    const { execSync } = require('child_process');
    try {
      execSync('npx tsc credentials/DccApi.credentials.ts --outDir dist --declaration --sourceMap', { stdio: 'inherit' });
      execSync('npx tsc nodes/Dcc/Dcc.node.ts --outDir dist --declaration --sourceMap', { stdio: 'inherit' });
    } catch (e) {
      console.error('[force-copy] Recompile failed:', e.message);
    }
  } catch (e) {
    console.error('[force-copy] Manual copy failed:', e.message);
  }
} else {
  console.log('[force-copy] All DCC artifacts present, no action needed.');
}
