import { CaseStrength } from '@/types'

interface Props {
  stateNotes: string[]
  caseStrength: CaseStrength
}

const strengthConfig: Record<CaseStrength, { bar: string; label: string; color: string; width: string }> = {
  'Very Strong': { bar: 'bg-[#059669]', label: 'Very Strong', color: 'text-[#065f46]', width: '95%' },
  Strong:        { bar: 'bg-[#059669]', label: 'Strong',      color: 'text-[#065f46]', width: '72%' },
  Moderate:      { bar: 'bg-[#059669]', label: 'Moderate',    color: 'text-[#065f46]', width: '50%' },
  Weak:          { bar: 'bg-[#059669]', label: 'Weak',        color: 'text-[#065f46]', width: '25%' },
}

export default function StateSpecificNotes({ stateNotes, caseStrength }: Props) {
  const cfg = strengthConfig[caseStrength]
  return (
    <div className="space-y-4">
      {/* Case strength */}
      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Case Strength</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Estimated likelihood of recovery</span>
          <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
        <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div className={`h-full ${cfg.bar} rounded-full transition-all duration-700`} style={{ width: cfg.width }} />
        </div>
      </div>

      {/* State notes */}
      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Important State Rules</h3>
        <ul className="space-y-2">
          {stateNotes.map((note, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
              <span className="text-emerald-600 font-bold mt-0.5 shrink-0">•</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Next steps */}
      <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-emerald-800 mb-3">What to do next</h3>
        <ul className="space-y-1.5 text-xs text-[#065f46]">
          {['Report your injury to your employer immediately', 'Seek medical treatment from an approved provider', 'Do not sign any settlement without attorney review', 'Contact a workers\' comp attorney — most work free until you win'].map(s => (
            <li key={s} className="flex gap-2"><span>✓</span>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
