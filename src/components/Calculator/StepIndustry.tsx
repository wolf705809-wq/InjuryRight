'use client'

import { INDUSTRIES } from '@/lib/pseo-data'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function StepIndustry({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">What industry do you work in?</h2>
      <p className="text-sm text-gray-500 mb-4">High-risk industries may increase your settlement value.</p>
      <div className="grid grid-cols-2 gap-2">
        {INDUSTRIES.map((ind) => {
          const isHigh = ind.riskLevel === 'high' || ind.riskLevel === 'very-high'
          return (
            <button
              key={ind.slug}
              type="button"
              onClick={() => onChange(ind.slug)}
              className={`text-left px-3 py-3 rounded-lg border transition-all ${
                value === ind.slug
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-400'
              }`}
            >
              <p className="text-sm font-medium text-gray-900">{ind.name}</p>
              {isHigh && (
                <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.5 rounded">
                  High-risk — may increase settlement
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
