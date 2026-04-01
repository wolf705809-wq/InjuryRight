import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import StatePageTemplate from '@/components/SEO/StatePageTemplate'
import UpdateLog from '@/components/UpdateLog'
import type { Metadata } from 'next'

export const revalidate = 86400

interface Props { params: { state: string } }

export function generateMetadata({ params }: Props): Metadata {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) return {}
  const year = new Date().getFullYear()
  const low  = state.avgSettlement.low.toLocaleString('en-US')
  const high = state.avgSettlement.high.toLocaleString('en-US')
  return {
    title: `${state.name} Workers' Comp Settlements: Averages, Laws & Calculator (${year})`,
    description: `${state.name} workers' comp explained. TTD rate: ${(state.ttdRate * 100).toFixed(0)}%. Filing deadline: ${state.sol}. Settlements $${low}–$${high} on average. Free calculator for injured workers.`,
    alternates: {
      canonical: `https://getfairclaimpro.com/${params.state}`,
    },
    openGraph: {
      title: `${state.name} Workers' Comp Settlements: Averages, Laws & Calculator (${year})`,
      description: `TTD rate ${(state.ttdRate * 100).toFixed(0)}%. Filing deadline: ${state.sol}. Settlements $${low}–$${high}. Free calculator.`,
      type: 'article',
    },
  }
}

const BUILD_DATE = new Date().toISOString().split('T')[0]

export default function StatePage({ params }: Props) {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) notFound()

  const avgLow  = state.avgSettlement.low
  const avgHigh = state.avgSettlement.high
  const ttdPct  = (state.ttdRate * 100).toFixed(0)
  const pageUrl = `https://getfairclaimpro.com/${params.state}`

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${state.name} Workers' Compensation Information`,
    areaServed: state.name,
    url: pageUrl,
    description: `Free workers' compensation settlement calculator and legal information for workers injured in ${state.name}. Based on ${state.statute}.`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much is the average workers' comp settlement in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, workers' comp settlements typically range from $${avgLow.toLocaleString('en-US')} to $${avgHigh.toLocaleString('en-US')}. Benefits are paid at ${ttdPct}% of your average weekly wage, capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week under ${state.statute}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the filing deadline for workers' comp in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${state.name}, you must file a workers' comp claim within ${state.sol} of the date of injury. You must also report your injury to your employer within ${state.reportingDays} days. Governed by ${state.statute}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the TTD rate in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${state.name} pays Temporary Total Disability (TTD) benefits at ${ttdPct}% of your average weekly wage, with a maximum of $${state.maxWeeklyBenefit.toLocaleString('en-US')} per week under ${state.statute}.`,
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getfairclaimpro.com' },
      { '@type': 'ListItem', position: 2, name: `${state.name} Workers' Comp`, item: pageUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([legalServiceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <StatePageTemplate state={state} industries={INDUSTRIES} injuries={INJURY_TYPES} />
      <div className="px-8 py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <UpdateLog state={state.slug} stateName={state.name} />
        </div>
      </div>
    </>
  )
}
