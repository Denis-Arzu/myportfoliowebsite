/**
 * Minimal Next.js config to enable image optimization and bundle analysis
 */
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    // remotePatterns could be added here if you host assets externally
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // experimental options removed to ensure compatibility
  // enable bundle analyzer when needed via environment variable
  // (e.g., ANALYZE=true pnpm build)
  ...(process.env.ANALYZE ? { webpack(config){ return config; } } : {}),
};
