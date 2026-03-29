'use client'

import { INJURY_TYPES } from '@/lib/pseo-data'
import { MmiStatus } from '@/types'
import { SIGN_WARNING } from '@/lib/compliance'

interface Props {
  hasImpairmentRating: boolean
  impairmentRating: number
  mmiStatus: MmiStatus
  injurySlug: string
  onChange: (k: string, v: boolean | number | string) => void
}

const MMI_OPTIONS: { value: MmiStatus; label: string; sub?: string }[] = [
  { value: 'still-treating', label: 'Still treating', sub: 'Not yet reached maximum medical improvement' },
  { value: 'mmi-reached',    label: 'MMI reached',    sub: 'Doctor says condition is permanent' },
  { value: 'not-sure',       label: 'Not sure' },
]

export default function StepImpairment({ hasImpairmentRating, impairmentRating, mmiStatus, injurySlug, onChange }: Props) {
  const injury = INJURY_TYPES.find(i => i.slug === injurySlug)
  const avgRating = injury?.avgImpairmentRating ?? 15

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-gray-900">Impairment & medical status</h2>

      {/* Settlement warning */}
      <div className="border-l-[3px] border-amber-400 bg-amber-50 px-4 py-3 rounded-r-lg">
        <p className="text-xs text-amber-800 leading-relaxed">⚠ {SIGN_WARNING}</p>
      </div>

      {/* Impairment rating */}
      <div>
        <label className="text-sm text-gray-700 font-medium block mb-2">
          Has a doctor assigned you an impairment rating?
        </label>
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => onChange('hasImpairmentRating', true)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              hasImpairmentRating ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:border-emerald-400'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange('hasImpairmentRating', false)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              !hasImpairmentRating ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:border-emerald-400'
            }`}
          >
            No
          </button>
        </div>

        {hasImpairmentRating ? (
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600">Impairment rating</label>
              <span className="text-sm font-semibold text-gray-900">{impairmentRating}%</span>
            </div>
            <input
              type="range" min={0} max={100} step={1}
              value={impairmentRating}
              onChange={e => onChange('impairmentRating', Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#059669' }}
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>0%</span><span>100%</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-3 py-2">
            We&apos;ll estimate based on your injury type (avg for {injury?.name ?? 'this injury'}: <strong>{avgRating}%</strong>)
          </p>
        )}
      </div>

      {/* MMI status */}
      <div>
        <label className="text-sm text-gray-700 font-medium block mb-2">MMI (Maximum Medical Improvement) status</label>
        <div className="space-y-2">
          {MMI_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('mmiStatus', opt.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                mmiStatus === opt.value
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-400'
              }`}
            >
              <p className="text-sm font-medium text-gray-900">{opt.label}</p>
              {opt.sub && <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>}
            </button>
          ))}
        </div>
        {mmiStatus === 'mmi-reached' && (
          <div className="mt-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
            <span className="text-emerald-600 text-sm font-bold">✓</span>
            <p className="text-xs text-emerald-800">
              Good — your PPD benefits can now be calculated more accurately.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
