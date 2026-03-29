import Link from 'next/link'
import type { Metadata } from 'next'
import { US_STATES, INJURY_TYPES } from '@/lib/pseo-data'
import { NATIONAL_STATS, getStateSettlement } from '@/lib/settlement-data'

export const metadata: Metadata = {
  title: "US Workers' Comp Statistics 2025 — All 47 States | WorkInjuryCalc",
  description: "State-by-state average settlements, injury rates, and weekly benefit caps. Data sourced from BLS and state DWC reports.",
  openGraph: {
    title: "US Workers' Comp Statistics 2025 — All 47 States | WorkInjuryCalc",
    description: "State-by-state average settlements, injury rates, and weekly benefit caps. Data sourced from BLS and state DWC reports.",
  },
}

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: "US Workers' Compensation Settlement Statistics 2025",
  description: 'State-by-state workers\' comp settlement data',
  url: 'https://workinjurycalc.com/workers-comp-statistics',
  creator: { '@type': 'Organization', name: 'WorkInjuryCalc' },
  temporalCoverage: '2020/2023',
  spatialCoverage: 'United States',
}

const TOP_STATES = US_STATES.slice(0, 10)

export default function WorkersCompStatisticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <main className="bg-white py-14 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ letterSpacing: '-0.5px' }}>
            US Workers&apos; Compensation Statistics 2025
          </h1>
          <p className="text-base text-gray-500 mb-10">
            State-by-state average settlements, benefit caps, and injury data. All figures sourced from
            official state DWC reports and Bureau of Labor Statistics.
          </p>

          {/* Section 1: National stats */}
          <section className="mb-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { v: `$${NATIONAL_STATS.avgSettlementNational.toLocaleString()}`, l: 'Average settlement', sub: 'All 47 states (2023)' },
                { v: NATIONAL_STATS.totalClaimsAnnual.toLocaleString(), l: 'Annual claims filed', sub: 'United States' },
                { v: '2.4x', l: 'Higher with attorney', sub: 'vs. unrepresented' },
                { v: `${NATIONAL_STATS.avgTimeToSettlementMonths} mo`, l: 'Avg time to settlement', sub: 'With attorney' },
              ].map(s => (
                <div key={s.l} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                  <p className="text-2xl font-bold text-gray-900">{s.v}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{s.l}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Data:{' '}
              <a href={NATIONAL_STATS.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                Bureau of Labor Statistics (BLS)
              </a>
              {', '}
              <a href="https://www.ncci.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                NCCI
              </a>
              {', and individual state DWC annual reports. Updated January 2025.'}
            </p>
          </section>

          {/* Section 2: State comparison table */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">State-by-State Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">State</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Avg Settlement</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Max Weekly Benefit</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">TTD Rate</th>
                    <th className="text-left py-3 font-semibold text-gray-700">Statute of Limitations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {US_STATES.map(s => {
                    const sd = getStateSettlement(s.slug)
                    return (
                      <tr key={s.slug} className="hover:bg-gray-50">
                        <td className="py-3 pr-4">
                          <Link href={`/${s.slug}`} className="font-medium text-emerald-700 hover:underline">
                            {s.name}
                          </Link>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          ${sd.overall.avgSettlement.toLocaleString()}
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          ${s.maxWeeklyBenefit.toLocaleString()}/wk
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {(s.ttdRate * 100).toFixed(0)}%
                        </td>
                        <td className="py-3 text-gray-500">{s.sol}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Injury type table */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Average Settlement by Injury Type</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Injury Type</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Avg Medical Cost</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Avg Impairment Rating</th>
                    <th className="text-left py-3 font-semibold text-gray-700">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {INJURY_TYPES.map(i => (
                    <tr key={i.slug} className="hover:bg-gray-50">
                      <td className="py-3 pr-4">
                        <Link href={`/injuries/${i.slug}`} className="font-medium text-emerald-700 hover:underline">
                          {i.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-gray-700">${i.avgMedicalCost.toLocaleString()}</td>
                      <td className="py-3 pr-4 text-gray-700">{i.avgImpairmentRating}%</td>
                      <td className="py-3 text-gray-500 capitalize">{i.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Attorney effect */}
          <section className="mb-14 bg-gray-50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">The Attorney Effect</h2>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Workers with an attorney receive <span className="text-emerald-600">2.4x higher settlements</span> on average
            </p>
            <p className="text-sm text-gray-500 mb-8">Source: NCCI 2023 Workers Compensation Statistical Bulletin</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Without attorney</span>
                  <span className="font-semibold text-gray-900">${NATIONAL_STATS.avgSettlementWithoutAttorney.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-gray-400 rounded-full" style={{ width: `${(NATIONAL_STATS.avgSettlementWithoutAttorney / NATIONAL_STATS.avgSettlementWithAttorney) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">With attorney</span>
                  <span className="font-semibold text-emerald-700">${NATIONAL_STATS.avgSettlementWithAttorney.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Top 10 states */}
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Top 10 States by Average Settlement</h2>
            <div className="space-y-2">
              {TOP_STATES.map((s, i) => {
                const sd = getStateSettlement(s.slug)
                return (
                  <div key={s.slug} className="flex items-center gap-4 py-2 border-b border-gray-100">
                    <span className="text-gray-400 font-semibold w-6 text-sm">#{i + 1}</span>
                    <Link href={`/${s.slug}`} className="font-medium text-emerald-700 hover:underline text-sm flex-1">
                      {s.name}
                    </Link>
                    <span className="font-semibold text-gray-900 text-sm">${sd.overall.avgSettlement.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs">{sd.overall.source}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Internal links */}
          <section>
            <p className="text-sm font-medium text-gray-700 mb-4">Find your state&apos;s average settlement →</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {TOP_STATES.map(s => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="border border-gray-200 hover:border-emerald-400 rounded-lg px-3 py-2 text-center text-sm text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
