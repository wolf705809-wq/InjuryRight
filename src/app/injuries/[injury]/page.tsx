import { notFound } from 'next/navigation'
import Link from 'next/link'
import { INJURY_TYPES, US_STATES, INDUSTRIES } from '@/lib/pseo-data'
import type { Metadata } from 'next'

interface Props { params: { injury: string } }

export function generateStaticParams() {
  return INJURY_TYPES.map(i => ({ injury: i.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const injury = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!injury) return {}
  return {
    title: `${injury.name} Workers' Comp Claims | WorkInjuryCalc`,
    description: `Workers' compensation claims for ${injury.name.toLowerCase()}. Average medical costs: $${injury.avgMedicalCost.toLocaleString()}. Free settlement estimate — no obligation.`,
    alternates: { canonical: `/injuries/${params.injury}` },
  }
}

export default function InjuryHubPage({ params }: Props) {
  const injury = INJURY_TYPES.find(i => i.slug === params.injury)
  if (!injury) notFound()

  const topStates = US_STATES.slice(0, 10)
  const relatedIndustries = INDUSTRIES.filter(ind =>
    ind.commonInjuries.includes(injury.slug)
  )

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-emerald-50 border-b border-emerald-100 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-emerald-600 font-medium mb-2 uppercase tracking-wide">Workers' Compensation Guide</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {injury.name} Claims
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Average medical costs for {injury.name.toLowerCase()} exceed{' '}
            <strong>${injury.avgMedicalCost.toLocaleString()}</strong>. Workers with a{' '}
            <strong>{injury.avgImpairmentRating}% impairment rating</strong> may be entitled to permanent
            disability benefits on top of medical and lost wage coverage.
          </p>
          <Link
            href={`/calculator?injurySlug=${injury.slug}`}
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Estimate My Compensation →
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100 py-6 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">${injury.avgMedicalCost.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Avg. medical costs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">{injury.avgImpairmentRating}%</p>
            <p className="text-xs text-gray-500 mt-1">Avg. impairment rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">47</p>
            <p className="text-xs text-gray-500 mt-1">States covered</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Related industries */}
        {relatedIndustries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Industries with High {injury.name} Rates
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedIndustries.map(ind => (
                <Link
                  key={ind.slug}
                  href={`/calculator?industry=${ind.slug}&injurySlug=${injury.slug}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                >
                  <p className="font-medium text-gray-900 text-sm">{ind.name}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{ind.riskLevel} risk</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* State links */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {injury.name} Compensation by State
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {US_STATES.map(state => (
              <Link
                key={state.slug}
                href={`/${state.slug}/construction/${injury.slug}`}
                className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline py-1"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>

        {/* What to expect */}
        <section className="mb-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What to Expect with Your Claim</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="font-medium text-gray-900">Report the injury immediately</p>
                <p className="text-gray-500 mt-0.5">Notify your employer in writing. Most states require reporting within 30 days — delays can jeopardize your claim.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="font-medium text-gray-900">Seek authorized medical treatment</p>
                <p className="text-gray-500 mt-0.5">Your employer or insurer may direct you to a specific physician. Follow-up with a specialist if needed.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="font-medium text-gray-900">Document everything</p>
                <p className="text-gray-500 mt-0.5">Keep all medical records, missed pay stubs, and correspondence with your employer or insurer.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <p className="font-medium text-gray-900">Consult an attorney before settling</p>
                <p className="text-gray-500 mt-0.5">Workers' comp attorneys work on contingency — you pay nothing unless you win. Settlements for {injury.name.toLowerCase()} average ${(injury.avgMedicalCost * 1.5).toLocaleString(undefined, { maximumFractionDigits: 0 })} or more.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Get Your Free Estimate</h2>
          <p className="text-emerald-100 mb-6 text-sm">
            Takes 2 minutes · No obligation · Attorney review included
          </p>
          <Link
            href={`/calculator?injurySlug=${injury.slug}`}
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            Calculate My Compensation →
          </Link>
        </section>
      </div>
    </main>
  )
}
