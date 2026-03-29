'use client'

import { useState } from 'react'
import { INJURY_TYPES, INDUSTRIES } from '@/lib/pseo-data'
import { InjuryCategory } from '@/types'

interface Props {
  value: string
  industry: string
  onChange: (v: string) => void
}

const TABS: { id: InjuryCategory; label: string }[] = [
  { id: 'body-part',   label: 'Body Part' },
  { id: 'accident',    label: 'Accident Type' },
  { id: 'occupational', label: 'Occupational Disease' },
]

export default function StepInjury({ value, industry, onChange }: Props) {
  const [tab, setTab] = useState<InjuryCategory>('body-part')
  const ind = INDUSTRIES.find(i => i.slug === industry)
  const commonSlugs = ind?.commonInjuries ?? []

  const filtered = INJURY_TYPES.filter(i => i.category === tab)
  const common    = filtered.filter(i => commonSlugs.includes(i.slug))
  const rest      = filtered.filter(i => !commonSlugs.includes(i.slug))

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">What type of injury?</h2>
      <p className="text-sm text-gray-500 mb-4">Select the option that best describes your condition.</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
              tab === t.id ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Common injuries for selected industry */}
      {common.length > 0 && (
        <div className="mb-3">
          <p className="text-[11px] text-emerald-700 font-medium mb-2">Common in your industry</p>
          <div className="space-y-1.5">
            {common.map(inj => (
              <button
                key={inj.slug}
                type="button"
                onClick={() => onChange(inj.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${
                  value === inj.slug
                    ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-800'
                    : 'border-emerald-200 bg-emerald-50/50 text-gray-700 hover:border-emerald-400'
                }`}
              >
                {inj.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rest of injuries */}
      <div className="space-y-1.5">
        {rest.map(inj => (
          <button
            key={inj.slug}
            type="button"
            onClick={() => onChange(inj.slug)}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${
              value === inj.slug
                ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-800'
                : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-400'
            }`}
          >
            {inj.name}
          </button>
        ))}
      </div>
    </div>
  )
}
