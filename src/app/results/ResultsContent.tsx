'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CalculatorInput, CalculationResult } from '@/types'
import { calculateWorkersComp, formatUSD } from '@/lib/calculator-us'
import { INJURY_TYPES, US_STATES } from '@/lib/pseo-data'
import CompensationBreakdown from '@/components/Results/CompensationBreakdown'
import StateSpecificNotes from '@/components/Results/StateSpecificNotes'
import LeadCaptureForm from '@/components/Results/LeadCaptureForm'
import { RESULTS_DISCLAIMER } from '@/lib/compliance'

export default function ResultsContent() {
  const p = useSearchParams()

  const input: CalculatorInput = {
    state:               p.get('state') || '',
    industry:            p.get('industry') || '',
    injurySlug:          p.get('injurySlug') || '',
    bodyPart:            p.get('bodyPart') || '',
    weeklyWage:          Number(p.get('weeklyWage') || 800),
    employmentMonths:    Number(p.get('employmentMonths') || 24),
    impairmentRating:    Number(p.get('impairmentRating') || 10),
    treatmentWeeks:      Number(p.get('treatmentWeeks') || 8),
    hasImpairmentRating: p.get('hasImpairmentRating') === 'true',
    employmentStatus:    (p.get('employmentStatus') as CalculatorInput['employmentStatus']) || 'full-time',
    mmiStatus:           (p.get('mmiStatus') as CalculatorInput['mmiStatus']) || 'not-sure',
  }

  const result: CalculationResult = calculateWorkersComp(input)
  const stateData  = US_STATES.find(s => s.slug === input.state)
  const injuryData = INJURY_TYPES.find(i => i.slug === input.injurySlug)

  if (!result.totalHigh) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <p className="text-gray-500 mb-4">No results found.</p>
          <Link href="/calculator" className="text-emerald-600 hover:underline text-sm">Go back to calculator</Link>
        </div>
      </div>
    )
  }

  const prefill = {
    country: 'us',
    state:    input.state,
    industry: input.industry,
    injuryType: input.injurySlug,
    bodyPart: injuryData?.bodyPart,
    weeklyWage: input.weeklyWage,
    employmentMonths: input.employmentMonths,
    impairmentRating: input.impairmentRating,
    treatmentWeeks: input.treatmentWeeks,
    employmentStatus: input.employmentStatus,
    mmiReached: input.mmiStatus === 'mmi-reached',
    ttdEstimate: result.ttd,
    ppdEstimate: result.ppd,
    medicalEstimate: result.medicalEstimate,
    totalLow: result.totalLow,
    totalHigh: result.totalHigh,
    caseStrength: result.caseStrength,
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500 mb-2">
            Estimated settlement range{stateData ? ` — ${stateData.name}` : ''}
            {injuryData ? `, ${injuryData.name}` : ''}
          </p>
          <h1 className="font-bold text-emerald-600 mb-1" style={{ fontSize: 'clamp(28px, 6vw, 42px)' }}>
            {formatUSD(result.totalLow)} – {formatUSD(result.totalHigh)}
          </h1>
          <p className="text-xs text-gray-400">Based on state-specific workers' comp formula · estimates only</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <CompensationBreakdown result={result} />
          <StateSpecificNotes stateNotes={result.stateNotes} caseStrength={result.caseStrength} />
        </div>

        <LeadCaptureForm prefill={prefill} />

        <div className="border-t border-gray-200 mt-6 pt-5">
          <p className="text-[11px] text-gray-400 leading-[1.6] text-center">{RESULTS_DISCLAIMER}</p>
        </div>
        <div className="text-center mt-6">
          <Link href="/calculator" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">← Recalculate</Link>
        </div>
      </div>
    </main>
  )
}
