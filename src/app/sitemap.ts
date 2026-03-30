import { MetadataRoute } from 'next'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import { GUIDES } from '@/lib/guides-data'

const BASE_URL = 'https://getfairclaimpro.com'
const PHASE = Number(process.env.SITEMAP_PHASE ?? 1)

// Major 5 states get full treatment in Phase 1
const MAJOR_STATES = ['california', 'texas', 'florida', 'new-york', 'illinois']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  const entries: MetadataRoute.Sitemap = []

  // ── Core pages (all phases) ────────────────────────────────────────────────
  entries.push(
    { url: BASE_URL,                                  lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/calculator`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/workers-comp-statistics`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/guides`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE_URL}/methodology`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE_URL}/contact`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/results`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/legal/privacy`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/legal/disclaimer`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/legal/referral-disclosure`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/legal/attorney-advertising`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  )

  for (const guide of GUIDES) {
    entries.push({ url: `${BASE_URL}/guides/${guide.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })
  }

  for (const injury of INJURY_TYPES) {
    entries.push({ url: `${BASE_URL}/injuries/${injury.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  }

  // ── Phase 1: All 47 state home pages + major 5 states full ────────────────
  // All state home pages
  for (const state of US_STATES) {
    entries.push({ url: `${BASE_URL}/${state.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })
  }

  if (PHASE < 2) {
    // Phase 1: also add major 5 states' industry + injury pages
    for (const state of US_STATES.filter(s => MAJOR_STATES.includes(s.slug))) {
      for (const industry of INDUSTRIES) {
        entries.push({ url: `${BASE_URL}/${state.slug}/${industry.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })
        for (const injury of INJURY_TYPES) {
          entries.push({ url: `${BASE_URL}/${state.slug}/${industry.slug}/${injury.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
        }
      }
    }
    return entries
  }

  // ── Phase 2: All 47 × 12 industry pages ───────────────────────────────────
  for (const state of US_STATES) {
    for (const industry of INDUSTRIES) {
      entries.push({ url: `${BASE_URL}/${state.slug}/${industry.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 })
    }
  }

  if (PHASE < 3) return entries

  // ── Phase 3: Full 47 × 12 × N injury pages ────────────────────────────────
  for (const state of US_STATES) {
    for (const industry of INDUSTRIES) {
      for (const injury of INJURY_TYPES) {
        entries.push({ url: `${BASE_URL}/${state.slug}/${industry.slug}/${injury.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
      }
    }
  }

  return entries
}
