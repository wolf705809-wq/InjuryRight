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
}

export default nextConfig
