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

  const handleSubmit = useCallback(async () => {
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
  }, [name, email, phone, consent, input, breakdown, scenarios, caseStrength, caseStrengthScore])

  const handleCallClick = useCallback(async () => {
    await trackCallClick({
      state: input.state,
      injury: input.injurySlug,
      estimatedTotal: scenarios.expected.total,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }, [input.state, input.injurySlug, scenarios.expected.total])

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

        {/* Social proof counter */}
        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 animate-pulse" />
          <span className="text-xs text-emerald-800">
            <strong>{todayCount} workers</strong>{' '}in {stateData?.name ?? 'your state'} used this calculator today
          </span>
        </div>

        {/* Call + form buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <a
            href="tel:+18005550199"
            onClick={handleCallClick}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg text-sm font-semibold no-underline transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 15a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call now — free
            </span>
            <span className="text-xs opacity-75 font-normal">Mon–Fri 8am–8pm · No obligation</span>
          </a>
          <span className="hidden sm:flex items-center text-xs text-gray-400">or</span>
          <span className="flex sm:hidden items-center justify-center text-xs text-gray-400">or</span>
          <button
            type="button"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-5 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors"
          >
            Get written case report →
          </button>
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
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 whitespace-nowrap">Your full case report is ready</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── PHASE 2: Blur Gate / Unlocked ──────────────────────────────── */}
        {!submitted ? (

          <div id="lead-form" className="relative rounded-xl overflow-hidden my-4">

            {/* Layer 1: blurred background content */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 pb-32">
              {([
                {
                  title: `3 attorneys in ${stateData?.name ?? 'your state'} who handle ${injuryData?.name ?? 'your injury type'} cases`,
                  sub: 'Direct contact · Free consultation · No obligation',
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
                  className={`flex items-start gap-3 py-3 ${i < 3 ? 'border-b border-gray-100' : ''}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-20 flex-shrink-0 mt-0.5">
                    <rect x="3" y="7" width="10" height="8" rx="2" stroke="#111827" strokeWidth="1.5" />
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="#111827" strokeWidth="1.5" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5 select-none pointer-events-none" style={{ filter: 'blur(4px)' }}>
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500 select-none pointer-events-none" style={{ filter: 'blur(3px)' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Layer 2: gradient overlay */}
            <div
              className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-end px-3 pb-4 sm:px-4 sm:pb-5"
              style={{
                height: '85%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.93) 22%, rgba(255,255,255,0.98) 45%, rgba(255,255,255,1) 65%)',
              }}
            >
              {/* Layer 3: form card */}
              <div
                className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5"
                style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}
              >
                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                    Free case report — unlock instantly
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center mb-1">
                  Get your full case report
                </h3>
                <p className="text-xs text-gray-500 text-center leading-relaxed mb-3">
                  Attorney contacts, your exact deadline, and a step-by-step claim guide.
                </p>

                {/* Unlock items */}
                <div className="flex flex-col gap-1.5 mb-4">
                  {[
                    `Attorneys in ${stateData?.name ?? 'your state'} for ${injuryData?.name ?? 'your injury'}`,
                    'Your exact filing deadline',
                    'First call guide + red flags',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <div
                        className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-800 font-semibold"
                        style={{ fontSize: '9px' }}
                      >✓</div>
                      {text}
                    </div>
                  ))}
                </div>

                {/* Form fields */}
                <div className="flex flex-col gap-2 mb-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Full name (letters only)"
                      value={name}
                      onChange={e => { setName(sanitizeName(e.target.value)); if (nameError) setNameError('') }}
                      onBlur={() => { if (name && !validateName(name)) setNameError('Please enter your name in English letters only') }}
                      onFocus={() => setNameError('')}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 ${nameError ? 'border border-red-400' : 'border border-gray-200'}`}
                    />
                    {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                      onBlur={() => { if (email && !validateEmail(email)) setEmailError('Please enter a valid email address') }}
                      onFocus={() => setEmailError('')}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 ${emailError ? 'border border-red-400' : 'border border-gray-200'}`}
                    />
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="(555) 555-5555"
                      value={formatPhone(phone)}
                      onChange={e => { setPhone(sanitizePhone(e.target.value)); if (phoneError) setPhoneError('') }}
                      onBlur={() => { if (phone && !validatePhone(phone)) setPhoneError('Please enter a valid 10-digit US phone number') }}
                      onFocus={() => setPhoneError('')}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 ${phoneError ? 'border border-red-400' : 'border border-gray-200'}`}
                    />
                    {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  </div>
                </div>

                {/* Consent */}
                <label className="flex gap-2 items-start mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-emerald-600"
                  />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    By submitting, I agree to be contacted by a licensed workers&apos; comp attorney
                    regarding my claim. WorkerRight may receive a referral fee. This is free to me.
                  </span>
                </label>

                {formError && <p className="text-xs text-red-500 mb-2">{formError}</p>}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid(name, phone, email, consent) || submitting}
                  className={`w-full py-3 rounded-lg text-sm font-medium text-white border-none transition-all ${isFormValid(name, phone, email, consent) && !submitting ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-60'}`}
                >
                  {submitting ? 'Submitting...' : 'Get my free case report →'}
                </button>

                <p className="text-xs text-gray-400 text-center mt-2">
                  No spam · One contact from a licensed attorney · That&apos;s it
                </p>
              </div>
            </div>
          </div>

        ) : (

          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 text-center my-4">
            {/* Check icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your case report is ready</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              A workers&apos; comp specialist in {stateData?.name ?? 'your state'} will contact you
              within 24 hours. No obligation.
            </p>
            {/* Unlocked items */}
            <div className="text-left space-y-3">
              {[
                {
                  icon: '📋',
                  title: 'Your filing deadline',
                  body: `Based on ${stateData?.name ?? 'state'} law${stateData?.statute ? ` (${stateData.statute})` : ''}, you have ${filingDeadline.sol} from the date of injury.`,
                },
                {
                  icon: '📞',
                  title: 'First call guide',
                  body: "DO: Report exact injury date. DON'T: Sign anything without attorney review.",
                },
                {
                  icon: '⚠️',
                  title: 'Settlement red flags',
                  body: '"Full and final" release language. Pressure before MMI. Medical-only offers.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-0.5">{item.title}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 sm:hidden"
          style={{ boxShadow: '0 -4px 16px rgba(0,0,0,0.08)' }}
        >
          <a
            href="tel:+18005550199"
            onClick={handleCallClick}
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg text-sm font-semibold no-underline transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 15a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call now — free consultation
          </a>
          <p className="text-xs text-gray-400 text-center mt-1.5">
            Free · No obligation · Mon–Fri 8am–8pm
          </p>
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
