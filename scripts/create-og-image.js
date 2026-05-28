#!/usr/bin/env node
const sharp = require('sharp');
const path = require('path');

async function createOGImage() {
  try {
    const svg = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#22c55e;stop-opacity:0.12" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.08" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="#050506"/>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="200" font-family="monospace" font-size="72" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">DentrixApps</text>
        <text x="600" y="300" font-family="monospace" font-size="38" fill="#a3a3a3" text-anchor="middle" letter-spacing="1">AI Assistants for Salons, Gyms &amp; Dental</text>
        <text x="600" y="380" font-family="monospace" font-size="26" fill="#737373" text-anchor="middle">Answers questions 24/7 · Captures leads · Books appointments</text>
        <line x1="200" y1="440" x2="1000" y2="440" stroke="#404040" stroke-width="1" opacity="0.4"/>
        <text x="600" y="520" font-family="monospace" font-size="20" fill="#525252" text-anchor="middle">Try your AI assistant live — built from your website. Free demo.</text>
      </svg>
    `);

    await sharp(svg)
      .webp({ quality: 75 })
      .toFile(path.join(__dirname, '../public/images/og-image.webp'));

    console.log('✓ OG image created: public/images/og-image.webp');

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
