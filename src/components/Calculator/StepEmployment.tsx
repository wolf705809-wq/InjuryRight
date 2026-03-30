'use client'

import { EmploymentStatus, EmployerControl } from '@/types'

interface Props {
  employmentStatus: EmploymentStatus | ''
  employerControl: EmployerControl | ''
  onChange: (k: string, v: string) => void
}

const OPTIONS: { value: EmploymentStatus; label: string; desc: string; amber?: boolean }[] = [
  {
    value: 'full-time',
    label: 'Full-time employee',
    desc: "Standard workers' comp coverage applies from day one of employment.",
  },
  {
    value: 'part-time',
    label: 'Part-time employee',
    desc: 'Coverage applies — benefits calculated on your actual average weekly wage.',
  },
  {
    value: 'contractor',
    label: 'Independent Contractor (1099)',
    desc: 'Coverage depends on your state and how your employer classifies you. Many contractors are legally entitled to coverage.',
    amber: true,
  },
  {
    value: 'gig',
    label: 'Gig / Platform Worker',
    desc: 'Uber, DoorDash, Amazon Flex, Instacart, etc. Classification disputes are common — you may still have a valid claim.',
    amber: true,
  },
]

const CONTROL_OPTIONS: { value: EmployerControl; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'partially', label: 'Partially' },
]

export default function StepEmployment({ employmentStatus, employerControl, onChange }: Props) {
  const showControl = employmentStatus === 'contractor' || employmentStatus === 'gig'

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">What is your employment status?</h2>
      <p className="text-sm text-gray-500 mb-4">This affects coverage and benefit calculations.</p>

      <div className="space-y-2">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange('employmentStatus', opt.value)}
            className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all ${
              employmentStatus === opt.value
                ? 'border-emerald-600 bg-emerald-50'
                : opt.amber
                ? 'border-amber-200 bg-amber-50/60 hover:border-amber-400'
                : 'border-gray-200 bg-white hover:border-emerald-400'
            }`}
          >
            <p className={`text-sm font-medium ${
              employmentStatus === opt.value ? 'text-emerald-800' : 'text-gray-900'
            }`}>{opt.label}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.desc}</p>
          </button>
        ))}
      </div>

      {showControl && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Did your employer control your work schedule and methods?
          </p>
          <div className="flex gap-2">
            {CONTROL_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange('employerControl', opt.value)}
                className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  employerControl === opt.value
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 text-gray-700 hover:border-emerald-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {employerControl === 'yes' && (
            <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <p className="text-xs text-emerald-800">
                ✓ This suggests possible misclassification — you may be entitled to full coverage
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
