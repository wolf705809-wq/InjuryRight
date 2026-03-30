'use client'

import { US_STATES } from '@/lib/pseo-data'

interface Props {
  weeklyWage: number
  employmentMonths: number
  stateSlug: string
  onChange: (k: string, v: number) => void
}

export default function StepWorkInfo({ weeklyWage, employmentMonths, stateSlug, onChange }: Props) {
  const stateData = US_STATES.find(s => s.slug === stateSlug)
  const weeklyBenefit = stateData
    ? Math.min(weeklyWage * stateData.ttdRate, stateData.maxWeeklyBenefit)
    : 0
  const atCap = stateData ? weeklyWage * stateData.ttdRate > stateData.maxWeeklyBenefit : false

  const monthLabel = employmentMonths >= 12
    ? `${Math.floor(employmentMonths / 12)} yr${Math.floor(employmentMonths / 12) > 1 ? 's' : ''} ${employmentMonths % 12 > 0 ? `${employmentMonths % 12} mo` : ''}`
    : `${employmentMonths} month${employmentMonths !== 1 ? 's' : ''}`

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-gray-900">Your work conditions</h2>

      {/* Weekly wage */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-700 font-medium">Gross weekly wage</label>
          <span className="text-sm font-semibold text-gray-900">${weeklyWage.toLocaleString()}</span>
        </div>
        <input
          type="range" min={200} max={3000} step={50}
          value={weeklyWage}
          onChange={e => onChange('weeklyWage', Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: '#059669' }}
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>$200</span><span>$3,000</span>
        </div>
        {weeklyBenefit > 0 && (
          <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
            Your estimated weekly benefit: <span className="font-semibold">${Math.round(weeklyBenefit).toLocaleString()}/week</span>
          </p>
        )}
        {atCap && stateData && (
          <p className="mt-1 text-xs text-amber-700">
            {stateData.name} caps TTD at ${stateData.maxWeeklyBenefit.toLocaleString()}/week — this limit will apply to your calculation
          </p>
        )}
      </div>

      {/* Employment duration */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-700 font-medium">Time at this employer</label>
          <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
        </div>
        <input
          type="range" min={1} max={360} step={1}
          value={employmentMonths}
          onChange={e => onChange('employmentMonths', Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: '#059669' }}
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>1 month</span><span>30 years</span>
        </div>
        {employmentMonths < 24 && (
          <p className="mt-1 text-xs text-gray-400">
            Under 2 years — standard benefits still apply. Note: discrimination claims have no minimum service requirement.
          </p>
        )}
      </div>
    </div>
  )
}
