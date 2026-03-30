'use client'

import { INJURY_TYPES } from '@/lib/pseo-data'
import { SeverityLevel } from '@/types'

interface Props {
  hasImpairmentRating: boolean
  impairmentRating: number
  injurySlug: string
  severityLevel: SeverityLevel | ''
  onChange: (k: string, v: boolean | number) => void
}

function getRatingLabel(r: number): string {
  if (r <= 10) return 'Mild impairment'
  if (r <= 25) return 'Moderate impairment'
  if (r <= 50) return 'Significant impairment'
  return 'Severe impairment — consider permanent total disability evaluation'
}

function getEstimatedRating(injurySlug: string, severityLevel: SeverityLevel | ''): number {
  const injury = INJURY_TYPES.find(i => i.slug === injurySlug)
  const avg = injury?.avgImpairmentRating ?? 15
  const mult =
    severityLevel === 'minor' ? 0.5 :
    severityLevel === 'severe' ? 1.6 : 1.0
  return Math.min(Math.round(avg * mult), 99)
}

export default function StepImpairment({ hasImpairmentRating, impairmentRating, injurySlug, severityLevel, onChange }: Props) {
  const injury = INJURY_TYPES.find(i => i.slug === injurySlug)
  const estimatedRating = getEstimatedRating(injurySlug, severityLevel)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">Has a doctor assigned you an impairment rating?</h2>
        <p className="text-sm text-gray-500 mb-4">Impairment ratings directly determine your permanent disability benefits.</p>
      </div>

      <div className="flex gap-3">
        {(['Yes', 'No', 'Not sure'] as const).map(label => {
          const isYes = label === 'Yes'
          const active = isYes ? hasImpairmentRating : !hasImpairmentRating
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange('hasImpairmentRating', isYes)}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                active && (label === 'Yes' ? hasImpairmentRating : !hasImpairmentRating)
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 text-gray-700 hover:border-emerald-400'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {hasImpairmentRating ? (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-700 font-medium">Impairment rating</label>
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
          <p className="mt-2 text-xs text-gray-500">{getRatingLabel(impairmentRating)}</p>
          {impairmentRating >= 51 && (
            <p className="mt-1 text-xs text-amber-700 font-medium">
              Severe impairment — consider permanent total disability evaluation
            </p>
          )}
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <p className="text-xs text-emerald-800 leading-relaxed">
            Based on{' '}
            <span className="font-medium">{injury?.name ?? 'your injury'}</span>
            {severityLevel && <> with <span className="font-medium">{severityLevel}</span> severity</>},
            average impairment rating is{' '}
            <span className="font-semibold">~{estimatedRating}%</span>
          </p>
          <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
            Estimated
          </span>
        </div>
      )}
    </div>
  )
}
