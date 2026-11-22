import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats (AVIF first, then WebP) at the right size for each screen.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    // Cache optimised images for a year; replace a picture by changing its file name.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Files in /public/images rarely change: let browsers and the CDN cache them.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
