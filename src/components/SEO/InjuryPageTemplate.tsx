import Link from 'next/link'
import CalculatorForm from '@/components/Calculator/CalculatorForm'
import LeadCaptureForm from '@/components/Results/LeadCaptureForm'
import LegalReviewer from '@/components/SEO/LegalReviewer'
import RelatedPages from '@/components/SEO/RelatedPages'
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
      <section className="border-b border-gray-200 py-14 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
              <span className="text-emerald-600">●</span>
              {state.name} Workers&apos; Comp · {injury.category === 'occupational' ? 'Occupational Disease' : 'Injury Claim'}
            </span>
            <h1
              className="font-semibold text-gray-900 leading-tight mb-2"
              style={{ fontSize: 'clamp(20px, 3.5vw, 30px)', letterSpacing: '-0.4px' }}
            >
              {copy.heroHeadline}
            </h1>
            <p className="text-[12px] text-gray-400 mb-4">
              Last updated: {CURRENT_YEAR} · Verified against {state.name} DWC regulations
            </p>

            {/* Legal Reviewer */}
            <LegalReviewer state={state.slug} />

            <p className="text-gray-500 text-base leading-relaxed mb-6">{copy.heroSub}</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed">
              {copy.statCallout}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: 'Avg low',  value: `$${state.avgSettlement.low.toLocaleString()}` },
                { label: 'Avg high', value: `$${state.avgSettlement.high.toLocaleString()}` },
                { label: 'Deadline', value: state.sol.split(' ')[0] + ' ' + state.sol.split(' ')[1] },
              ].map(s => (
                <div key={s.label} className="border border-gray-200 rounded-lg px-4 py-3 text-center min-w-[90px]">
                  <p className="text-emerald-600 font-semibold text-sm">{s.value}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <p className="text-xs text-gray-500 mb-4">Pre-filled for your situation — just add your wage &amp; impairment info.</p>
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

          {/* Section C — FAQ */}
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
          <Link href={`/${state.slug}`} className="hover:text-gray-600">{state.name}</Link>
          <span>/</span>
          <Link href={`/${state.slug}/${industry.slug}`} className="hover:text-gray-600">{industry.name}</Link>
          <span>/</span>
          <span>{injury.name}</span>
        </nav>
      </div>
    </main>
  )
}
