'use client'

import { SeverityLevel } from '@/types'

interface Props {
  value: SeverityLevel | ''
  onChange: (k: string, v: string) => void
  onCatastrophicNext: () => void
  isCatastrophicSelected: boolean
}

const OPTIONS: {
  value: SeverityLevel
  label: string
  desc: string
  multiplier: string | null
  red?: boolean
}[] = [
  {
    value: 'minor',
    label: 'Minor',
    desc: 'Treated and returned to work within 2 weeks. No surgery required. No permanent limitations.',
    multiplier: '0.7×',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    desc: 'Required more than 2 weeks off work. Physical therapy. Possible partial restrictions.',
    multiplier: '1.0×',
  },
  {
    value: 'severe',
    label: 'Severe',
    desc: 'Required surgery OR 3+ months off work. Significant permanent limitations expected.',
    multiplier: '1.4×',
  },
  {
    value: 'catastrophic',
    label: 'Catastrophic',
    desc: 'Permanent disability. Unable to return to prior work. Examples: amputation, TBI, spinal cord injury, terminal occupational disease.',
    multiplier: null,
    red: true,
  },
]

export default function StepSeverity({ value, onChange, onCatastrophicNext, isCatastrophicSelected }: Props) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">How severe is your injury?</h2>
      <p className="text-sm text-gray-500 mb-4">This significantly affects your benefit calculation.</p>

      <div className="space-y-2">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange('severityLevel', opt.value)}
            className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all ${
              value === opt.value
                ? opt.red
                  ? 'border-red-400 bg-red-50'
                  : 'border-emerald-600 bg-emerald-50'
                : opt.red
                ? 'border-red-200 bg-red-50/40 hover:border-red-400'
                : 'border-gray-200 bg-white hover:border-emerald-400'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`text-sm font-medium ${
                  value === opt.value
                    ? opt.red ? 'text-red-800' : 'text-emerald-800'
                    : 'text-gray-900'
                }`}>{opt.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.desc}</p>
              </div>
              {opt.multiplier && (
                <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                  {opt.multiplier}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {isCatastrophicSelected && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Your case requires specialist review</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Catastrophic injuries involve complex long-term calculations that standard formulas significantly underestimate.
            These cases often involve lifetime benefits, vocational rehabilitation, and additional legal claims beyond
            workers&apos; comp.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            We won&apos;t give you a number that could cost you hundreds of thousands of dollars. Instead, connect with
            a specialist attorney who handles catastrophic injury cases.
          </p>
          <button
            type="button"
            onClick={onCatastrophicNext}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-3.5 rounded-lg transition-colors"
          >
            Get specialist review — free →
          </button>
        </div>
      )}
    </div>
  )
}
