import Link from 'next/link'
import CalculatorForm from '@/components/Calculator/CalculatorForm'
import LeadCaptureForm from '@/components/Results/LeadCaptureForm'
import LegalReviewer from '@/components/SEO/LegalReviewer'
import RelatedPages from '@/components/SEO/RelatedPages'
import TrustBadge from '@/components/SEO/TrustBadge'
import { RESULTS_DISCLAIMER } from '@/lib/compliance'
import { USState, Industry, InjuryType } from '@/types'
import { generatePageCopy } from '@/lib/copy-generator'
import { INJURY_CONTENT, STATE_CONTENT } from '@/lib/content-data'

interface Props {
  state: USState
  industry: Industry
  injury: InjuryType
}

const CURRENT_YEAR = new Date().getFullYear()

export default function InjuryPageTemplate({ state, industry, injury }: Props) {
  const copy = generatePageCopy(state, industry, injury)
  const injuryContent = INJURY_CONTENT[injury.slug]
  const stateContent  = STATE_CONTENT[state.slug]

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-[#e5e7eb] py-14 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            {/* Eyebrow */}
            <p className="eyebrow mb-5">
              {state.name} Workers&apos; Comp · {injury.category === 'occupational' ? 'Occupational Disease' : 'Injury Claim'}
            </p>

            {/* H1 — serif 2-line */}
            <h1
              className="serif font-bold leading-[1.12] mb-3"
              style={{ fontSize: 'clamp(28px,5vw,42px)', letterSpacing: '-0.04em' }}
            >
              <span className="text-[#111827] block">{injury.name} at work in {state.name}?</span>
              <span className="text-[#059669] block">Here&apos;s what the law actually says you&apos;re owed.</span>
            </h1>

            {/* Trust badges */}
            <TrustBadge state={state.abbr} />

            {/* Emerald divider */}
            <div className="em-divider" />

            {/* Statute box */}
            {stateContent && (
              <div
                className="bg-[#fafaf9] rounded-r-lg px-5 py-4 mb-5 text-[14px] text-[#374151] leading-[1.7]"
                style={{ borderLeft: '3px solid #059669' }}
              >
                In {state.name}, {injury.name.toLowerCase()} claims are governed by{' '}
                <span className="font-medium">{stateContent.statute}</span>. Workers receive{' '}
                <span className="font-medium">{(state.ttdRate * 100).toFixed(0)}%</span> of their
                average weekly wage (capped at{' '}
                <span className="font-medium">${state.maxWeeklyBenefit.toLocaleString()}/week</span>).
                Filing deadline: <span className="font-medium text-[#dc2626]">{state.sol}</span> from date of injury.
              </div>
            )}

            {/* Legal Reviewer */}
            <LegalReviewer state={state.slug} />

            <p className="text-[#6b7280] text-[15px] leading-relaxed mb-5">{copy.heroSub}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: 'Avg low',  value: `$${state.avgSettlement.low.toLocaleString()}` },
                { label: 'Avg high', value: `$${state.avgSettlement.high.toLocaleString()}` },
                { label: 'Deadline', value: state.sol.split(' ')[0] + ' ' + state.sol.split(' ')[1] },
              ].map(s => (
                <div key={s.label} className="border border-[#e5e7eb] rounded-[10px] px-4 py-3 text-center min-w-[90px]">
                  <p className="text-[#059669] font-semibold text-sm">{s.value}</p>
                  <p className="text-[#9ca3af] text-[11px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#e5e7eb] rounded-[10px] p-6 bg-white">
            <p className="eyebrow mb-4">
              Estimate your {state.name}-specific benefits:
            </p>
            <CalculatorForm
              preselectedState={state.slug}
              preselectedIndustry={industry.slug}
              preselectedInjury={injury.slug}
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 border-b border-gray-200 py-8 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: `${(state.ttdRate * 100).toFixed(0)}%`, l: 'of avg weekly wage (TTD)' },
            { v: `$${state.maxWeeklyBenefit.toLocaleString()}`, l: 'max weekly benefit' },
            { v: `${(state.attorneyFeeRate * 100).toFixed(0)}%`, l: 'typical attorney fee' },
            { v: state.sol.split(' ')[0], l: 'filing deadline' },
          ].map(s => (
            <div key={s.l}>
              <p className="text-gray-900 font-semibold text-xl">{s.v}</p>
              <p className="text-gray-500 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="py-14 px-8">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Section A — State Law Block */}
          {stateContent && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {state.name} Workers&apos; Comp Law — Key Facts
              </h2>
              <div
                className="bg-gray-50 rounded-xl p-5 space-y-3"
                style={{ borderLeft: '3px solid #059669' }}
              >
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Governing statute:</span>{' '}
                  <span className="text-gray-600">{stateContent.statute}</span>
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">TTD rate:</span>{' '}
                  <span className="text-gray-600">
                    {(state.ttdRate * 100).toFixed(0)}% of average weekly wage
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Maximum weekly benefit:</span>{' '}
                  <span className="text-gray-600">${state.maxWeeklyBenefit.toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Statute of limitations:</span>{' '}
                  <span className="text-gray-600">{state.sol}</span>
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Filing deadline:</span>{' '}
                  <span className="text-gray-600">
                    Report to employer within {stateContent.reportingDays} days
                  </span>
                </p>
              </div>
              {stateContent.uniqueFeatures.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key features of {state.name}&apos;s system:</p>
                  <ul className="space-y-1.5">
                    {stateContent.uniqueFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm text-gray-600 leading-relaxed mt-4">{stateContent.overview}</p>
            </section>
          )}

          {/* Section B — Injury-Specific Block */}
          {injuryContent && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                What to Expect with {injury.name} in {state.name}
              </h2>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-emerald-600">{injury.avgImpairmentRating}%</p>
                  <p className="text-[11px] text-gray-500 mt-1">Average impairment rating</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-emerald-600">${injury.avgMedicalCost.toLocaleString()}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Average medical costs</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">{injuryContent.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3">Common treatments</p>
                  <ul className="space-y-2">
                    {injuryContent.commonTreatments.map(t => (
                      <li key={t} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3">Documentation needed</p>
                  <ul className="space-y-2">
                    {injuryContent.documentationNeeded.map(d => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-sm font-medium text-gray-700">Return to work: </span>
                <span className="text-sm text-gray-600">{injuryContent.returnToWork}</span>
              </div>
            </section>
          )}

          {/* ── Featured Snippet Blocks ─────────────────────────────────── */}

          {/* Pattern A — Paragraph snippet (settlement amount queries) */}
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4 serif" style={{ letterSpacing: '-0.02em' }}>
              How Much Is a {injury.name} Workers&apos; Comp Settlement in {state.name}?
            </h2>
            <p className="text-[15px] text-[#374151] leading-[1.8]">
              In {state.name}, {injury.name.toLowerCase()} workers&apos; comp settlements typically range from{' '}
              <strong>${state.avgSettlement.low.toLocaleString()}</strong> to{' '}
              <strong>${state.avgSettlement.high.toLocaleString()}</strong>. The average settlement is approximately{' '}
              <strong>${Math.round((state.avgSettlement.low + state.avgSettlement.high) / 2).toLocaleString()}</strong>,
              though severe cases involving surgery or permanent disability can exceed ${state.avgSettlement.high.toLocaleString()}.{' '}
              {state.name} pays TTD at <strong>{(state.ttdRate * 100).toFixed(0)}%</strong> of your average weekly wage,
              capped at <strong>${state.maxWeeklyBenefit.toLocaleString()}/week</strong> under{' '}
              <strong>{state.statute}</strong>. Filing deadline:{' '}
              <strong className="text-[#dc2626]">{state.sol}</strong> from date of injury.
            </p>
          </section>

          {/* Pattern B — Table snippet (comparison queries) */}
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4 serif" style={{ letterSpacing: '-0.02em' }}>
              {state.name} {injury.name} Workers&apos; Comp Settlement Ranges by Severity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#e5e7eb]">
                    <th className="text-left py-3 pr-4 font-semibold text-[#111827]">Severity Level</th>
                    <th className="text-left py-3 font-semibold text-[#111827]">Typical Settlement Range</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const lo = state.avgSettlement.low
                    const hi = state.avgSettlement.high
                    const span = hi - lo
                    return [
                      {
                        level: 'Minor (no surgery, returned to work < 2 weeks)',
                        range: `$${lo.toLocaleString()} – $${Math.round(lo + span * 0.3).toLocaleString()}`,
                      },
                      {
                        level: 'Moderate (PT required, partial restrictions)',
                        range: `$${Math.round(lo + span * 0.3).toLocaleString()} – $${Math.round(lo + span * 0.6).toLocaleString()}`,
                      },
                      {
                        level: 'Severe (surgery or 3+ months off work)',
                        range: `$${Math.round(lo + span * 0.6).toLocaleString()} – $${hi.toLocaleString()}`,
                      },
                      {
                        level: 'Catastrophic (permanent disability)',
                        range: `$${hi.toLocaleString()}+ — attorney required`,
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'}>
                        <td className="py-3 pr-4 text-[#374151] border-b border-[#e5e7eb]">{row.level}</td>
                        <td className="py-3 font-medium text-[#059669] border-b border-[#e5e7eb]">{row.range}</td>
                      </tr>
                    ))
                  })()}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pattern C — List snippet (determining factors queries) */}
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4 serif" style={{ letterSpacing: '-0.02em' }}>
              What Determines a {injury.name} Workers&apos; Comp Settlement in {state.name}?
            </h2>
            <ul className="space-y-2">
              {[
                'Impairment rating assigned by your doctor',
                'Average weekly wage before injury',
                `${state.name}\u2019s TTD rate (${(state.ttdRate * 100).toFixed(0)}%)`,
                'Whether claim was accepted or denied',
                'Treatment status (pre-MMI vs. post-MMI)',
                'Whether you have legal representation',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#374151]">
                  <span className="text-[#059669] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Pattern D — Procedure snippet (how-to queries) */}
          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-4 serif" style={{ letterSpacing: '-0.02em' }}>
              How to File a Workers&apos; Comp Claim in {state.name} After {injury.name}
            </h2>
            <ol className="space-y-3">
              {[
                `Report your injury to your employer within ${state.reportingDays} days`,
                'Seek medical treatment from an authorized provider',
                `File DWC claim form within ${state.sol} of the injury date`,
                'Document all symptoms, treatments, and work limitations',
                'Do not sign any settlement without attorney review',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[#374151]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ecfdf5] text-[#059669] text-[12px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Section C — Denied Claim */}
          <section
            className="rounded-xl p-5"
            style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
          >
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              What if my {injury.name.toLowerCase()} claim was denied in {state.name}?
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed mb-3">
              Denied claims are common — and most are overturned with the right documentation.
              In {state.name}, you have the right to appeal to the {state.regulator} within {state.sol} of the original
              injury date under {state.statute}. Common reasons for denial include late reporting, missing medical
              documentation, or employer disputes.
            </p>
            <ul className="space-y-1.5">
              {[
                'Request a copy of the denial letter and reason',
                `File an appeal with the ${state.regulator}`,
                'Gather all medical records and doctor notes',
                'Contact a workers\u2019 comp attorney — most take cases on contingency',
              ].map(step => (
                <li key={step} className="flex items-start gap-2 text-sm text-[#374151]">
                  <span className="text-[#dc2626] font-bold mt-0.5 flex-shrink-0">→</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>

          {/* Section D — Employment Type Coverage */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Workers&apos; comp coverage by employment type in {state.name}
            </h2>
            <div className="space-y-2">
              {[
                { type: 'Full-time employee', coverage: `Fully covered under ${state.statute}.` },
                { type: 'Part-time employee', coverage: 'May receive prorated benefits based on average weekly wage.' },
                { type: 'Independent contractor', coverage: 'Generally not covered — but may qualify if misclassified.' },
                { type: 'Gig worker', coverage: `Coverage depends on degree of employer control. ${state.name} courts have expanded coverage in recent cases.` },
              ].map(row => (
                <div key={row.type} className="flex gap-3 text-sm border-b border-[#e5e7eb] pb-2">
                  <span className="font-medium text-[#111827] min-w-[160px] flex-shrink-0">{row.type}</span>
                  <span className="text-[#6b7280]">{row.coverage}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section E — FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {copy.faqItems.map(faq => (
                <div key={faq.q} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section D — Related Pages */}
          <RelatedPages state={state} industry={industry} injury={injury} />

        </div>
      </div>

      {/* Lead capture */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 px-8">
        <div className="max-w-xl mx-auto">
          <LeadCaptureForm
            prefill={{ country: 'us', state: state.slug, industry: industry.slug, injuryType: injury.slug }}
          />
          <p className="text-[11px] text-gray-400 text-center mt-4 leading-[1.6] border-t border-gray-200 pt-4">
            {RESULTS_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="px-8 py-5 border-t border-gray-100">
        <nav className="max-w-5xl mx-auto text-xs text-gray-400 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href={`/${state.slug}`} className="hover:text-gray-600">{state.name} workers&apos; comp settlements</Link>
          <span>/</span>
          <Link href={`/${state.slug}/${industry.slug}`} className="hover:text-gray-600">{state.name} {industry.name} workers&apos; comp settlements</Link>
          <span>/</span>
          <span>{injury.name} workers&apos; comp in {state.name}</span>
        </nav>
      </div>
    </main>
  )
}
