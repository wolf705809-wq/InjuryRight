import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import StatePageTemplate from '@/components/SEO/StatePageTemplate'
import type { Metadata } from 'next'

interface Props { params: { state: string } }

export function generateStaticParams() {
  return US_STATES.map(s => ({ state: s.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) return {}
  return {
    title: `${state.name} Workers' Comp Calculator | WorkInjuryCalc`,
    description: `Injured at work in ${state.name}? Calculate your compensation. Workers typically receive $${state.avgSettlement.low.toLocaleString()}–$${state.avgSettlement.high.toLocaleString()}. Free assessment.`,
  }
}

export default function StatePage({ params }: Props) {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) notFound()
  return <StatePageTemplate state={state} industries={INDUSTRIES} injuries={INJURY_TYPES} />
}
