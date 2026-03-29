import Link from 'next/link'
import { USState, Industry, InjuryType } from '@/types'
import CalculatorForm from '@/components/Calculator/CalculatorForm'

interface Props {
  state: USState
  industries: Industry[]
  injuries: InjuryType[]
}

export default function StatePageTemplate({ state, industries, injuries }: Props) {
  return (
    <main className="bg-white">
      <section className="border-b border-gray-200 py-14 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
              <span className="text-emerald-600">●</span>
              {state.abbr} Workers' Compensation
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4" style={{ letterSpacing: '-0.4px' }}>
              {state.name} Workers' Compensation Guide
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Injured at work in {state.name}? Find out what your claim is worth. Workers typically receive
              ${state.avgSettlement.low.toLocaleString()}–${state.avgSettlement.high.toLocaleString()} in {state.name}.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Max weekly benefit', value: `$${state.maxWeeklyBenefit.toLocaleString()}` },
                { label: 'TTD rate', value: `${(state.ttdRate * 100).toFixed(0)}% of AWW` },
                { label: 'Filing deadline', value: state.sol },
                { label: 'Avg attorney fee', value: `${(state.attorneyFeeRate * 100).toFixed(0)}%` },
              ].map(s => (
                <div key={s.label} className="border border-gray-200 rounded-lg px-4 py-3">
                  <p className="text-emerald-600 font-semibold text-sm">{s.value}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <CalculatorForm preselectedState={state.slug} />
          </div>
        </div>
      </section>

      <section className="py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Claims by industry in {state.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map(ind => (
              <Link key={ind.slug} href={`/${state.slug}/${ind.slug}`}
                className="border border-gray-200 hover:border-emerald-500 rounded-xl p-4 transition-colors group">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">{ind.name}</p>
                <p className="text-[11px] text-gray-400 mt-1 capitalize">{ind.riskLevel} risk</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 px-8 border-t border-gray-100 pt-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Common injuries in {state.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {injuries.slice(0, 12).map(inj => (
              <Link key={inj.slug} href={`/injuries/${inj.slug}`}
                className="border border-gray-200 hover:border-emerald-500 rounded-lg p-3 transition-colors group text-sm text-gray-700 group-hover:text-emerald-700">
                {inj.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
