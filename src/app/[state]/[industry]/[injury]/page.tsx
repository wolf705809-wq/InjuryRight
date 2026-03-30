import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import { generatePageCopy } from '@/lib/copy-generator'
import InjuryPageTemplate from '@/components/SEO/InjuryPageTemplate'
import type { Metadata } from 'next'

interface Props { params: { state: string; industry: string; injury: string } }

export function generateStaticParams() {
  const params: { state: string; industry: string; injury: string }[] = []
  for (const state of US_STATES)
    for (const industry of INDUSTRIES)
      for (const injury of INJURY_TYPES)
        params.push({ state: state.slug, industry: industry.slug, injury: injury.slug })
  return params
}

export function generateMetadata({ params }: Props): Metadata {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  const injury   = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!state || !industry || !injury) return {}

  const copy = generatePageCopy(state, industry, injury)

  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
    alternates: {
      canonical: `https://getfairclaimpro.com/${params.state}/${params.industry}/${params.injury}`,
    },
  }
}

export default function InjuryPage({ params }: Props) {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  const injury   = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!state || !industry || !injury) notFound()

  const copy = generatePageCopy(state, industry, injury)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'WorkerRight',
    description: copy.metaDesc,
    areaServed: { '@type': 'State', name: state.name },
    serviceType: 'Workers Compensation',
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Workers Compensation Calculator',
    applicationCategory: 'LegalService',
    operatingSystem: 'Web',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, legalServiceSchema, webAppSchema]) }}
      />
      <InjuryPageTemplate state={state} industry={industry} injury={injury} />
    </>
  )
}
