'use client'

import { US_STATES } from '@/lib/pseo-data'
import { EmploymentStatus } from '@/types'

interface Props {
  weeklyWage: number
  employmentMonths: number
  employmentStatus: EmploymentStatus
  treatmentWeeks: number
  stateSlug: string
  onChange: (k: string, v: number | string) => void
}

const STATUS_OPTIONS: { value: EmploymentStatus; label: string }[] = [
  { value: 'full-time',   label: 'Full-time employee' },
  { value: 'part-time',   label: 'Part-time employee' },
  { value: 'contractor',  label: 'Independent contractor' },
]

export default function StepWorkInfo({ weeklyWage, employmentMonths, employmentStatus, treatmentWeeks, stateSlug, onChange }: Props) {
  const stateData = US_STATES.find(s => s.slug === stateSlug)
  const weeklyBenefit = stateData
    ? Math.min(weeklyWage * stateData.ttdRate, stateData.maxWeeklyBenefit)
    : 0

  const monthLabel = employmentMonths >= 12
    ? `${Math.floor(employmentMonths / 12)} yr${Math.floor(employmentMonths / 12) > 1 ? 's' : ''} ${employmentMonths % 12 > 0 ? `${employmentMonths % 12} mo` : ''}`
    : `${employmentMonths} month${employmentMonths !== 1 ? 's' : ''}`

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-gray-900">Tell us about your work</h2>

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
            Your estimated weekly TTD benefit: <span className="font-semibold">${Math.round(weeklyBenefit).toLocaleString()}/week</span>
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
      </div>

      {/* Treatment weeks */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-700 font-medium">Estimated treatment duration</label>
          <span className="text-sm font-semibold text-gray-900">
            {treatmentWeeks >= 52 ? '52+ weeks' : `${treatmentWeeks} week${treatmentWeeks !== 1 ? 's' : ''}`}
          </span>
        </div>
        <input
          type="range" min={1} max={52} step={1}
          value={treatmentWeeks}
          onChange={e => onChange('treatmentWeeks', Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: '#059669' }}
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>1 week</span><span>52+ weeks</span>
        </div>
      </div>

      {/* Employment status */}
      <div>
        <label className="text-sm text-gray-700 font-medium block mb-2">Employment status</label>
        <div className="space-y-2">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('employmentStatus', opt.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
                employmentStatus === opt.value
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-400'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                employmentStatus === opt.value ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
              }`}>
                {employmentStatus === opt.value && <span className="block w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span className="text-sm text-gray-900">{opt.label}</span>
            </button>
          ))}
        </div>
        {employmentStatus === 'contractor' && (
          <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
            ⚠ Independent contractors may face additional hurdles. An attorney can help establish coverage.
          </p>
        )}
      </div>
    </div>
  )
}
