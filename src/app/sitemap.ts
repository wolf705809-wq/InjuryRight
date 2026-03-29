import { MetadataRoute } from 'next'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'

const BASE_URL = 'https://workinjurycalc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Static pages
  entries.push(
    { url: BASE_URL,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/calculator`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/results`,          lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/legal/privacy`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/legal/terms`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/legal/disclaimer`, lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  )

  // Injury hub pages (26)
  for (const injury of INJURY_TYPES) {
    entries.push({
      url: `${BASE_URL}/injuries/${injury.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // State pages (47)
  for (const state of US_STATES) {
    entries.push({
      url: `${BASE_URL}/${state.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // State × Industry pages (47 × 12 = 564)
  for (const state of US_STATES) {
    for (const industry of INDUSTRIES) {
      entries.push({
        url: `${BASE_URL}/${state.slug}/${industry.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // State × Industry × Injury pages (47 × 12 × 26 = 14,664)
  for (const state of US_STATES) {
    for (const industry of INDUSTRIES) {
      for (const injury of INJURY_TYPES) {
        entries.push({
          url: `${BASE_URL}/${state.slug}/${industry.slug}/${injury.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  }

  return entries
}
