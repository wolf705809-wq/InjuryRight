import { US_STATES, INDUSTRIES } from '@/lib/pseo-data'

export const revalidate = 86400

const BASE_URL = 'https://getfairclaimpro.com'

export function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const items: string[] = []

  for (const state of US_STATES) {
    for (const industry of INDUSTRIES) {
      items.push(
        `  <url>\n    <loc>${BASE_URL}/${state.slug}/${industry.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
      )
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
