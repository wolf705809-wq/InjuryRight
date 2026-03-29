'use client'

import { US_STATES, EXCLUDED_STATES } from '@/lib/pseo-data'
import { STATE_FUND_WARNING } from '@/lib/compliance'

const EXCLUDED = [
  { slug: 'ohio',       name: 'Ohio' },
  { slug: 'washington', name: 'Washington' },
  { slug: 'wyoming',    name: 'Wyoming' },
]

const ALL_OPTIONS = [
  ...US_STATES.map(s => ({ slug: s.slug, name: s.name, excluded: false })),
  ...EXCLUDED.map(s => ({ ...s, excluded: true })),
].sort((a, b) => a.name.localeCompare(b.name))

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function StepState({ value, onChange }: Props) {
  const selectedState = US_STATES.find(s => s.slug === value)
  const isExcluded = EXCLUDED_STATES.includes(value)

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">Which state were you injured in?</h2>
      <p className="text-sm text-gray-500 mb-4">Workers' comp laws vary significantly by state.</p>

      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
      >
        <option value="">Select your state…</option>
        {ALL_OPTIONS.map(s => (
          <option key={s.slug} value={s.slug}>
            {s.name}{s.excluded ? ' (state-fund only)' : ''}
          </option>
        ))}
      </select>

      {isExcluded && (
        <div className="mt-4 border-l-[3px] border-amber-400 bg-amber-50 px-4 py-3 rounded-r-lg">
          <p className="text-xs text-amber-800 leading-relaxed">
            ⚠ {STATE_FUND_WARNING(EXCLUDED.find(e => e.slug === value)?.name ?? value)}
          </p>
        </div>
      )}

      {selectedState && !isExcluded && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-1">
          <p className="text-xs text-emerald-800">
            <span className="font-medium">Max weekly benefit:</span> ${selectedState.maxWeeklyBenefit.toLocaleString()}/week
          </p>
          <p className="text-xs text-emerald-800">
            <span className="font-medium">Filing deadline:</span> {selectedState.sol}
          </p>
          <p className="text-xs text-emerald-800">
            <span className="font-medium">Compensation system:</span> {selectedState.system.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  )
}
