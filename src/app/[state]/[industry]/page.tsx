import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import IndustryPageTemplate from '@/components/SEO/IndustryPageTemplate'
import type { Metadata } from 'next'

interface Props { params: { state: string; industry: string } }

export function generateStaticParams() {
  const params: { state: string; industry: string }[] = []
  for (const state of US_STATES)
    for (const industry of INDUSTRIES)
      params.push({ state: state.slug, industry: industry.slug })
  return params
}

export function generateMetadata({ params }: Props): Metadata {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  if (!state || !industry) return {}
  return {
    title: `${industry.name} Workers' Comp in ${state.name} | WorkInjuryCalc`,
    description: `${industry.name} workers in ${state.name} receive $${state.avgSettlement.low.toLocaleString()}–$${state.avgSettlement.high.toLocaleString()} on average. Free calculator.`,
  }
}

export default function IndustryPage({ params }: Props) {
  const state    = US_STATES.find(s => s.slug === params.state)
  const industry = INDUSTRIES.find(i => i.slug === params.industry)
  if (!state || !industry) notFound()
  return <IndustryPageTemplate state={state} industry={industry} injuries={INJURY_TYPES} />
}
