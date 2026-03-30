'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { WorkersCompInput, CaseStrength } from '@/types'
import { calculateWorkersCompV2, formatUSD } from '@/lib/calculator-us'
import { US_STATES, INJURY_TYPES } from '@/lib/pseo-data'
import { saveLead, trackCallClick } from '@/lib/supabase'
import {
  sanitizeName, validateName,
  sanitizePhone, formatPhone, validatePhone,
  validateEmail, isFormValid,
} from '@/lib/form-validation'

// ── Helpers ───────────────────────────────────────────────────────────────────

function strengthColor(s: CaseStrength) {
  return s === 'Very Strong' ? '#059669'
    : s === 'Strong'   ? '#0284c7'
    : s === 'Moderate' ? '#d97706'
    : '#dc2626'
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ResultsContent() {
  const p = useSearchParams()
  const [whyOpen,    setWhyOpen]    = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [phone,      setPhone]      = useState('')
  const [consent,    setConsent]    = useState(false)
  const [formError,  setFormError]  = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [nameError,  setNameError]  = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showSticky, setShowSticky] = useState(false)

  // Catastrophic gate
  const isCatastrophic = p.get('catastrophic') === 'true'
  const catastrophicState = p.get('state') || ''
  const catastrophicStateData = US_STATES.find(s => s.slug === catastrophicState)

  // Sticky scroll listener
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Social proof count — stable pseudo-random per state
  const todayCount = useMemo(() => {
    const stateKey = p.get('state') || ''
    const seed = stateKey.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return 8 + (seed % 15) // 8–22
  }, [p])

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
          <p className="text-[#6b7280] mb-4">No results found.</p>
          <Link href="/calculator" className="text-[#059669] hover:underline text-sm">Go back to calculator</Link>
        </div>
      </div>
    )
  }

  const {
    scenarios, breakdown, companyOfferAnalysis,
    caseStrength, caseStrengthScore, urgencyFlags,
    whyThisNumber, filingDeadline, coverageNote,
  } = result

  const scrollToForm = useCallback(() => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const handleCallClick = useCallback(async () => {
    await trackCallClick({
      state: input.state,
      injury: input.injurySlug,
      estimatedTotal: scenarios.expected.total,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }, [input.state, input.injurySlug, scenarios.expected.total])

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
    if (res.success) setSubmitted(true)
    else setFormError('Something went wrong. Please try again.')
  }

  const inputCls = 'w-full px-3 py-[10px] border border-[#e5e7eb] rounded-lg text-[13px] text-[#111827] bg-white placeholder:text-[#9ca3af] focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]/10'

  return (
    <main className="min-h-screen bg-[#f9fafb] py-10">
      <div className="max-w-2xl mx-auto px-4">

        {/* ── PHASE 1: Always visible ─────────────────────────────────────── */}

        {/* Urgency flags */}
        {urgencyFlags.length > 0 && (
          <div className="mb-5 space-y-2">
            {urgencyFlags.map((flag, i) => (
              <div key={i} className="border-l-[3px] border-[#dc2626] bg-red-50 px-4 py-3 rounded-r-lg">
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
        <div className="text-center py-8 bg-white rounded-[12px] border border-[#e5e7eb] mb-4">
          <p className="text-[11px] text-[#9ca3af] uppercase tracking-[0.08em] mb-2">Estimated compensation range</p>
          <p
            className="font-bold text-[#059669] mb-1"
            style={{ fontSize: 'clamp(28px,6vw,48px)', letterSpacing: '-1px' }}
          >
            {formatUSD(scenarios.conservative.total)} – {formatUSD(scenarios.bestCase.total)}
          </p>
          <p className="text-[12px] text-[#9ca3af]">
            Based on {stateData?.name ?? 'state'} workers&apos; comp law · {new Date().getFullYear()}
          </p>
        </div>

        {/* Three scenarios */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] p-4">
            <p className="text-[11px] text-[#9ca3af] mb-1">Conservative</p>
            <p className="text-[18px] font-semibold text-[#111827]">{formatUSD(scenarios.conservative.total)}</p>
            <p className="text-[11px] text-[#9ca3af] mt-1 leading-tight">{scenarios.conservative.description}</p>
          </div>
          <div className="border-2 border-[#059669] rounded-[12px] p-4 relative">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-[#ecfdf5] text-[#065f46] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              Most likely
            </span>
            <p className="text-[11px] text-[#9ca3af] mb-1">Expected</p>
            <p className="text-[22px] font-bold text-[#059669]">{formatUSD(scenarios.expected.total)}</p>
            <p className="text-[11px] text-[#6b7280] mt-1 leading-tight">{scenarios.expected.description}</p>
          </div>
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] p-4">
            <p className="text-[11px] text-[#9ca3af] mb-1">Best case</p>
            <p className="text-[18px] font-semibold text-[#111827]">{formatUSD(scenarios.bestCase.total)}</p>
            <p className="text-[11px] text-[#9ca3af] mt-1 leading-tight">{scenarios.bestCase.description}</p>
          </div>
        </div>

        {/* Social proof + call buttons */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 justify-center py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <p className="text-[12px] text-[#6b7280]">
              <span className="font-medium text-[#111827]">{todayCount} workers</span> in {stateData?.name ?? 'your state'} used this calculator today
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+18005550199"
              onClick={handleCallClick}
              className="flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#1f2937] text-white rounded-lg py-3 text-[13px] font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 010 2.88 2 2 0 012 .7h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.55a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call now — free
            </a>
            <button
              type="button"
              onClick={scrollToForm}
              className="flex items-center justify-center gap-1 bg-[#059669] hover:bg-[#047857] text-white rounded-lg py-3 text-[13px] font-medium transition-colors"
            >
              Get written report →
            </button>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-[#f3f4f6]">
            <p className="text-[14px] font-semibold text-[#111827]">How this is calculated</p>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[#374151]">Temporary Total Disability (TTD)</span>
              <span className="text-sm font-semibold text-[#111827]">{formatUSD(breakdown.ttd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[#374151]">Permanent Partial Disability (PPD)</span>
              <span className="text-sm font-semibold text-[#111827]">{formatUSD(breakdown.ppd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[#374151]">Medical costs (estimated)</span>
              <span className="text-sm font-semibold text-[#111827]">~{formatUSD(breakdown.medicalEstimate)}</span>
            </div>
            {breakdown.isEstimatedRating && (
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-[#9ca3af]">Impairment rating used</span>
                <span className="text-sm text-[#9ca3af]">~{breakdown.impairmentRatingUsed}% (estimated)</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center px-5 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
            <span className="text-sm font-semibold text-[#111827]">Expected total</span>
            <span className="text-sm font-bold text-[#059669]">{formatUSD(scenarios.expected.total)}</span>
          </div>
        </div>

        {/* Case strength */}
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 mb-4">
          <p className="text-[14px] font-semibold text-[#111827] mb-3">Your case strength</p>
          <div className="h-2 bg-[#e5e7eb] rounded-full mb-2">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${caseStrengthScore}%`, background: strengthColor(caseStrength) }}
            />
          </div>
          <p className="text-[16px] font-semibold" style={{ color: strengthColor(caseStrength) }}>
            {caseStrength}
          </p>
          <p className="text-[11px] text-[#9ca3af] mt-1">
            Impairment rating · Severity · Claim status · Employment duration
          </p>
        </div>

        {/* Company offer comparison */}
        {companyOfferAnalysis.offerAmount !== null && companyOfferAnalysis.offerPct !== null && (
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 mb-4">
            <p className="text-[14px] font-semibold text-[#111827] mb-3">Their offer vs. your estimate</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                  <span>Their offer</span>
                  <span className="font-medium">{formatUSD(companyOfferAnalysis.offerAmount)}</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(companyOfferAnalysis.offerPct, 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                  <span>Expected settlement</span>
                  <span className="font-medium text-[#059669]">{formatUSD(scenarios.expected.total)}</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
            {companyOfferAnalysis.message && (
              <p className={`mt-3 text-[13px] leading-relaxed ${(companyOfferAnalysis.offerPct ?? 100) < 50 ? 'text-[#dc2626]' : 'text-[#6b7280]'}`}>
                {companyOfferAnalysis.message}
              </p>
            )}
          </div>
        )}

        {/* Why these numbers accordion */}
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden mb-4">
          <button
            type="button"
            onClick={() => setWhyOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[14px] font-semibold text-[#111827]">Why these numbers?</span>
            <span className="text-[#9ca3af] text-lg leading-none">{whyOpen ? '↑' : '↓'}</span>
          </button>
          {whyOpen && (
            <div className="px-5 pb-5 space-y-3 border-t border-[#f3f4f6] pt-4">
              <p className="text-[13px] text-[#374151] leading-relaxed">{whyThisNumber.ttdExplanation}</p>
              <p className="text-[13px] text-[#374151] leading-relaxed">{whyThisNumber.ppdExplanation}</p>
              <p className="text-[13px] text-[#374151] leading-relaxed">{whyThisNumber.rangeExplanation}</p>
              <div>
                <p className="text-[12px] font-semibold text-[#111827] mb-2">Key factors affecting your estimate:</p>
                <ul className="space-y-1">
                  {whyThisNumber.keyFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-[#6b7280]">
                      <span className="text-[#059669] mt-0.5 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed pt-1">
                This is an estimate based on {stateData?.name ?? 'state'} law and similar cases. Actual settlement
                depends on case-specific factors only an attorney can assess.
              </p>
            </div>
          )}
        </div>

        {/* Statute of limitations */}
        <div className={`rounded-lg px-4 py-3 mb-6 ${filingDeadline.urgency === 'high' ? 'bg-red-50' : 'bg-[#f9fafb]'}`}>
          <p className={`text-[13px] ${filingDeadline.urgency === 'high' ? 'text-[#dc2626] font-semibold' : 'text-[#6b7280]'}`}>
            ⏰ Filing deadline in {stateData?.name ?? 'your state'}: {filingDeadline.sol}
          </p>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#e5e7eb]" />
          <span className="text-[11px] text-[#9ca3af] whitespace-nowrap">Your full case report is ready</span>
          <div className="flex-1 h-px bg-[#e5e7eb]" />
        </div>

        {/* ── PHASE 2: Blur Gate / Unlocked ──────────────────────────────── */}
        {!submitted ? (

          <div id="lead-form" className="relative rounded-[12px] overflow-hidden mb-6">

            {/* Blurred content — background layer */}
            <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5">
              {([
                {
                  title: `3 attorneys in ${stateData?.name ?? 'your state'} who handle ${injuryData?.name ?? 'your injury type'} cases`,
                  sub: 'Direct contact info · Free consultation · No obligation',
                },
                {
                  title: `Your exact filing deadline — ${stateData?.name ?? 'your state'}`,
                  sub: `${filingDeadline.sol} from date of injury · Do not miss this date`,
                },
                {
                  title: 'What to say in your first attorney call',
                  sub: 'And what NOT to say · Red flags in settlement offers',
                },
                {
                  title: `Step-by-step ${stateData?.name ?? 'state'} claim guide`,
                  sub: 'Filing, deadlines, and appeal rights',
                },
              ] as { title: string; sub: string }[]).map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-[10px] py-3 ${i < 3 ? 'border-b border-[#f3f4f6]' : ''} ${i >= 2 ? 'hidden sm:flex' : ''}`}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="shrink-0 mt-[2px] text-[#111827] opacity-25"
                  >
                    <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                  <div>
                    <p
                      className="text-[13px] font-medium text-[#111827] select-none pointer-events-none"
                      style={{ filter: 'blur(4px)' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-[11px] text-[#6b7280] select-none pointer-events-none mt-[3px]"
                      style={{ filter: 'blur(3px)' }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient overlay + Form card */}
            <div
              className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-end px-5 pb-6 h-[85%] sm:h-[78%]"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.93) 30%, rgba(255,255,255,0.99) 60%, rgba(255,255,255,1) 100%)',
              }}
            >
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] w-full text-center p-4 sm:p-6">

                {/* Badge */}
                <div className="inline-flex items-center gap-[6px] bg-[#f3f4f6] rounded-[20px] px-3 py-1 mb-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#9ca3af]" />
                  <span className="text-[11px] text-[#6b7280]">Free case report — unlock instantly</span>
                </div>

                <h3 className="text-[15px] font-semibold text-[#111827] mb-1">Get your full case report</h3>
                <p className="text-[12px] text-[#6b7280] leading-[1.5] mb-4">
                  Attorney contacts, your exact deadline, and a step-by-step claim guide.
                </p>

                {/* Unlock items */}
                <div className="flex flex-col gap-[6px] mb-4 text-left">
                  {[
                    `Attorneys in ${stateData?.name ?? 'your state'} for ${injuryData?.name ?? 'your injury'}`,
                    'Your exact filing deadline',
                    'First call guide + settlement red flags',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-[14px] h-[14px] rounded-full bg-[#d1fae5] flex items-center justify-center shrink-0 text-[8px] text-[#065f46]">✓</div>
                      <span className="text-[12px] text-[#374151]">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 mb-[10px]">
                  <div>
                    <input
                      type="text" required value={name}
                      onChange={e => { const v = sanitizeName(e.target.value); setName(v); if (nameError) setNameError('') }}
                      onBlur={() => { if (name && !validateName(name)) setNameError('Enter your full name (letters only)') }}
                      placeholder="Your full name"
                      className={`${inputCls} ${nameError ? 'border-[#dc2626]' : ''}`}
                    />
                    {nameError && <p className="text-[#dc2626] text-[10px] text-left mt-1">{nameError}</p>}
                  </div>
                  <div>
                    <input
                      type="email" required value={email}
                      onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                      onBlur={() => { if (email && !validateEmail(email)) setEmailError('Enter a valid email address') }}
                      placeholder="Email address"
                      className={`${inputCls} ${emailError ? 'border-[#dc2626]' : ''}`}
                    />
                    {emailError && <p className="text-[#dc2626] text-[10px] text-left mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={formatPhone(phone)}
                      onChange={e => { const v = sanitizePhone(e.target.value); setPhone(v); if (phoneError) setPhoneError('') }}
                      onBlur={() => { if (phone && !validatePhone(phone)) setPhoneError('Enter a 10-digit phone number') }}
                      placeholder="Phone number"
                      className={`${inputCls} ${phoneError ? 'border-[#dc2626]' : ''}`}
                    />
                    {phoneError && <p className="text-[#dc2626] text-[10px] text-left mt-1">{phoneError}</p>}
                  </div>
                  <div className="flex gap-2 items-start text-left mt-1">
                    <input
                      type="checkbox" id="gate-consent" checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-[2px] shrink-0 accent-[#059669]"
                    />
                    <label htmlFor="gate-consent" className="text-[10px] text-[#9ca3af] leading-[1.5] cursor-pointer">
                      By submitting, I agree to be contacted by a licensed workers&apos; comp attorney regarding my
                      claim. WorkerRight may receive a referral fee. This is free to me.
                    </label>
                  </div>
                  {formError && <p className="text-[#dc2626] text-xs text-left">{formError}</p>}
                  <button
                    type="submit"
                    disabled={!isFormValid(name, phone, email, consent) || submitting}
                    className="w-full bg-[#059669] hover:bg-[#047857] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] text-white border-none rounded-lg py-[13px] text-[14px] font-medium cursor-pointer transition-colors mt-1"
                  >
                    {submitting ? 'Submitting…' : 'Get my free case report →'}
                  </button>
                </form>

                <p className="text-[11px] text-[#9ca3af] text-center">
                  No spam · One contact from a licensed attorney · That&apos;s it
                </p>

              </div>
            </div>
          </div>

        ) : (

          <>
            {/* Thank you */}
            <div className="border border-[#e5e7eb] rounded-[12px] p-8 text-center mb-5">
              <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#d1fae5" />
                <path d="M14 24l7 7 13-13" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-[20px] font-semibold text-[#111827] mb-2">Your case report is ready</h3>
              <p className="text-[14px] text-[#6b7280] leading-relaxed">
                A workers&apos; comp specialist in {stateData?.name ?? 'your state'} will contact you
                within 24 hours. No obligation.
              </p>
            </div>

            {/* Unlocked content */}
            <div className="space-y-4 mb-6">

              {/* Attorney placeholder */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5">
                <p className="text-[13px] font-semibold text-[#111827] mb-3">
                  Workers&apos; comp attorneys in {stateData?.name ?? 'your state'} who handle{' '}
                  {injuryData?.name ?? 'your injury type'} cases:
                </p>
                <div className="bg-[#f9fafb] rounded-lg p-[14px]">
                  <p className="text-[13px] font-medium text-[#111827]">A specialist will contact you</p>
                  <p className="text-[11px] text-[#6b7280] mt-0.5">
                    Licensed workers&apos; comp attorney · {stateData?.name ?? 'your state'}
                  </p>
                </div>
              </div>

              {/* Filing deadline */}
              <div
                className="rounded-lg p-[14px]"
                style={{ background: input.claimStatus === 'not-filed' ? '#fef2f2' : '#f0fdf4' }}
              >
                <p className="text-[13px] font-medium text-[#111827]">
                  Based on {stateData?.name ?? 'state'} law
                  {stateData?.statute ? ` (${stateData.statute})` : ''}, you have{' '}
                  <span style={{ color: input.claimStatus === 'not-filed' ? '#dc2626' : '#059669' }}>
                    {filingDeadline.sol}
                  </span>{' '}
                  from the date of injury.
                </p>
              </div>

              {/* First call guide */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5">
                <p className="text-[13px] font-semibold text-[#111827] mb-3">Your first attorney call</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold text-[#065f46] mb-2">DO</p>
                    <div className="space-y-2">
                      {['Report your exact injury date', 'Describe all symptoms', 'Ask about the timeline'].map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[12px] text-[#374151]">
                          <span className="text-[#065f46] shrink-0 mt-0.5">✓</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#991b1b] mb-2">DON&apos;T</p>
                    <div className="space-y-2">
                      {['Sign anything without review', 'Give recorded statements', 'Accept first offer immediately'].map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[12px] text-[#374151]">
                          <span className="text-[#dc2626] shrink-0 mt-0.5">✕</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Red flags */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5">
                <p className="text-[13px] font-semibold text-[#111827] mb-3">Red flags in settlement offers</p>
                <div className="space-y-2">
                  {[
                    '"Full and final" release language',
                    'Pressure to settle before MMI',
                    'Medical-only settlement (no wage loss)',
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-[#374151]">
                      <span className="text-[#dc2626] shrink-0 mt-0.5">⚠</span>{f}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>

        )}

        {/* Timeline — always visible */}
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 mb-5">
          <p className="text-[14px] font-semibold text-[#111827] mb-5">What the claims process typically looks like</p>
          <div className="relative">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-[#e5e7eb]" />
            <div className="space-y-5">
              {[
                { time: 'Week 1',     title: 'Free attorney consultation', desc: 'Review your claim, verify coverage, assess case strength' },
                { time: 'Weeks 2–4',  title: 'Claim evaluation & filing',  desc: 'Attorney files or responds to insurer' },
                { time: 'Month 2–3',  title: 'Medical evaluation',          desc: 'Independent medical exam if needed, impairment rating assessed' },
                { time: 'Month 3–6',  title: 'Negotiation begins',          desc: "Attorney negotiates with insurer or employer's counsel" },
                { time: 'Month 6–18', title: 'Settlement reached',          desc: `Most cases in ${stateData?.name ?? 'your state'} settle within this window. Complex cases may take longer.` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 pl-7 relative">
                  <div className="absolute left-0 w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#059669] font-medium">{item.time}</p>
                    <p className="text-[13px] font-semibold text-[#111827]">{item.title}</p>
                    <p className="text-[12px] text-[#6b7280] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-4 py-4 mb-6">
          <p className="text-[11px] text-[#9ca3af] leading-[1.7]">
            This calculator provides estimates for informational purposes only and does not constitute legal advice.
            Results are based on state law formulas and statistical averages — actual compensation depends on the
            specific facts of your case. WorkerRight is not a law firm. Attorney advertising. Prior results do not
            guarantee similar outcomes. Always consult a licensed workers&apos; compensation attorney in your state.
          </p>
        </div>

        <div className="text-center mt-2">
          <Link href="/calculator" className="text-[#9ca3af] hover:text-[#6b7280] text-xs transition-colors">
            ← Recalculate
          </Link>
        </div>

      </div>

      {/* Mobile sticky bar */}
      {showSticky && !submitted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#e5e7eb] px-4 py-3 flex gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <a
            href="tel:+18005550199"
            onClick={handleCallClick}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#111827] text-white rounded-lg py-3 text-[13px] font-medium"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 010 2.88 2 2 0 012 .7h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.55a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call free
          </a>
          <button
            type="button"
            onClick={scrollToForm}
            className="flex-1 bg-[#059669] text-white rounded-lg py-3 text-[13px] font-medium"
          >
            Get report →
          </button>
        </div>
      )}

    </main>
  )
}

// ── CatastrophicGate ──────────────────────────────────────────────────────────

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
    const res = await saveLead({
      name, email, phone: phone || undefined,
      country: 'us',
      state: stateName.toLowerCase().replace(/\s+/g, '-'),
      consent,
    })
    setSubmitting(false)
    if (res.success) setSubmitted(true)
    else setErr('Something went wrong. Please try again.')
  }

  const inputCls = 'w-full border border-[#e5e7eb] rounded-lg px-4 py-3 text-[#111827] text-sm placeholder:text-[#9ca3af] focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]/10'

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f9fafb] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#d1fae5" />
            <path d="M14 24l7 7 13-13" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-xl font-semibold text-[#111827] mb-2">Request received</h2>
          <p className="text-sm text-[#6b7280]">A catastrophic injury specialist in {stateName} will contact you within 24 hours.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] py-16">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-[12px] p-7 mb-6">
          <h2 className="text-[16px] font-semibold text-[#111827] mb-3">Your case requires specialist review</h2>
          <p className="text-sm text-[#374151] leading-relaxed mb-3">
            Catastrophic injuries involve complex long-term calculations that standard formulas significantly underestimate.
            These cases often involve lifetime benefits, vocational rehabilitation, and additional legal claims beyond
            workers&apos; comp.
          </p>
          <p className="text-sm text-[#374151] leading-relaxed">
            We won&apos;t give you a number that could cost you hundreds of thousands of dollars. Instead, connect with
            a specialist attorney who handles catastrophic injury cases.
          </p>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-6">
          <h3 className="text-base font-semibold text-[#111827] mb-4">Get specialist review — free</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text"  required value={name}  onChange={e => setName(e.target.value)}  placeholder="Your full name"   className={inputCls} />
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"   className={inputCls} />
            <input type="tel"            value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" className={inputCls} />
            <div className="flex items-start gap-3">
              <input
                type="checkbox" id="cat-consent" checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#059669]"
              />
              <label htmlFor="cat-consent" className="text-[11px] text-[#9ca3af] leading-relaxed cursor-pointer">
                By submitting, I agree to be contacted by a licensed workers&apos; comp attorney regarding my claim.
                WorkerRight may receive a referral fee. This is free to me.
              </label>
            </div>
            {err && <p className="text-[#dc2626] text-xs">{err}</p>}
            <button
              type="submit" disabled={submitting}
              className="w-full bg-[#059669] hover:bg-[#047857] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] text-white font-medium py-3.5 rounded-lg text-sm transition-colors"
            >
              {submitting ? 'Submitting…' : 'Get specialist review — free →'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/calculator" className="text-[#9ca3af] hover:text-[#6b7280] text-xs">← Back to calculator</Link>
        </div>
      </div>
    </main>
  )
}
