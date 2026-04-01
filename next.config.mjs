/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/webp'],
  },
  async rewrites() {
    return [
      { source: '/sitemap-static.xml',        destination: '/sitemap-static' },
      { source: '/sitemap-states.xml',         destination: '/sitemap-states' },
      { source: '/sitemap-state-industry.xml', destination: '/sitemap-state-industry' },
      // /sitemap-pseo/0.xml → /sitemap-pseo/0  (chunk is digits-only before .xml)
      { source: '/sitemap-pseo/:chunk(\\d+).xml', destination: '/sitemap-pseo/:chunk' },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',            value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security',  value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://www.google-analytics.com; frame-src 'none'; object-src 'none'",
          },
        ],
      },
    ]
  },
}

export default nextConfig
