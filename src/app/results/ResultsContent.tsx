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

// ── Main component ────────────────────────────────────────────────────────────

export default function ResultsContent() {
  const p = useSearchParams()
  const [whyOpen,         setWhyOpen]         = useState(false)
  const [unlocked,        setUnlocked]        = useState(false)
  const [name,            setName]            = useState('')
  const [email,           setEmail]           = useState('')
  const [phone,           setPhone]           = useState('')
  const [consent,         setConsent]         = useState(false)
  const [loading,         setLoading]         = useState(false)
  const [error,           setError]           = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [showSticky,      setShowSticky]      = useState(false)
  const [socialProofCount] = useState(() => Math.floor(Math.random() * 30) + 12)

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
          <p className="text-[var(--ink-3)] mb-4">No results found.</p>
          <Link href="/calculator" className="text-[var(--em)] hover:underline text-sm">Go back to calculator</Link>
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
    setSubmitAttempted(true)
    if (!isFormValid(name, phone, email, consent)) return
    setLoading(true)
    setError(null)

    const res = await fetch('/api/save-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.replace(/\D/g, ''),
        country: 'us',
        consent: true,
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
        sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      }),
    })
    const json = await res.json()
    if (!json.success) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setUnlocked(true)
    setLoading(false)
  }, [name, email, phone, consent, input, breakdown, scenarios, caseStrength, caseStrengthScore, stateData, injuryData, filingDeadline])

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
              <div key={i} className="border-l-[3px] border-[#dc2626] bg-[rgba(220,38,38,0.08)] px-4 py-3 rounded-r-lg">
                <p className="text-[13px] text-[var(--red-dead)]">⚠ {flag}</p>
              </div>
            ))}
          </div>
        )}

        {/* Coverage note */}
        {coverageNote && (
          <div className="mb-4 border border-[var(--border)] bg-[#fafaf9] rounded-lg px-4 py-3">
            <p className="text-xs text-[var(--ink-2)]">{coverageNote}</p>
          </div>
        )}

        {/* Estimated range */}
        <div className="text-center py-8 bg-white rounded-[12px] border border-[var(--border)] mb-4">
          <p className="text-[11px] text-[var(--ink-4)] uppercase tracking-[0.08em] mb-2">Estimated compensation range</p>
          <p
            className="font-bold text-[var(--em)] mb-1 text-[clamp(28px,6vw,48px)] tracking-[-1px]"
          >
            {formatUSD(scenarios.conservative.total)} – {formatUSD(scenarios.bestCase.total)}
          </p>
          <p className="text-[12px] text-[var(--ink-4)]">
            Based on {stateData?.name ?? 'state'} workers&apos; comp law · {new Date().getFullYear()}
          </p>
        </div>

        {/* Three scenarios */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#f9fafb] border border-[var(--border)] rounded-[12px] p-4">
            <p className="text-[11px] text-[var(--ink-4)] mb-1">Conservative</p>
            <p className="text-[18px] font-semibold text-[var(--ink)]">{formatUSD(scenarios.conservative.total)}</p>
            <p className="text-[11px] text-[var(--ink-4)] mt-1 leading-tight">{scenarios.conservative.description}</p>
          </div>
          <div className="border-2 border-[var(--em)] rounded-[12px] p-4 relative">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-[var(--em-light)] text-[var(--em-dark)] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              Most likely
            </span>
            <p className="text-[11px] text-[var(--ink-4)] mb-1">Expected</p>
            <p className="text-[22px] font-bold text-[var(--em)]">{formatUSD(scenarios.expected.total)}</p>
            <p className="text-[11px] text-[var(--ink-3)] mt-1 leading-tight">{scenarios.expected.description}</p>
          </div>
          <div className="bg-[#f9fafb] border border-[var(--border)] rounded-[12px] p-4">
            <p className="text-[11px] text-[var(--ink-4)] mb-1">Best case</p>
            <p className="text-[18px] font-semibold text-[var(--ink)]">{formatUSD(scenarios.bestCase.total)}</p>
            <p className="text-[11px] text-[var(--ink-4)] mt-1 leading-tight">{scenarios.bestCase.description}</p>
          </div>
        </div>

        {/* Social proof counter */}
        <div className="flex items-center gap-2 bg-[var(--em-light)] rounded-lg px-3 py-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--em)] flex-shrink-0 animate-pulse" />
          <span className="text-xs text-[var(--em-dark)]">
            <strong>{todayCount} workers</strong>{' '}in {stateData?.name ?? 'your state'} used this calculator today
          </span>
        </div>

        {/* Call + form buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <a
            href="tel:+18005550199"
            onClick={handleCallClick}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-[var(--em)] hover:bg-[var(--em)] text-white px-5 py-3 rounded-lg text-sm font-semibold no-underline transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 15a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call now — free
            </span>
            <span className="text-xs opacity-75 font-normal">Mon–Fri 8am–8pm · No obligation</span>
          </a>
          <span className="hidden sm:flex items-center text-xs text-[var(--ink-4)]">or</span>
          <span className="flex sm:hidden items-center justify-center text-xs text-[var(--ink-4)]">or</span>
          <button
            type="button"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 bg-white border border-[var(--em)] text-[var(--em-dark)] hover:bg-[var(--em-light)] px-5 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors"
          >
            Get written case report →
          </button>
        </div>

        {/* Breakdown */}
        <div className="bg-white border border-[var(--border)] rounded-[12px] overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-[#f3f4f6]">
            <p className="text-[14px] font-semibold text-[var(--ink)]">How this is calculated</p>
          </div>
          <div className="divide-y divide-[#f3f4f6]">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[var(--ink-2)]">Temporary Total Disability (TTD)</span>
              <span className="text-sm font-semibold text-[var(--ink)]">{formatUSD(breakdown.ttd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[var(--ink-2)]">Permanent Partial Disability (PPD)</span>
              <span className="text-sm font-semibold text-[var(--ink)]">{formatUSD(breakdown.ppd)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-[var(--ink-2)]">Medical costs (estimated)</span>
              <span className="text-sm font-semibold text-[var(--ink)]">~{formatUSD(breakdown.medicalEstimate)}</span>
            </div>
            {breakdown.isEstimatedRating && (
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-[var(--ink-4)]">Impairment rating used</span>
                <span className="text-sm text-[var(--ink-4)]">~{breakdown.impairmentRatingUsed}% (estimated)</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center px-5 py-3 bg-[#f9fafb] border-t border-[var(--border)]">
            <span className="text-sm font-semibold text-[var(--ink)]">Expected total</span>
            <span className="text-sm font-bold text-[var(--em)]">{formatUSD(scenarios.expected.total)}</span>
          </div>
        </div>

        {/* Case strength */}
        <div className="bg-white border border-[var(--border)] rounded-[12px] p-5 mb-4">
          <p className="text-[14px] font-semibold text-[var(--ink)] mb-3">Your case strength</p>
          <div className="h-2 bg-[var(--border)] rounded-full mb-2">
            <div
              className="h-full rounded-full transition-all duration-1000 bg-[var(--em)]"
              style={{ width: `${caseStrengthScore}%` }}
            />
          </div>
          <p className="text-[16px] font-semibold text-[var(--em-dark)]">
            {caseStrength}
          </p>
          <p className="text-[11px] text-[var(--ink-4)] mt-1">
            Impairment rating · Severity · Claim status · Employment duration
          </p>
        </div>

        {/* Company offer comparison */}
        {companyOfferAnalysis.offerAmount !== null && companyOfferAnalysis.offerPct !== null && (
          <div className="bg-white border border-[var(--border)] rounded-[12px] p-5 mb-4">
            <p className="text-[14px] font-semibold text-[var(--ink)] mb-3">Their offer vs. your estimate</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-[var(--ink-4)] mb-1">
                  <span>Their offer</span>
                  <span className="font-medium">{formatUSD(companyOfferAnalysis.offerAmount)}</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full">
                  <div className="h-full bg-[var(--em)] rounded-full" style={{ width: `${Math.min(companyOfferAnalysis.offerPct, 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-[var(--ink-4)] mb-1">
                  <span>Expected settlement</span>
                  <span className="font-medium text-[var(--em)]">{formatUSD(scenarios.expected.total)}</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full">
                  <div className="h-full bg-[var(--em)] rounded-full w-full" />
                </div>
              </div>
            </div>
            {companyOfferAnalysis.message && (
              <p className={`mt-3 text-[13px] leading-relaxed ${(companyOfferAnalysis.offerPct ?? 100) < 50 ? 'text-[var(--red-dead)]' : 'text-[var(--ink-3)]'}`}>
                {companyOfferAnalysis.message}
              </p>
            )}
          </div>
        )}

        {/* Why these numbers accordion */}
        <div className="bg-white border border-[var(--border)] rounded-[12px] overflow-hidden mb-4">
          <button
            type="button"
            onClick={() => setWhyOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[14px] font-semibold text-[var(--ink)]">Why these numbers?</span>
            <span className="text-[var(--ink-4)] text-lg leading-none">{whyOpen ? '↑' : '↓'}</span>
          </button>
          {whyOpen && (
            <div className="px-5 pb-5 space-y-3 border-t border-[#f3f4f6] pt-4">
              <p className="text-[13px] text-[var(--ink-2)] leading-relaxed">{whyThisNumber.ttdExplanation}</p>
              <p className="text-[13px] text-[var(--ink-2)] leading-relaxed">{whyThisNumber.ppdExplanation}</p>
              <p className="text-[13px] text-[var(--ink-2)] leading-relaxed">{whyThisNumber.rangeExplanation}</p>
              <div>
                <p className="text-[12px] font-semibold text-[var(--ink)] mb-2">Key factors affecting your estimate:</p>
                <ul className="space-y-1">
                  {whyThisNumber.keyFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-[var(--ink-3)]">
                      <span className="text-[var(--em)] mt-0.5 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-[var(--ink-4)] leading-relaxed pt-1">
                This is an estimate based on {stateData?.name ?? 'state'} law and similar cases. Actual settlement
                depends on case-specific factors only an attorney can assess.
              </p>
            </div>
          )}
        </div>

        {/* Statute of limitations */}
        <div className={`rounded-lg px-4 py-3 mb-6 border ${filingDeadline.urgency === 'high' ? 'bg-[rgba(220,38,38,0.12)] border-[rgba(220,38,38,0.3)]' : 'bg-[#f9fafb] border-[var(--border)]'}`}>
          <p className={`text-[13px] ${filingDeadline.urgency === 'high' ? 'text-[var(--red-dead)] font-semibold' : 'text-[var(--ink-3)]'}`}>
            ⏰ Filing deadline in {stateData?.name ?? 'your state'}: {filingDeadline.sol}
          </p>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--ink-4)] whitespace-nowrap">Your full case report is ready</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* ── PHASE 2: Blur Gate / Unlocked ──────────────────────────────── */}
        <div id="lead-form" className="relative bg-white rounded-2xl overflow-hidden mt-2 mb-6">

          {/* Blurred preview skeleton — absolute background, locked state only */}
          <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-opacity duration-700 ${
            unlocked ? 'opacity-0' : 'opacity-100 blur-[6px]'
          }`}>
            <div className="p-6 space-y-4">
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-5">
                <p className="text-white/60 text-sm font-medium mb-3">
                  Attorneys in {stateData?.name ?? 'your state'} for {injuryData?.name ?? 'your injury'}
                </p>
                {[1,2,3].map(i => (
                  <div key={i} className="py-3 border-b border-white/5 last:border-0">
                    <p className="text-[var(--em-dark)]/60 text-sm">★★★★★</p>
                    <p className="text-white/70 text-sm font-medium mt-0.5">{stateData?.name ?? 'State'} Workers&apos; Comp Specialists</p>
                    <p className="text-[var(--ink-3)] text-xs mt-0.5">Free consultation · No upfront fees</p>
                  </div>
                ))}
              </div>
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-5">
                <p className="text-[rgba(220,38,38,0.5)] text-sm font-medium mb-2">⚠ Your Exact Filing Deadline</p>
                <p className="text-white/70 text-xl font-bold">{filingDeadline.sol} from your date of injury</p>
              </div>
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Before Your Attorney Call — Be Ready</p>
                {['Date, time, and location of your injury','Names of any witnesses','Medical records so far','Written employer communications'].map((t, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-[var(--em-dark)]/60 flex-shrink-0">✓</span>
                    <span className="text-[var(--ink-4)]/60 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Your {stateData?.name ?? 'State'} Claim — Step by Step</p>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                    <div className="w-7 h-7 rounded-full bg-[var(--em)]/20 text-[var(--em-dark)]/60 text-sm font-bold flex items-center justify-center flex-shrink-0">{i}</div>
                    <div className="h-3 bg-white/5 rounded flex-1 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradient overlay — fades out when unlocked */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 bg-[linear-gradient(to_bottom,transparent_0%,#0f1623_30%)] ${
              unlocked ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Form card / Unlocked cards — always in normal flow (determines container height) */}
          <div className="relative z-20 max-w-lg mx-auto px-4 pt-6 pb-16">

            {!unlocked ? (

              /* ── FORM CARD ──────────────────────────────────────────── */
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-5 md:p-8 shadow-2xl">

                {/* ① Social proof badge */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--em)] flex-shrink-0 animate-pulse" />
                  <span className="text-[var(--em-dark)] text-sm">
                    {socialProofCount} workers in {stateData?.name ?? 'your state'} got their report today
                  </span>
                </div>

                {/* ② Urgency bar */}
                <div className="bg-[rgba(220,38,38,0.12)] border border-[rgba(220,38,38,0.3)] rounded-lg px-4 py-2.5 mt-3">
                  <p className="text-[var(--red-dead)] text-sm font-medium">
                    ⚠ {stateData?.name ?? 'State'} filing deadline: {filingDeadline.sol} from your injury date
                  </p>
                </div>

                {/* ③ Title block */}
                <div className="mt-4">
                  <h3 className="text-[var(--ink)] font-semibold text-xl md:text-2xl">
                    Unlock Your Free Settlement Report
                  </h3>
                  <p className="text-[var(--em-dark)] text-sm mt-1">Free · 30 seconds · No obligation</p>
                </div>

                {/* ④ Field group */}
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(sanitizeName(e.target.value))}
                        className="w-full bg-white border border-[var(--border)] rounded-lg px-4 py-3.5 text-[var(--ink)] text-base placeholder-[var(--ink-4)] focus:border-[var(--em)] focus:outline-none focus:ring-1 focus:ring-[var(--em)]/40 transition-colors duration-150"
                      />
                      {submitAttempted && sanitizeName(name).trim().length < 2 && (
                        <p className="text-[var(--red-dead)] text-xs mt-1">Please enter your full name</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={formatPhone(phone)}
                        onChange={e => setPhone(sanitizePhone(e.target.value))}
                        className="w-full bg-white border border-[var(--border)] rounded-lg px-4 py-3.5 text-[var(--ink)] text-base placeholder-[var(--ink-4)] focus:border-[var(--em)] focus:outline-none focus:ring-1 focus:ring-[var(--em)]/40 transition-colors duration-150"
                      />
                      {submitAttempted && !validatePhone(phone) && (
                        <p className="text-[var(--red-dead)] text-xs mt-1">Enter a valid 10-digit US phone number</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white border border-[var(--border)] rounded-lg px-4 py-3.5 text-[var(--ink)] text-base placeholder-[var(--ink-4)] focus:border-[var(--em)] focus:outline-none focus:ring-1 focus:ring-[var(--em)]/40 transition-colors duration-150"
                    />
                    {submitAttempted && !validateEmail(email) && (
                      <p className="text-[var(--red-dead)] text-xs mt-1">Enter a valid email address</p>
                    )}
                  </div>
                </div>

                {/* ⑤ Consent checkbox */}
                <div className="flex items-start gap-2.5 mt-4">
                  <input
                    type="checkbox"
                    id="blur-consent"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 accent-[var(--em)]${submitAttempted && !consent ? ' outline outline-1 outline-[#dc2626]' : ''}`}
                  />
                  <label htmlFor="blur-consent" className="text-[var(--ink-4)] text-xs leading-relaxed cursor-pointer">
                    I agree to be contacted by a licensed {stateData?.name ?? 'state'} workers&apos; comp attorney about my case. Not legal advice.{' '}
                    <Link href="/legal/terms" className="text-[var(--em-dark)] underline">Terms</Link>
                    {' · '}
                    <Link href="/legal/privacy" className="text-[var(--em-dark)] underline">Privacy</Link>
                  </label>
                </div>

                {/* DB error */}
                {error && <p className="text-[var(--red-dead)] text-sm mt-3">{error}</p>}

                {/* ⑥ Submit button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-base font-semibold mt-4 transition-colors duration-150 flex items-center justify-center gap-2 ${
                    loading || !isFormValid(name, phone, email, consent)
                      ? 'bg-gray-700 text-[var(--ink-3)] cursor-not-allowed opacity-60'
                      : 'bg-[var(--em)] hover:bg-[var(--em-light)]0 active:bg-[var(--em)] text-white cursor-pointer'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Unlocking...
                    </>
                  ) : 'Unlock My Free Report →'}
                </button>

                {/* ⑦ Friction-reduction text */}
                <p className="text-[var(--ink-3)] text-xs text-center mt-2">
                  No spam. No sales calls unless you request one.
                </p>

                {/* ⑧ What happens next */}
                <div className="border-t border-[var(--border)] mt-6 pt-6">
                  <p className="text-[var(--em-dark)] text-xs font-semibold uppercase tracking-widest mb-4">
                    WHAT HAPPENS NEXT?
                  </p>
                  {[
                    `We match you with a licensed workers' comp attorney in ${stateData?.name ?? 'your state'}`,
                    'They review your case details — confidentially, for free',
                    'You decide if you want to proceed. No pressure, no obligation.',
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                      <div className="w-6 h-6 rounded-full bg-[var(--em)]/20 text-[var(--em-dark)] text-xs flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-[var(--ink-3)] text-sm">{text}</p>
                    </div>
                  ))}
                </div>

                {/* ⑨ Bottom trust text */}
                <p className="text-[var(--ink-3)] text-xs text-center mt-4">
                  Your information is shared only with your matched attorney.
                </p>

              </div>

            ) : (

              /* ── UNLOCKED CARDS ─────────────────────────────────────── */
              <>
                {/* Card A: Call Now */}
                <div className="bg-[var(--warm)] border border-[var(--em)]/30 rounded-2xl p-5">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-[var(--em-dark)] font-semibold text-base">Call Now — Free Consultation</p>
                        <p className="text-[var(--ink-4)] text-sm mt-0.5">Speak with a licensed workers&apos; comp attorney today</p>
                      </div>
                    </div>
                    <a
                      href="tel:+18005550199"
                      onClick={handleCallClick}
                      className="block w-full md:w-auto bg-[var(--em)] hover:bg-[var(--em-light)]0 text-white font-semibold px-5 py-3 rounded-xl text-sm whitespace-nowrap no-underline transition-colors duration-150 text-center"
                    >
                      Call Now →
                    </a>
                  </div>
                </div>

                {/* Card B: Report Unlocked */}
                <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-6 mt-3 text-center">
                  <div className="text-4xl md:text-5xl text-[var(--em-dark)] mb-2">✓</div>
                  <h3 className="text-[var(--ink)] text-2xl font-bold">Report Unlocked!</h3>
                  <p className="text-[var(--ink-4)] text-sm leading-relaxed mt-3">
                    A licensed{' '}
                    <span className="text-[var(--em-dark)] font-semibold">{stateData?.name ?? 'state'}</span>
                    {' '}attorney will contact you within 1 business day.
                  </p>
                  <p className="text-[var(--ink-3)] text-xs mt-4">For urgent matters, call us directly.</p>
                </div>
              </>

            )}
          </div>

          {/* Phase 2 content sections — visible only after unlock */}
          {unlocked && (
            <div className="relative z-20 px-4 pb-8 max-w-2xl mx-auto space-y-4">

              {/* Section A: Attorneys */}
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-6">
                <p className="text-[var(--ink)] font-semibold mb-4">
                  Attorneys in {stateData?.name ?? 'your state'} for {injuryData?.name ?? 'your injury'}
                </p>
                {[1,2,3].map(i => (
                  <div key={i} className="border-b border-white/5 last:border-0 py-4 first:pt-0 last:pb-0">
                    <p className="text-[var(--em-dark)] text-sm">★★★★★</p>
                    <p className="text-[var(--ink)] font-medium mt-1">{stateData?.name ?? 'State'} Workers&apos; Comp Specialists</p>
                    <p className="text-[var(--ink-4)] text-sm mt-0.5">
                      Experienced in {injuryData?.name ?? 'workplace injury'} claims · Free consultation
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-[var(--em)]/20 text-[var(--em-dark)] text-xs px-2 py-0.5 rounded">Free consultation</span>
                      <span className="bg-white/5 text-[var(--ink-4)] text-xs px-2 py-0.5 rounded">No upfront fees</span>
                      <span className="bg-white/5 text-[var(--ink-4)] text-xs px-2 py-0.5 rounded">Contingency only</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section B: Filing Deadline */}
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-6">
                <p className="text-[var(--red-dead)] font-semibold">⚠ Your Exact Filing Deadline</p>
                <div className="bg-[rgba(220,38,38,0.12)] border border-[rgba(220,38,38,0.3)] rounded-xl p-4 mt-3">
                  <p className="text-[var(--red-dead)] text-xl font-bold">{filingDeadline.sol} from your date of injury</p>
                  {stateData?.statute && (
                    <p className="text-[var(--ink-4)] text-sm mt-1">Statute: {stateData.statute}</p>
                  )}
                </div>
                <p className="text-[var(--ink-4)] text-sm mt-3 leading-relaxed">
                  Missing this deadline permanently ends your right to compensation.
                  Consult a licensed attorney to confirm your specific deadline.
                </p>
              </div>

              {/* Section C: First Attorney Call Guide */}
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-6">
                <p className="text-[var(--ink)] font-semibold mb-4">Before Your Attorney Call — Be Ready</p>
                <p className="text-[var(--ink-4)] text-sm mb-3">Have these ready:</p>
                {[
                  'Date, time, and location of your injury',
                  'Names and contact info of any witnesses',
                  'Medical records and bills received so far',
                  'Any written communication from your employer or their insurer',
                  'Your average weekly wage at the time of injury',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                    <span className="text-[var(--em-dark)] flex-shrink-0">✓</span>
                    <span className="text-[var(--ink-3)] text-sm">{item}</span>
                  </div>
                ))}
                <p className="text-[var(--ink-4)] text-sm mt-4 mb-2 font-medium">Questions to ask your attorney:</p>
                {[
                  `Have you handled ${injuryData?.name ?? 'workplace injury'} cases in ${stateData?.name ?? 'your state'} before?`,
                  "What percentage of your workers' comp cases settle vs. go to hearing?",
                  "Do you work on contingency? What is your fee?",
                  "What is the realistic range for my case?",
                ].map((q, i) => (
                  <div key={i} className="flex gap-2 mb-2 last:mb-0">
                    <span className="text-[var(--em-dark)] flex-shrink-0 font-bold">·</span>
                    <span className="text-[var(--ink-3)] text-sm">{q}</span>
                  </div>
                ))}
              </div>

              {/* Section D: Step-by-step Claim Guide */}
              <div className="bg-[var(--warm)] border border-[var(--border)] rounded-2xl p-6">
                <p className="text-[var(--ink)] font-semibold mb-4">
                  Your {stateData?.name ?? 'State'} Workers&apos; Comp Claim — Step by Step
                </p>
                {[
                  'Report the injury to your employer in writing — immediately',
                  "Seek authorized medical treatment (use employer's approved provider)",
                  `File the required form with the ${stateData?.name ?? 'state'} Workers' Comp Board`,
                  'Document every medical visit, missed workday, and out-of-pocket expense',
                  "Do NOT accept the first settlement offer without an attorney's review",
                  `If denied, file an appeal before your ${filingDeadline.sol} deadline expires`,
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className="w-7 h-7 rounded-full bg-[var(--em)]/20 text-[var(--em-dark)] text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-[var(--ink-3)] text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Timeline — always visible */}
        <div className="bg-white border border-[var(--border)] rounded-[12px] p-5 mb-5">
          <p className="text-[14px] font-semibold text-[var(--ink)] mb-5">What the claims process typically looks like</p>
          <div className="relative">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-[var(--border)]" />
            <div className="space-y-5">
              {[
                { time: 'Week 1',     title: 'Free attorney consultation', desc: 'Review your claim, verify coverage, assess case strength' },
                { time: 'Weeks 2–4',  title: 'Claim evaluation & filing',  desc: 'Attorney files or responds to insurer' },
                { time: 'Month 2–3',  title: 'Medical evaluation',          desc: 'Independent medical exam if needed, impairment rating assessed' },
                { time: 'Month 3–6',  title: 'Negotiation begins',          desc: "Attorney negotiates with insurer or employer's counsel" },
                { time: 'Month 6–18', title: 'Settlement reached',          desc: `Most cases in ${stateData?.name ?? 'your state'} settle within this window. Complex cases may take longer.` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 pl-7 relative">
                  <div className="absolute left-0 w-5 h-5 rounded-full bg-[var(--em)] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[var(--em)] font-medium">{item.time}</p>
                    <p className="text-[13px] font-semibold text-[var(--ink)]">{item.title}</p>
                    <p className="text-[12px] text-[var(--ink-3)] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#f9fafb] border border-[var(--border)] rounded-lg px-4 py-4 mb-6">
          <p className="text-[11px] text-[var(--ink-4)] leading-[1.7]">
            This calculator provides estimates for informational purposes only and does not constitute legal advice.
            Results are based on state law formulas and statistical averages — actual compensation depends on the
            specific facts of your case. WorkerRight is not a law firm. Attorney advertising. Prior results do not
            guarantee similar outcomes. Always consult a licensed workers&apos; compensation attorney in your state.
          </p>
        </div>

        <div className="text-center mt-2">
          <Link href="/calculator" className="text-[var(--ink-4)] hover:text-[var(--ink-3)] text-xs transition-colors">
            ← Recalculate
          </Link>
        </div>

      </div>

      {/* Mobile sticky bar */}
      {showSticky && !unlocked && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--border)] px-4 py-3 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
        >
          <a
            href="tel:+18005550199"
            onClick={handleCallClick}
            className="flex items-center justify-center gap-2 w-full bg-[var(--em)] hover:bg-[var(--em)] text-white py-3.5 rounded-lg text-sm font-semibold no-underline transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 15a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call now — free consultation
          </a>
          <p className="text-xs text-[var(--ink-4)] text-center mt-1.5">
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

  const inputCls = 'w-full border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink-4)] focus:border-[var(--em)] focus:outline-none focus:ring-1 focus:ring-[var(--em)]/10'

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f9fafb] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#d1fae5" />
            <path d="M14 24l7 7 13-13" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-xl font-semibold text-[var(--ink)] mb-2">Request received</h2>
          <p className="text-sm text-[var(--ink-3)]">A catastrophic injury specialist in {stateName} will contact you within 24 hours.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] py-16">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.25)] rounded-[12px] p-7 mb-6">
          <h2 className="text-[16px] font-semibold text-[var(--ink)] mb-3">Your case requires specialist review</h2>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-3">
            Catastrophic injuries involve complex long-term calculations that standard formulas significantly underestimate.
            These cases often involve lifetime benefits, vocational rehabilitation, and additional legal claims beyond
            workers&apos; comp.
          </p>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">
            We won&apos;t give you a number that could cost you hundreds of thousands of dollars. Instead, connect with
            a specialist attorney who handles catastrophic injury cases.
          </p>
        </div>
        <div className="bg-white border border-[var(--border)] rounded-[12px] p-6">
          <h3 className="text-base font-semibold text-[var(--ink)] mb-4">Get specialist review — free</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text"  required value={name}  onChange={e => setName(e.target.value)}  placeholder="Your full name"   className={inputCls} />
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"   className={inputCls} />
            <input type="tel"            value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" className={inputCls} />
            <div className="flex items-start gap-3">
              <input
                type="checkbox" id="cat-consent" checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 accent-[var(--em)]"
              />
              <label htmlFor="cat-consent" className="text-[11px] text-[var(--ink-4)] leading-relaxed cursor-pointer">
                By submitting, I agree to be contacted by a licensed workers&apos; comp attorney regarding my claim.
                WorkerRight may receive a referral fee. This is free to me.
              </label>
            </div>
            {err && <p className="text-[var(--red-dead)] text-xs">{err}</p>}
            <button
              type="submit" disabled={submitting}
              className="w-full bg-[var(--em)] hover:bg-[#047857] disabled:bg-[var(--border)] disabled:text-[var(--ink-4)] text-white font-medium py-3.5 rounded-lg text-sm transition-colors"
            >
              {submitting ? 'Submitting…' : 'Get specialist review — free →'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/calculator" className="text-[var(--ink-4)] hover:text-[var(--ink-3)] text-xs">← Back to calculator</Link>
        </div>
      </div>
    </main>
  )
}
