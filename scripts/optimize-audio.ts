#!/usr/bin/env node
/**
 * Audio Optimization Script
 * 
 * Compresses MP3 voice demos to appropriate bitrates for web streaming.
 * Uses ffmpeg for compression.
 * 
 * Usage:
 *   npx ts-node scripts/optimize-audio.ts
 *   
 * Note: Requires ffmpeg to be installed:
 *   - macOS: brew install ffmpeg
 *   - Ubuntu/Debian: sudo apt-get install ffmpeg
 *   - Windows: winget install Gyan.FFmpeg
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const AUDIO_DIR = path.join(PUBLIC_DIR, 'audio');

interface AudioConfig {
  bitrate: string;
  sampleRate: number;
  channels: number;
}

const AUDIO_CONFIGS: Record<string, AudioConfig> = {
  // Voice demos - mono, lower bitrate is fine for speech
  'horizon-product-intro.mp3': { bitrate: '64k', sampleRate: 22050, channels: 1 },
  'techpulse-youtube-intro.mp3': { bitrate: '64k', sampleRate: 22050, channels: 1 },
  
  // Dubbing and clone files - slightly higher quality for multilingual
  'dentrix-clone-french-dub.mp3': { bitrate: '80k', sampleRate: 24000, channels: 1 },
  'dentrix-clone-hindi-dub.mp3': { bitrate: '80k', sampleRate: 24000, channels: 1 },
  'dentrix-voice-clone-showcase.mp3': { bitrate: '80k', sampleRate: 24000, channels: 1 },
};

function checkFFmpeg(): boolean {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function optimizeAudio(inputPath: string, outputPath: string, config: AudioConfig): void {
  const cmd = `ffmpeg -i "${inputPath}" -ar ${config.sampleRate} -ac ${config.channels} -b:a ${config.bitrate} -codec:a libmp3lame -q:a 2 "${outputPath}" -y`;
  execSync(cmd, { stdio: 'inherit' });
}

function main(): void {
  console.log('🎵 Starting audio optimization...\n');
  
  if (!checkFFmpeg()) {
    console.error('❌ ffmpeg is not installed!');
    console.log('\nInstall ffmpeg:');
    console.log('  macOS: brew install ffmpeg');
    console.log('  Ubuntu: sudo apt-get install ffmpeg');
    console.log('  Windows: winget install Gyan.FFmpeg');
    console.log('\nAlternative: Use online tools like:');
    console.log('  - https://www.freeconvert.com/compress-mp3');
    console.log('  - https://www.xconvert.com/audio-compressor');
    process.exit(1);
  }
  
  if (!fs.existsSync(AUDIO_DIR)) {
    console.log('No audio directory found');
    return;
  }
  
  const files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
  
  for (const file of files) {
    const inputPath = path.join(AUDIO_DIR, file);
    const config = AUDIO_CONFIGS[file] || { bitrate: '64k', sampleRate: 22050, channels: 1 };
    const outputPath = path.join(AUDIO_DIR, `${path.parse(file).name}-optimized.mp3`);
    
    try {
      const beforeStats = fs.statSync(inputPath);
      console.log(`Processing ${file}...`);
      optimizeAudio(inputPath, outputPath, config);
      const afterStats = fs.statSync(outputPath);
      
      const savings = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);
      console.log(`✓ ${file}: ${(beforeStats.size / 1024).toFixed(1)}KB → ${(afterStats.size / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error);
    }
  }
  
  console.log('✅ Audio optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Test the optimized audio files to ensure quality is acceptable');
  console.log('2. Replace original files with optimized versions (or update references)');
  console.log('3. Consider using Web Audio API for progressive loading');
}

main();
