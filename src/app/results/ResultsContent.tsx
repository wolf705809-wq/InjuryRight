'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { WorkersCompInput, CaseStrength } from '@/types'
import { calculateWorkersCompV2, formatUSD } from '@/lib/calculator-us'
import { US_STATES, INJURY_TYPES } from '@/lib/pseo-data'
import { saveLead } from '@/lib/supabase'
import { CONSENT_TEXT } from '@/lib/compliance'

// ── Helpers ──────────────────────────────────────────────────────────────────

function strengthColor(s: CaseStrength) {
  return s === 'Very Strong' ? '#059669' : s === 'Strong' ? '#0284c7' : s === 'Moderate' ? '#d97706' : '#dc2626'
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ResultsContent() {
  const p = useSearchParams()
  const [whyOpen,    setWhyOpen]    = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [unlocked,   setUnlocked]   = useState(false)
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [phone,      setPhone]      = useState('')
  const [consent,    setConsent]    = useState(false)
  const [formError,  setFormError]  = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Catastrophic gate
  const isCatastrophic = p.get('catastrophic') === 'true'
  const catastrophicState = p.get('state') || ''
  const catastrophicStateData = US_STATES.find(s => s.slug === catastrophicState)

  if (isCatastrophic) {
    return <CatastrophicGate stateName={catastrophicStateData?.name ?? 'your state'} />
  }

  // Parse V2 input
  const input: WorkersCompInput = {
    state:               p.get('state') || '',
    industry:            p.get('industry') || '',
    injurySlug:          p.get('injurySlug') || '',
    employmentStatus:    (p.get('employmentStatus') as WorkersCompInput['employmentStatus']) || 'full-time',
    employerControl:     (p.get('employerControl') as WorkersCompInput['employerControl']) || null,
    severityLevel:       (p.get('severityLevel') as WorkersCompInput['severityLevel']) || 'moderate',
    weeklyWage:          Number(p.get('weeklyWage') || 800),
    employmentMonths:    Number(p.get('employmentMonths') || 24),
    treatmentStatus:     (p.get('treatmentStatus') as WorkersCompInput['treatmentStatus']) || 'treating',
    claimStatus:         (p.get('claimStatus') as WorkersCompInput['claimStatus']) || 'pending',
    companyOffer:        p.get('companyOffer') ? Number(p.get('companyOffer')) : null,
    hasImpairmentRating: p.get('hasImpairmentRating') === 'true',
    impairmentRating:    Number(p.get('impairmentRating') || 10),
  }

  const result     = calculateWorkersCompV2(input)
  const stateData  = US_STATES.find(s => s.slug === input.state)
  const injuryData = INJURY_TYPES.find(i => i.slug === input.injurySlug)

  if (!result.scenarios.expected.total) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <p className="text-gray-500 mb-4">No results found.</p>
          <Link href="/calculator" className="text-emerald-600 hover:underline text-sm">Go back to calculator</Link>
        </div>
      </div>
    )
  }

  const { scenarios, breakdown, companyOfferAnalysis, caseStrength, caseStrengthScore, urgencyFlags, whyThisNumber, filingDeadline, coverageNote } = result

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) { setFormError('You must agree to be contacted.'); return }
    setSubmitting(true); setFormError('')
    const res = await saveLead({
      name, email, phone: phone || undefined,
      country: 'us',
      state: input.state,
      industry: input.industry,
      injuryType: input.injurySlug,
      weeklyWage: input.weeklyWage,
      employmentMonths: input.employmentMonths,
      employmentStatus: input.employmentStatus,
      employerControl: input.employerControl ?? undefined,
      severityLevel: input.severityLevel,
      treatmentStatus: input.treatmentStatus,
      claimStatus: input.claimStatus,
      companyOffer: input.companyOffer,
      isEstimatedRating: breakdown.isEstimatedRating,
      impairmentRating: breakdown.impairmentRatingUsed,
      ttdEstimate: breakdown.ttd,
      ppdEstimate: breakdown.ppd,
      medicalEstimate: breakdown.medicalEstimate,
      totalLow: scenarios.conservative.total,
      totalHigh: scenarios.bestCase.total,
      caseStrength,
      caseStrengthScore,
      consent,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    })
    setSubmitting(false)
    if (res.success) { setSubmitted(true); setUnlocked(true) }
    else setFormError('Something went wrong. Please try again.')
  }

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">

        {/* ── PHASE 1: Always visible ─────────────────────────────────────── */}

        {/* Urgency flags */}
        {urgencyFlags.length > 0 && (
          <div className="mb-5 space-y-2">
            {urgencyFlags.map((flag, i) => (
              <div key={i} className="border-l-[3px] border-red-600 bg-red-50 px-4 py-3 rounded-r-lg">
                <p className="text-[13px] text-red-900">⚠ {flag}</p>
              </div>
            ))}
          </div>
        )}

        {/* Coverage note */}
        {coverageNote && (
          <div className="mb-4 border border-amber-200 bg-amber-50 rounded-lg px-4 py-3">
            <p className="text-xs text-amber-800">{coverageNote}</p>
          </div>
        )}

        {/* Estimated range */}
        <div className="text-center py-8 bg-white rounded-xl border border-gray-200 mb-4">
          <p className="text-[11px] text-gray-500 uppercase tracking-[0.08em] mb-2">Estimated compensation range</p>
          <p
            className="font-bold text-emerald-600 mb-1"
            style={{ fontSize: 'clamp(28px, 6vw, 48px)', letterSpacing: '-1px' }}
          >
            {formatUSD(scenarios.conservative.total)} – {formatUSD(scenarios.bestCase.total)}
          </p>
          <p className="text-[12px] text-gray-400">
            Based on {stateData?.name ?? 'state'} workers&apos; comp law · {new Date().getFullYear()}
          </p>
        </div>

        {/* Three scenarios */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* Conservative */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-[11px] text-gray-500 mb-1">Conservative</p>
            <p className="text-[18px] font-semibold text-gray-900">{formatUSD(scenarios.conservative.total)}</p>
            <p className="text-[11px] text-gray-400 mt-1 leading-tight">{scenarios.conservative.description}</p>
          </div>
          {/* Expected */}
          <div className="border-2 border-emerald-600 rounded-xl p-4 relative">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              Most likely
            </span>
            <p className="text-[11px] text-gray-500 mb-1">Expected</p>
            <p className="text-[22px] font-bold text-emerald-600">{formatUSD(scenarios.expected.total)}</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">{scenarios.expected.description}</p>
          </div>
          {/* Best case */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-[11px] text-gray-500 mb-1">Best case</p>
            <p className="text-[18px] font-semibold text-gray-900">{formatUSD(scenarios.bestCase.total)}</p>
            <p className="text-[11px] text-gray-400 mt-1 leading-tight">{scenarios.bestCase.description}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-[14px] font-semibold text-gray-900">How this is calculated</p>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-gray-700">Temporary Total Disability (TTD)</span>
              <span className="text-sm font-semibold text-gray-900">{formatUSD(breakdown.ttd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-gray-700">Permanent Partial Disability (PPD)</span>
              <span className="text-sm font-semibold text-gray-900">{formatUSD(breakdown.ppd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-gray-700">Medical costs (estimated)</span>
              <span className="text-sm font-semibold text-gray-900">~{formatUSD(breakdown.medicalEstimate)}</span>
            </div>
            {breakdown.isEstimatedRating && (
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-500">Impairment rating used</span>
                <span className="text-sm text-gray-400">~{breakdown.impairmentRatingUsed}% (estimated)</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-900">Expected total</span>
            <span className="text-sm font-bold text-emerald-600">{formatUSD(scenarios.expected.total)}</span>
          </div>
        </div>

        {/* Case strength */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <p className="text-[14px] font-semibold text-gray-900 mb-3">Your case strength</p>
          <div className="h-2 bg-gray-200 rounded-full mb-2">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${caseStrengthScore}%`, background: strengthColor(caseStrength) }}
            />
          </div>
          <p className="text-[16px] font-semibold" style={{ color: strengthColor(caseStrength) }}>
            {caseStrength}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Impairment rating · Severity · Claim status · Employment duration
          </p>
        </div>

        {/* Company offer comparison */}
        {companyOfferAnalysis.offerAmount !== null && companyOfferAnalysis.offerPct !== null && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-3">Their offer vs. your estimate</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Their offer</span>
                  <span className="font-medium">{formatUSD(companyOfferAnalysis.offerAmount)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${Math.min(companyOfferAnalysis.offerPct, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Expected settlement</span>
                  <span className="font-medium text-emerald-600">{formatUSD(scenarios.expected.total)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            {companyOfferAnalysis.message && (
              <p className={`mt-3 text-[13px] leading-relaxed ${
                (companyOfferAnalysis.offerPct ?? 100) < 50 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {companyOfferAnalysis.message}
              </p>
            )}
          </div>
        )}

        {/* WhyThisNumber accordion */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <button
            type="button"
            onClick={() => setWhyOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[14px] font-semibold text-gray-900">Why these numbers?</span>
            <span className="text-gray-400 text-lg leading-none">{whyOpen ? '↑' : '↓'}</span>
          </button>
          {whyOpen && (
            <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
              <p className="text-[13px] text-gray-700 leading-relaxed">{whyThisNumber.ttdExplanation}</p>
              <p className="text-[13px] text-gray-700 leading-relaxed">{whyThisNumber.ppdExplanation}</p>
              <p className="text-[13px] text-gray-700 leading-relaxed">{whyThisNumber.rangeExplanation}</p>
              <div>
                <p className="text-[12px] font-semibold text-gray-900 mb-2">Key factors affecting your estimate:</p>
                <ul className="space-y-1">
                  {whyThisNumber.keyFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                      <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
                This is an estimate based on {stateData?.name ?? 'state'} law and similar cases. Actual settlement
                depends on case-specific factors only an attorney can assess.
              </p>
            </div>
          )}
        </div>

        {/* Statute of limitations */}
        <div className={`rounded-lg px-4 py-3 mb-6 ${
          filingDeadline.urgency === 'high' ? 'bg-red-50' : 'bg-gray-50'
        }`}>
          <p className={`text-[13px] ${
            filingDeadline.urgency === 'high' ? 'text-red-700 font-semibold' : 'text-gray-600'
          }`}>
            ⏰ Filing deadline in {stateData?.name ?? 'your state'}: {filingDeadline.sol}
          </p>
        </div>

        {/* ── PHASE 2: Gated ──────────────────────────────────────────────── */}
        <div style={{ borderTop: '2px dashed #e5e7eb', marginTop: '8px', paddingTop: '32px' }}>

          {/* Lock preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-5">
            <p className="text-[15px] font-semibold text-gray-900 mb-4">Your free case report includes:</p>
            <div className="space-y-0">
              {[
                `Which attorneys in ${stateData?.name ?? 'your state'} handle ${injuryData?.name ?? 'your injury type'} cases — with contact info`,
                `Your exact filing deadline (${filingDeadline.sol})`,
                'What to say in your first attorney call — and what not to say',
                'Red flags to watch for in employer settlement offers',
                `Step-by-step guide to maximizing your ${stateData?.name ?? 'state'} claim`,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-200 last:border-0">
                  {unlocked
                    ? <span className="text-emerald-600 mt-0.5 shrink-0 text-sm">✓</span>
                    : <span className="mt-0.5 shrink-0"><LockIcon /></span>
                  }
                  <span className={`text-[13px] ${unlocked ? 'text-gray-800' : 'text-gray-600'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead form or thank you */}
          {submitted ? (
            <ThankYou stateName={stateData?.name ?? 'your state'} />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-1">Get my free case report →</h3>
              <p className="text-sm text-gray-500 mb-5">A licensed attorney in your state will contact you within 24 hours. No fees unless you win.</p>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className={inputClass}
                />
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox" id="consent2" checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5"
                    style={{ accentColor: '#059669' }}
                  />
                  <label htmlFor="consent2" className="text-[11px] text-gray-500 leading-relaxed cursor-pointer">
                    {CONSENT_TEXT}
                  </label>
                </div>
                {formError && <p className="text-red-500 text-xs">{formError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3.5 rounded-lg text-[15px] transition-colors border-none cursor-pointer"
                >
                  {submitting ? 'Submitting…' : 'Get my free case report →'}
                </button>
                <p className="text-[12px] text-gray-400 text-center">
                  No spam. One contact from a licensed attorney in {stateData?.name ?? 'your state'}. That&apos;s it.
                </p>
              </form>
            </div>
          )}

          {/* Unlocked content */}
          {unlocked && (
            <div className="mt-5 space-y-4">
              {/* Attorney guide */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">Your first attorney call — what to say</p>
                <div className="space-y-2">
                  {[
                    { label: 'DO', text: 'Report your injury date accurately', green: true },
                    { label: 'DO', text: 'Describe all symptoms, even minor ones', green: true },
                    { label: "DON'T", text: 'Sign anything without review', green: false },
                    { label: "DON'T", text: 'Give recorded statements to insurers', green: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className={`font-semibold shrink-0 ${item.green ? 'text-emerald-600' : 'text-red-500'}`}>
                        {item.label}
                      </span>
                      <span className="text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red flags */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">Watch for these red flags in settlement offers:</p>
                <ul className="space-y-1.5">
                  {[
                    '"Full and final" release language',
                    'Pressure to settle before MMI',
                    'Medical-only settlement (no wage loss)',
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-red-500 shrink-0 mt-0.5">⚠</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next steps */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">Your next 5 steps</p>
                <ol className="space-y-2">
                  {[
                    'Get your free attorney consultation (no obligation)',
                    'Document all medical visits and symptoms',
                    'Do not speak to the insurer adjuster without counsel',
                    'Request copies of all claim documents',
                    'Let your attorney handle all negotiations',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-emerald-600 font-semibold shrink-0">{i + 1}.</span>{step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                <p className="text-[13px] text-emerald-800">
                  A licensed workers&apos; comp specialist in {stateData?.name ?? 'your state'} will contact you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[14px] font-semibold text-gray-900 mb-5">What the claims process typically looks like</p>
            <div className="relative">
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-5">
                {[
                  { time: 'Week 1',       title: 'Free attorney consultation', desc: 'Review your claim, verify coverage, assess case strength' },
                  { time: 'Weeks 2–4',    title: 'Claim evaluation & filing', desc: 'Attorney files or responds to insurer' },
                  { time: 'Month 2–3',    title: 'Medical evaluation', desc: 'Independent medical exam if needed, impairment rating assessed' },
                  { time: 'Month 3–6',    title: 'Negotiation begins', desc: "Attorney negotiates with insurer or employer's counsel" },
                  { time: 'Month 6–18',   title: 'Settlement reached', desc: `Most cases in ${stateData?.name ?? 'your state'} settle within this window. Complex cases may take longer.` },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pl-7 relative">
                    <div className="absolute left-0 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-600 font-medium">{item.time}</p>
                      <p className="text-[13px] font-semibold text-gray-900">{item.title}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4">
            <p className="text-[11px] text-gray-400 leading-[1.7]">
              This calculator provides estimates for informational purposes only and does not constitute legal advice.
              Results are based on state law formulas and statistical averages — actual compensation depends on the
              specific facts of your case. WorkerRight is not a law firm. Attorney advertising. Prior results do not
              guarantee similar outcomes. Always consult a licensed workers&apos; compensation attorney in your state.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/calculator" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">
            ← Recalculate
          </Link>
        </div>
      </div>
    </main>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ThankYou({ stateName }: { stateName: string }) {
  return (
    <div className="bg-white border border-emerald-200 rounded-xl p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
        <span className="text-emerald-600 text-2xl">✓</span>
      </div>
      <h3 className="text-[20px] font-semibold text-gray-900 mb-2">Your case report is ready</h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        A workers&apos; comp specialist in {stateName} will contact you within 24 hours to discuss your case.
        No obligation.
      </p>
    </div>
  )
}

function CatastrophicGate({ stateName }: { stateName: string }) {
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [phone,      setPhone]      = useState('')
  const [consent,    setConsent]    = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [err,        setErr]        = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) { setErr('You must agree to be contacted.'); return }
    setSubmitting(true); setErr('')
    const res = await saveLead({ name, email, phone: phone || undefined, country: 'us', state: stateName.toLowerCase().replace(' ', '-'), consent })
    setSubmitting(false)
    if (res.success) setSubmitted(true)
    else setErr('Something went wrong. Please try again.')
  }

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-600 text-2xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Request received</h2>
          <p className="text-sm text-gray-500">A catastrophic injury specialist in {stateName} will contact you within 24 hours.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-7 mb-6">
          <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Your case requires specialist review</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Catastrophic injuries involve complex long-term calculations that standard formulas significantly underestimate.
            These cases often involve lifetime benefits, vocational rehabilitation, and additional legal claims beyond
            workers&apos; comp.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            We won&apos;t give you a number that could cost you hundreds of thousands of dollars. Instead, connect with
            a specialist attorney who handles catastrophic injury cases.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Get specialist review — free</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className={inputClass} />
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" className={inputClass} />
            <div className="flex items-start gap-3">
              <input type="checkbox" id="cat-consent" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5" style={{ accentColor: '#059669' }} />
              <label htmlFor="cat-consent" className="text-[11px] text-gray-500 leading-relaxed cursor-pointer">{CONSENT_TEXT}</label>
            </div>
            {err && <p className="text-red-500 text-xs">{err}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 text-white font-medium py-3.5 rounded-lg text-sm transition-colors"
            >
              {submitting ? 'Submitting…' : 'Get specialist review — free →'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/calculator" className="text-gray-400 hover:text-gray-600 text-xs">← Back to calculator</Link>
        </div>
      </div>
    </main>
  )
}
