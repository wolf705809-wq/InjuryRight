import { notFound } from 'next/navigation'
import { US_STATES, INDUSTRIES, INJURY_TYPES } from '@/lib/pseo-data'
import StatePageTemplate from '@/components/SEO/StatePageTemplate'
import UpdateLog from '@/components/UpdateLog'
import type { Metadata } from 'next'

interface Props { params: { state: string } }

export function generateStaticParams() {
  return US_STATES.map(s => ({ state: s.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) return {}
  return {
    title: `${state.name} Workers' Comp Calculator | WorkerRight`,
    description: `Injured at work in ${state.name}? Calculate your compensation. Workers typically receive $${state.avgSettlement.low.toLocaleString()}–$${state.avgSettlement.high.toLocaleString()}. Free assessment.`,
  }
}

export default function StatePage({ params }: Props) {
  const state = US_STATES.find(s => s.slug === params.state)
  if (!state) notFound()
  return (
    <>
      <StatePageTemplate state={state} industries={INDUSTRIES} injuries={INJURY_TYPES} />
      <div className="px-8 py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <UpdateLog state={state.slug} stateName={state.name} />
        </div>
      </div>
    </>
  )
}
