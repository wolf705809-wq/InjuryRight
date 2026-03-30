import Link from 'next/link'
import { USState, Industry, InjuryType } from '@/types'
import CalculatorForm from '@/components/Calculator/CalculatorForm'
import TrustBadge from '@/components/SEO/TrustBadge'

interface Props {
  state: USState
  industry: Industry
  injuries: InjuryType[]
}

export default function IndustryPageTemplate({ state, industry, injuries }: Props) {
  const commonInjuries = injuries.filter(i => industry.commonInjuries.includes(i.slug))
  const otherInjuries  = injuries.filter(i => !industry.commonInjuries.includes(i.slug))

  return (
    <main className="bg-white">
      <section className="border-b border-gray-200 py-14 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
              <span className="text-emerald-600">●</span>
              {state.name} · {industry.name}
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3" style={{ letterSpacing: '-0.4px' }}>
              {industry.name} Workers&apos; Comp in {state.name}
            </h1>
            <TrustBadge state={state.abbr} />
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              {industry.name} is a <strong className="text-gray-900">{industry.riskLevel.replace('-', ' ')} risk</strong> industry.
              Workers in {state.name} typically receive ${state.avgSettlement.low.toLocaleString()}–${state.avgSettlement.high.toLocaleString()}.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
              <p>In {state.name}, TTD benefits are capped at <strong>${state.maxWeeklyBenefit.toLocaleString()}/week</strong>. Statute of limitations: <strong>{state.sol}</strong>.</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <CalculatorForm preselectedState={state.slug} preselectedIndustry={industry.slug} />
          </div>
        </div>
      </section>

      <section className="py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Common injuries in {industry.name}</h2>
          <p className="text-sm text-gray-500 mb-5">Select an injury type for a detailed compensation estimate.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonInjuries.map(inj => (
              <Link key={inj.slug} href={`/${state.slug}/${industry.slug}/${inj.slug}`}
                className="border border-emerald-200 bg-emerald-50/50 hover:border-emerald-500 rounded-xl p-4 transition-colors group">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">{inj.name} workers&apos; comp settlements in {state.name}</p>
                <p className="text-[11px] text-gray-500 mt-1">Avg medical cost: ${inj.avgMedicalCost.toLocaleString()} · Avg impairment: {inj.avgImpairmentRating}%</p>
              </Link>
            ))}
          </div>
          {otherInjuries.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">Other covered injuries</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {otherInjuries.map(inj => (
                  <Link key={inj.slug} href={`/${state.slug}/${industry.slug}/${inj.slug}`}
                    className="border border-gray-200 hover:border-emerald-400 rounded-lg p-3 text-sm text-gray-700 hover:text-emerald-700 transition-colors">
                    {inj.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="px-8 py-5 border-t border-gray-100">
        <nav className="max-w-5xl mx-auto text-xs text-gray-400 flex gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href={`/${state.slug}`} className="hover:text-gray-600">{state.name} workers&apos; comp settlements</Link>
          <span>/</span>
          <span>{state.name} {industry.name} workers&apos; comp settlements</span>
        </nav>
      </div>
    </main>
  )
}
