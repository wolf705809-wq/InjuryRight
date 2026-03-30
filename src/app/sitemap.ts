import type { MetadataRoute } from 'next'
import { US_STATES } from '@/lib/pseo-data'

const BASE_URL = 'https://getfairclaimpro.com'
const PHASE = process.env.SITEMAP_PHASE === '2' ? 2 : 1
const PSEO_CHUNKS = 15

const STATIC_ENTRIES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`,                                                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/calculator`,                                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/workers-comp-statistics`,                            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/guides`,                                             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/guides/what-to-do-after-workplace-injury`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/guides/how-workers-comp-settlements-work`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/guides/understanding-state-workers-comp-laws`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/guides/denied-claim-what-to-do-next`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/guides/gig-worker-rights`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/about`,                                              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/methodology`,                                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/contact`,                                            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  { url: `${BASE_URL}/legal/disclaimer`,                                   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/legal/privacy`,                                      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/legal/terms`,                                        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/legal/referral-disclosure`,                          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/legal/attorney-advertising`,                         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Phase 1: embed static + state URLs directly (~64 URLs, for initial indexing test)
  if (PHASE === 1) {
    const stateEntries: MetadataRoute.Sitemap = US_STATES.map(s => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    return [...STATIC_ENTRIES, ...stateEntries]
  }

  // Phase 2: sitemap index — points to split sitemap route handlers
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/sitemap-static.xml` },
    { url: `${BASE_URL}/sitemap-states.xml` },
    { url: `${BASE_URL}/sitemap-state-industry.xml` },
  ]
  for (let i = 0; i < PSEO_CHUNKS; i++) {
    entries.push({ url: `${BASE_URL}/sitemap-pseo/${i}.xml` })
  }
  return entries
}
