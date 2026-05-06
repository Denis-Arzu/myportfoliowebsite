#!/usr/bin/env node
const sharp = require('sharp');
const path = require('path');

async function createOGImage() {
  try {
    // Create SVG for OG image
    const svg = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.15" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.15" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="#000000"/>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="240" font-family="monospace" font-size="84" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">Dentrix Apps</text>
        <text x="600" y="340" font-family="monospace" font-size="52" fill="#a0aec0" text-anchor="middle" letter-spacing="1">AI Voice Studio</text>
        <text x="600" y="420" font-family="monospace" font-size="28" fill="#64748b" text-anchor="middle">Your Brand's Voice, Engineered to Perfection</text>
        <line x1="200" y1="480" x2="1000" y2="480" stroke="#475569" stroke-width="1" opacity="0.3"/>
        <text x="600" y="560" font-family="monospace" font-size="20" fill="#64748b" text-anchor="middle">Professional AI Voiceovers • Voice Cloning • Multilingual Dubbing</text>
      </svg>
    `);

    await sharp(svg)
      .webp({ quality: 75 })
      .toFile(path.join(__dirname, '../public/images/og-image.webp'));
    
    console.log('✓ OG image created: public/images/og-image.webp');

    // Also create PNG fallback for older clients
    await sharp(svg)
      .png({ quality: 75 })
      .toFile(path.join(__dirname, '../public/images/og-image.png'));
    
    console.log('✓ OG image PNG fallback created: public/images/og-image.png');
  } catch (err) {
    console.error('Error creating OG image:', err.message);
    process.exit(1);
  }
}

createOGImage();
