import { US_STATES } from '@/lib/pseo-data'

export const revalidate = 86400

const BASE_URL = 'https://getfairclaimpro.com'

export function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const items = US_STATES.map(
    s => `  <url>\n    <loc>${BASE_URL}/${s.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
