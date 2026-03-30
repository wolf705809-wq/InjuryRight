'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EmploymentStatus, EmployerControl, SeverityLevel, TreatmentStatus, ClaimStatus } from '@/types'
import { EXCLUDED_STATES } from '@/lib/pseo-data'
import StepState      from './StepState'
import StepEmployment from './StepEmployment'
import StepInjury     from './StepInjury'
import StepSeverity   from './StepSeverity'
import StepWorkInfo   from './StepWorkInfo'
import StepClaimInfo  from './StepClaimInfo'
import StepImpairment from './StepImpairment'

interface FormData {
  state: string
  industry: string
  injurySlug: string
  employmentStatus: EmploymentStatus | ''
  employerControl: EmployerControl | ''
  severityLevel: SeverityLevel | ''
  weeklyWage: number
  employmentMonths: number
  treatmentStatus: TreatmentStatus | ''
  claimStatus: ClaimStatus | ''
  companyOffer: number | null
  hasOffer: boolean
  hasImpairmentRating: boolean
  impairmentRating: number
}

interface Props {
  preselectedState?:    string
  preselectedIndustry?: string
  preselectedInjury?:   string
}

const STEP_LABELS = ['State', 'Employment', 'Injury', 'Severity', 'Work Info', 'Claim Info', 'Impairment']
const TOTAL_STEPS = 7

export default function CalculatorForm({ preselectedState = '', preselectedIndustry = '', preselectedInjury = '' }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showCatastrophicGate, setShowCatastrophicGate] = useState(false)

  const [form, setForm] = useState<FormData>({
    state:              preselectedState,
    industry:           preselectedIndustry,
    injurySlug:         preselectedInjury,
    employmentStatus:   'full-time',
    employerControl:    '',
    severityLevel:      '',
    weeklyWage:         800,
    employmentMonths:   24,
    treatmentStatus:    '',
    claimStatus:        '',
    companyOffer:       null,
    hasOffer:           false,
    hasImpairmentRating: false,
    impairmentRating:   10,
  })

  const setField = (k: string, v: string | number | boolean | null) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const isExcluded = EXCLUDED_STATES.includes(form.state)

  // Rough estimate for offer% in step 6
  const roughEstimate = (() => {
    const sevMult =
      form.severityLevel === 'minor' ? 0.7 :
      form.severityLevel === 'severe' ? 1.4 : 1.0
    return Math.round(form.weeklyWage * 26 * sevMult)
  })()

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!form.state && !isExcluded
      case 1: return !!form.employmentStatus
      case 2: return !!form.injurySlug
      case 3: return !!form.severityLevel && form.severityLevel !== 'catastrophic'
      case 4: return form.weeklyWage > 0 && form.employmentMonths > 0
      case 5: return !!form.treatmentStatus && !!form.claimStatus
      case 6: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (step === 3 && form.severityLevel === 'catastrophic') {
      setShowCatastrophicGate(true)
      return
    }
    if (step < TOTAL_STEPS - 1) setStep(step + 1)
    else submit()
  }

  const handleCatastrophicCTA = () => {
    const params = new URLSearchParams({
      catastrophic: 'true',
      state: form.state,
      injurySlug: form.injurySlug,
    })
    router.push(`/results?${params}`)
  }

  const submit = () => {
    const params = new URLSearchParams({
      state:               form.state,
      industry:            form.industry,
      injurySlug:          form.injurySlug,
      employmentStatus:    form.employmentStatus,
      employerControl:     form.employerControl || '',
      severityLevel:       form.severityLevel,
      weeklyWage:          String(form.weeklyWage),
      employmentMonths:    String(form.employmentMonths),
      treatmentStatus:     form.treatmentStatus,
      claimStatus:         form.claimStatus,
      companyOffer:        form.companyOffer != null ? String(form.companyOffer) : '',
      hasImpairmentRating: String(form.hasImpairmentRating),
      impairmentRating:    String(form.impairmentRating),
    })
    router.push(`/results?${params}`)
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="h-[3px] bg-gray-200 rounded-full mb-5">
        <div
          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1 mb-6">
        {STEP_LABELS.map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold transition-colors ${
              i < step ? 'bg-emerald-600 text-white'
              : i === step ? 'border-2 border-emerald-600 text-emerald-600 bg-white'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`h-px w-3 md:w-4 ${i < step ? 'bg-emerald-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
        <span className="ml-auto text-[11px] text-gray-400">Step {step + 1} of {TOTAL_STEPS}</span>
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 0 && (
          <StepState value={form.state} onChange={v => setField('state', v)} />
        )}
        {step === 1 && (
          <StepEmployment
            employmentStatus={form.employmentStatus}
            employerControl={form.employerControl}
            onChange={setField}
          />
        )}
        {step === 2 && (
          <StepInjury
            value={form.injurySlug}
            industry={form.industry}
            onChange={v => setField('injurySlug', v)}
          />
        )}
        {step === 3 && (
          <StepSeverity
            value={form.severityLevel}
            onChange={setField}
            onCatastrophicNext={handleCatastrophicCTA}
            isCatastrophicSelected={form.severityLevel === 'catastrophic'}
          />
        )}
        {step === 4 && (
          <StepWorkInfo
            weeklyWage={form.weeklyWage}
            employmentMonths={form.employmentMonths}
            stateSlug={form.state}
            onChange={setField}
          />
        )}
        {step === 5 && (
          <StepClaimInfo
            stateSlug={form.state}
            treatmentStatus={form.treatmentStatus}
            claimStatus={form.claimStatus}
            companyOffer={form.companyOffer}
            hasOffer={form.hasOffer}
            roughEstimate={roughEstimate}
            onChange={setField}
          />
        )}
        {step === 6 && (
          <StepImpairment
            hasImpairmentRating={form.hasImpairmentRating}
            impairmentRating={form.impairmentRating}
            injurySlug={form.injurySlug}
            severityLevel={form.severityLevel}
            onChange={setField}
          />
        )}
      </div>

      {/* Navigation */}
      {!showCatastrophicGate && (
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 px-4 py-2 rounded-lg disabled:opacity-0 transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            {step === TOTAL_STEPS - 1 ? 'Calculate →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}
