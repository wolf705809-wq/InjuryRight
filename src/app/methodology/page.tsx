import type { Metadata } from 'next'
import { US_STATES } from '@/lib/pseo-data'
import { UPDATE_LOG } from '@/lib/update-log'

export const metadata: Metadata = {
  title: "How Our Workers' Comp Calculator Works | WorkerRight",
  description: "Transparent explanation of our calculation methodology, data sources, and limitations.",
}

const SYSTEM_TABLE = [
  { system: 'AMA Guides', states: 'FL, TX, CO, GA, AZ, PA, and most others', formula: 'Impairment % × state weeks × weekly rate' },
  { system: 'Scheduled (NY, NJ)', states: 'New York, New Jersey', formula: 'Body part weeks × impairment % × weekly rate' },
  { system: 'California PDRS', states: 'California only', formula: 'PD rating → weeks table → × $290/week' },
  { system: 'Percentage-of-Person', states: 'Illinois', formula: 'PPD = (rating/100) × 500 × (AWW × 0.60)' },
  { system: 'Wage-Loss', states: 'Michigan', formula: 'Scheduled weeks × weekly benefit or 2 years wage loss' },
]

const LIMITATIONS = [
  'Third-party liability claims (e.g., equipment manufacturer)',
  'Pre-existing conditions that affect impairment ratings',
  'Disputed claims where liability is contested',
  'Pain and suffering (not covered by workers\' comp)',
  'Penalties for employer misconduct or late payment',
  'Death benefits calculation',
  'Occupational disease with long latency periods',
]

const recentLog = UPDATE_LOG.slice(0, 10)

export default function MethodologyPage() {
  return (
    <main className="bg-white py-14 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ letterSpacing: '-0.5px' }}>
          How Our Calculator Works
        </h1>
        <p className="text-base text-gray-500 mb-10">
          Transparent explanation of our calculation methodology, data sources, and limitations.
        </p>

        {/* Section 1: TTD */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            1. Temporary Total Disability (TTD)
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            TTD benefits replace lost wages while you are unable to work due to your injury. The
            calculation follows a three-step process used by workers&apos; compensation systems in all 47 states.
          </p>
          <div className="space-y-3 mb-5">
            {[
              { step: 'Step 1', label: 'Average Weekly Wage (AWW)', desc: 'Your pre-injury weekly earnings, typically averaged over the prior 52 weeks.' },
              { step: 'Step 2', label: 'Weekly benefit', desc: 'min(AWW × state_ttd_rate, state_max_weekly_benefit)' },
              { step: 'Step 3', label: 'TTD total', desc: 'Weekly benefit × treatment weeks (capped at 104 weeks in most states)' },
            ].map(s => (
              <div key={s.step} className="flex gap-4 text-sm">
                <span className="text-emerald-600 font-semibold w-16 flex-shrink-0">{s.step}</span>
                <div>
                  <span className="font-medium text-gray-800">{s.label}: </span>
                  <span className="text-gray-600">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="rounded-lg p-4 text-sm"
            style={{ background: '#f9fafb', borderLeft: '3px solid #059669' }}
          >
            <p className="font-medium text-gray-800 mb-2">Example — California, $1,500/week wage:</p>
            <p className="text-gray-600">$1,500 × 66.7% = $1,000/week benefit (under CA cap of $1,619)</p>
            <p className="text-gray-600">× 12 weeks treatment = <span className="font-semibold">$12,000 TTD total</span></p>
          </div>
        </section>

        {/* Section 2: PPD */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            2. Permanent Partial Disability (PPD)
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            PPD compensates for permanent impairment remaining after Maximum Medical Improvement (MMI).
            The calculation method varies by state system:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">System</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">States</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SYSTEM_TABLE.map(row => (
                  <tr key={row.system}>
                    <td className="py-3 pr-4 font-medium text-gray-800 whitespace-nowrap">{row.system}</td>
                    <td className="py-3 pr-4 text-gray-500">{row.states}</td>
                    <td className="py-3 text-gray-600 font-mono text-xs">{row.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Settlement range */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Settlement Range Multiplier</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our estimates apply a <strong>1.1x–2.5x multiplier</strong> to the calculated TTD + PPD + Medical
            total to account for attorney negotiation, case complexity, and employer/insurer behavior.
            The multiplier is calibrated against actual settlement data from state DWC annual reports.
            Actual settlements vary significantly based on these factors. Our calculator provides an
            informed estimate, not a guaranteed outcome.
          </p>
        </section>

        {/* Section 4: Data sources */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Sources</h2>
          <p className="text-sm text-gray-600 mb-5">
            Benefit rates are sourced from official state workers&apos; compensation regulators:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">State</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Governing Statute</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {US_STATES.slice(0, 15).map(s => (
                  <tr key={s.slug}>
                    <td className="py-2.5 pr-4 font-medium text-gray-800">{s.name}</td>
                    <td className="py-2.5 pr-4 text-gray-500 text-xs">{s.statute ?? '—'}</td>
                    <td className="py-2.5">
                      {s.regulatorLink ? (
                        <a
                          href={s.regulatorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline text-xs"
                        >
                          {s.regulator} ↗
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">Showing 15 of 47 states. All states use official regulator data.</p>
        </section>

        {/* Section 5: Limitations */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">5. What Our Calculator Cannot Account For</h2>
          <ul className="space-y-2 mb-5">
            {LIMITATIONS.map(l => (
              <li key={l} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-gray-400 mt-0.5 flex-shrink-0">·</span> {l}
              </li>
            ))}
          </ul>
          <div
            className="rounded-lg p-4 text-sm text-gray-600"
            style={{ background: '#fef9c3', borderLeft: '3px solid #f59e0b' }}
          >
            For these situations, consulting a licensed workers&apos; compensation attorney is essential.
          </div>
        </section>

        {/* Section 6: Update log */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Update Schedule</h2>
          <p className="text-sm text-gray-600 mb-5">
            We update state benefit rates quarterly, or immediately when state legislatures pass rate
            changes. Recent updates:
          </p>
          <div className="divide-y divide-gray-100">
            {recentLog.map((e, i) => (
              <div key={i} className="py-2.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span className="text-gray-400 w-16">{e.date}</span>
                <span className="font-medium text-gray-700">{e.stateName}</span>
                <span className="text-gray-600 flex-1">{e.change}</span>
                <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-xs">
                  {e.source} ↗
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
