import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import IndustryPageTemplate from '@/components/SEO/IndustryPageTemplate'
import type { Metadata } from 'next'

export const revalidate = 86400

interface Props { params: { state: string; industry: string } }

export function generateMetadata({ params }: Props): Metadata {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  if (!state || !industry) return {}
  const year = new Date().getFullYear()
  const low  = state.avgSettlement.low.toLocaleString('en-US')
  const high = state.avgSettlement.high.toLocaleString('en-US')
  return {
    title: `${industry.name} Workers' Comp in ${state.name}: Settlement Ranges & Laws (${year})`,
    description: `${industry.name} workers in ${state.name} face high injury rates. Workers' comp filing deadline: ${state.sol}. Settlements range $${low}–$${high}. Free state-specific calculator.`,
    alternates: {
      canonical: `https://getfairclaimpro.com/${params.state}/${params.industry}`,
    },
    openGraph: {
      title: `${industry.name} Workers' Comp in ${state.name}: Settlement Ranges & Laws (${year})`,
      description: `${industry.name} workers in ${state.name}: settlements $${low}–$${high}. Filing deadline: ${state.sol}. Free calculator.`,
      type: 'article',
    },
  }
}

const BUILD_DATE = new Date().toISOString().split('T')[0]

export default function IndustryPage({ params }: Props) {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  if (!state || !industry) notFound()

  const avgLow  = state.avgSettlement.low
  const avgHigh = state.avgSettlement.high
  const ttdPct  = (state.ttdRate * 100).toFixed(0)
  const pageUrl = `https://getfairclaimpro.com/${params.state}/${params.industry}`
  const year    = new Date().getFullYear()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much do ${industry.name} workers get for workers' comp in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${industry.name} workers in ${state.name} typically receive $${avgLow.toLocaleString('en-US')}–$${avgHigh.toLocaleString('en-US')} in workers' comp settlements. Benefits are calculated at ${ttdPct}% of your average weekly wage, capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week under ${state.statute}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the most common injuries for ${industry.name} workers in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The most common workers' comp injuries for ${industry.name} workers in ${state.name} include back injuries, knee injuries, shoulder injuries, fractures, and repetitive stress injuries. Each injury type has different average settlements and treatment requirements.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does a workers' comp claim take in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, workers' comp claims typically take 6–18 months to resolve. The statute of limitations is ${state.sol} from the date of injury under ${state.statute}. Filing promptly and documenting all symptoms and treatment helps your claim.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the TTD rate for ${industry.name} workers in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, Temporary Total Disability (TTD) benefits are paid at ${ttdPct}% of your average weekly wage, with a maximum of $${state.maxWeeklyBenefit.toLocaleString('en-US')} per week. This applies to all ${industry.name} workers covered under ${state.statute}.`,
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getfairclaimpro.com' },
      { '@type': 'ListItem', position: 2, name: `${state.name} Workers' Comp`, item: `https://getfairclaimpro.com/${params.state}` },
      { '@type': 'ListItem', position: 3, name: `${industry.name} Workers in ${state.name}`, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${industry.name} Workers' Comp in ${state.name}: Settlement Ranges & Laws (${year})`,
    url: pageUrl,
    datePublished: BUILD_DATE,
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'WorkerRight', url: 'https://getfairclaimpro.com' },
    publisher: { '@type': 'Organization', name: 'WorkerRight', url: 'https://getfairclaimpro.com' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema, articleSchema]) }}
      />
      <IndustryPageTemplate state={state} industry={industry} injuries={INJURY_TYPES} />
    </>
  )
}
