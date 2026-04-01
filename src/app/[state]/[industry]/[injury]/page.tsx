import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import { generatePageCopy } from '@/lib/copy-generator'
import InjuryPageTemplate from '@/components/SEO/InjuryPageTemplate'
import type { Metadata } from 'next'

export const revalidate = 86400

interface Props { params: { state: string; industry: string; injury: string } }

export function generateMetadata({ params }: Props): Metadata {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  const injury   = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!state || !industry || !injury) return {}

  const year    = new Date().getFullYear()
  const low     = state.avgSettlement.low.toLocaleString('en-US')
  const high    = state.avgSettlement.high.toLocaleString('en-US')
  const ttdPct  = (state.ttdRate * 100).toFixed(0)
  const maxWkly = state.maxWeeklyBenefit.toLocaleString('en-US')
  const title   = `${injury.name} at Work in ${state.name}: Workers' Comp Settlement & Rights (${year})`
  const desc    = `${injury.name} at work in ${state.name}? Workers' comp pays ${ttdPct}% of your wage (max $${maxWkly}/week). Settlements average $${low}–$${high}. Free calculator — 2 minutes.`

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://getfairclaimpro.com/${params.state}/${params.industry}/${params.injury}`,
    },
    openGraph: {
      title,
      description: desc,
      type: 'article',
    },
  }
}

const BUILD_DATE = new Date().toISOString().split('T')[0]

export default function InjuryPage({ params }: Props) {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  const injury   = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!state || !industry || !injury) notFound()

  const copy    = generatePageCopy(state, industry, injury)
  const avgLow  = state.avgSettlement.low
  const avgHigh = state.avgSettlement.high
  const avgMid  = Math.round((avgLow + avgHigh) / 2)
  const ttdPct  = (state.ttdRate * 100).toFixed(0)
  const pageUrl = `https://getfairclaimpro.com/${params.state}/${params.industry}/${params.injury}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much is a ${injury.name.toLowerCase()} workers' comp settlement in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, ${injury.name.toLowerCase()} workers' comp settlements typically range from $${avgLow.toLocaleString('en-US')} to $${avgHigh.toLocaleString('en-US')}, depending on impairment rating and treatment status. ${state.name} pays TTD at ${ttdPct}% of your average weekly wage, capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week under ${state.statute}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the average workers' comp settlement for ${injury.name.toLowerCase()} in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The average workers' comp settlement for ${injury.name.toLowerCase()} in ${state.name} is approximately $${avgMid.toLocaleString('en-US')}. Cases involving surgery, permanent disability, or denied claims that are later appealed tend to settle higher.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long do I have to file a workers' comp claim in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, you have ${state.sol} from the date of injury to file a workers' compensation claim under ${state.statute}. Missing this deadline typically bars you from receiving any benefits.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does my employment type affect my workers' comp claim in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. In ${state.name}, full-time employees are fully covered. Part-time employees may receive prorated benefits. Independent contractors and gig workers may qualify if misclassified — coverage depends on the degree of employer control over work performance.`,
        },
      },
      ...copy.faqItems.slice(4).map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getfairclaimpro.com' },
      { '@type': 'ListItem', position: 2, name: `${state.name} Workers' Comp`, item: `https://getfairclaimpro.com/${params.state}` },
      { '@type': 'ListItem', position: 3, name: `${industry.name} Workers in ${state.name}`, item: `https://getfairclaimpro.com/${params.state}/${params.industry}` },
      { '@type': 'ListItem', position: 4, name: `${injury.name} in ${state.name}`, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.metaTitle,
    description: copy.metaDesc,
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
      <InjuryPageTemplate state={state} industry={industry} injury={injury} />
    </>
  )
}
