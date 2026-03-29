'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EmploymentStatus, MmiStatus } from '@/types'
import { EXCLUDED_STATES } from '@/lib/pseo-data'
import StepState      from './StepState'
import StepIndustry   from './StepIndustry'
import StepInjury     from './StepInjury'
import StepWorkInfo   from './StepWorkInfo'
import StepImpairment from './StepImpairment'

interface FormData {
  state: string
  industry: string
  injurySlug: string
  weeklyWage: number
  employmentMonths: number
  employmentStatus: EmploymentStatus
  treatmentWeeks: number
  hasImpairmentRating: boolean
  impairmentRating: number
  mmiStatus: MmiStatus
}

interface Props {
  preselectedState?:    string
  preselectedIndustry?: string
  preselectedInjury?:   string
}

const STEPS = ['State', 'Industry', 'Injury', 'Work Info', 'Impairment']

export default function CalculatorForm({ preselectedState = '', preselectedIndustry = '', preselectedInjury = '' }: Props) {
  const router = useRouter()
  const allPreselected = preselectedState && preselectedIndustry && preselectedInjury
  const [step, setStep] = useState(allPreselected ? 3 : 0)

  const [form, setForm] = useState<FormData>({
    state:              preselectedState,
    industry:           preselectedIndustry,
    injurySlug:         preselectedInjury,
    weeklyWage:         800,
    employmentMonths:   24,
    employmentStatus:   'full-time',
    treatmentWeeks:     8,
    hasImpairmentRating: false,
    impairmentRating:   10,
    mmiStatus:          'not-sure',
  })

  const setField = (k: string, v: string | number | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const isExcluded = EXCLUDED_STATES.includes(form.state)

  const canProceed = () => {
    if (step === 0) return !!form.state && !isExcluded
    if (step === 1) return !!form.industry
    if (step === 2) return !!form.injurySlug
    if (step === 3) return form.weeklyWage > 0 && form.employmentMonths > 0
    if (step === 4) return !!form.mmiStatus
    return false
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else submit()
  }

  const submit = () => {
    const params = new URLSearchParams({
      state:              form.state,
      industry:           form.industry,
      injurySlug:         form.injurySlug,
      bodyPart:           '',
      weeklyWage:         String(form.weeklyWage),
      employmentMonths:   String(form.employmentMonths),
      employmentStatus:   form.employmentStatus,
      treatmentWeeks:     String(form.treatmentWeeks),
      hasImpairmentRating: String(form.hasImpairmentRating),
      impairmentRating:   String(form.impairmentRating),
      mmiStatus:          form.mmiStatus,
    })
    router.push(`/results?${params}`)
  }

  const progress = ((step + 1) / 5) * 100

  return (
    <div>
      {/* Progress */}
      <div className="h-[3px] bg-gray-200 rounded-full mb-6">
        <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Step pills */}
      <div className="flex items-center gap-1 mb-7">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
              i < step ? 'bg-emerald-600 text-white'
              : i === step ? 'border-2 border-emerald-600 text-emerald-600 bg-white'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`h-px w-4 md:w-6 ${i < step ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="ml-auto text-[11px] text-gray-400">Step {step + 1} of 5</span>
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 0 && <StepState    value={form.state}      onChange={v => setField('state', v)} />}
        {step === 1 && <StepIndustry value={form.industry}   onChange={v => setField('industry', v)} />}
        {step === 2 && <StepInjury   value={form.injurySlug} industry={form.industry} onChange={v => setField('injurySlug', v)} />}
        {step === 3 && (
          <StepWorkInfo
            weeklyWage={form.weeklyWage}
            employmentMonths={form.employmentMonths}
            employmentStatus={form.employmentStatus}
            treatmentWeeks={form.treatmentWeeks}
            stateSlug={form.state}
            onChange={setField}
          />
        )}
        {step === 4 && (
          <StepImpairment
            hasImpairmentRating={form.hasImpairmentRating}
            impairmentRating={form.impairmentRating}
            mmiStatus={form.mmiStatus}
            injurySlug={form.injurySlug}
            onChange={setField}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-7 pt-6 border-t border-gray-100">
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
          {step === 4 ? 'Calculate →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
