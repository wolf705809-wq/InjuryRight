export const revalidate = 86400

const BASE_URL = 'https://getfairclaimpro.com'

const PAGES = [
  { loc: `${BASE_URL}/`,                                                changefreq: 'weekly',  priority: 1.0 },
  { loc: `${BASE_URL}/calculator`,                                       changefreq: 'monthly', priority: 0.9 },
  { loc: `${BASE_URL}/workers-comp-statistics`,                          changefreq: 'monthly', priority: 0.8 },
  { loc: `${BASE_URL}/guides`,                                           changefreq: 'weekly',  priority: 0.7 },
  { loc: `${BASE_URL}/guides/what-to-do-after-workplace-injury`,         changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/guides/how-workers-comp-settlements-work`,         changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/guides/understanding-state-workers-comp-laws`,     changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/guides/denied-claim-what-to-do-next`,             changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/guides/gig-worker-rights`,                        changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/about`,                                            changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/methodology`,                                      changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/contact`,                                          changefreq: 'yearly',  priority: 0.4 },
  { loc: `${BASE_URL}/legal/disclaimer`,                                 changefreq: 'yearly',  priority: 0.3 },
  { loc: `${BASE_URL}/legal/privacy`,                                    changefreq: 'yearly',  priority: 0.3 },
  { loc: `${BASE_URL}/legal/terms`,                                      changefreq: 'yearly',  priority: 0.3 },
  { loc: `${BASE_URL}/legal/referral-disclosure`,                        changefreq: 'yearly',  priority: 0.3 },
  { loc: `${BASE_URL}/legal/attorney-advertising`,                       changefreq: 'yearly',  priority: 0.3 },
] as const

export function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const items = PAGES.map(
    p => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`,
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
