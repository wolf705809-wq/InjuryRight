import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'

export const revalidate = 86400

const BASE_URL = 'https://getfairclaimpro.com'
const CHUNK_SIZE = 1000

// Build all pSEO URLs once at module load (47 × 12 × 26 = 14,664)
const ALL_URLS: string[] = []
for (const state of US_STATES) {
  for (const industry of INDUSTRIES) {
    for (const injury of INJURY_TYPES) {
      ALL_URLS.push(`${BASE_URL}/${state.slug}/${industry.slug}/${injury.slug}`)
    }
  }
}

const TOTAL_CHUNKS = Math.ceil(ALL_URLS.length / CHUNK_SIZE)

export function generateStaticParams() {
  return Array.from({ length: TOTAL_CHUNKS }, (_, i) => ({ chunk: String(i) }))
}

export function GET(_req: Request, { params }: { params: { chunk: string } }) {
  const chunkIndex = parseInt(params.chunk, 10)

  if (isNaN(chunkIndex) || chunkIndex < 0 || chunkIndex >= TOTAL_CHUNKS) {
    return new Response('Not Found', { status: 404 })
  }

  const start = chunkIndex * CHUNK_SIZE
  const urls = ALL_URLS.slice(start, start + CHUNK_SIZE)
  const lastmod = new Date().toISOString().split('T')[0]

  const items = urls.map(
    url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`,
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
