'use client'

import { TreatmentStatus, ClaimStatus } from '@/types'
import { US_STATES } from '@/lib/pseo-data'

interface Props {
  stateSlug: string
  treatmentStatus: TreatmentStatus | ''
  claimStatus: ClaimStatus | ''
  companyOffer: number | null
  hasOffer: boolean
  roughEstimate: number
  onChange: (k: string, v: string | number | boolean | null) => void
}

const TREATMENT_OPTIONS: { value: TreatmentStatus; label: string }[] = [
  { value: 'treating',   label: 'Still actively treating' },
  { value: 'mmi',        label: 'Reached Maximum Medical Improvement (MMI)' },
  { value: 'full-duty',  label: 'Returned to full duty' },
  { value: 'light-duty', label: 'Returned to work with restrictions' },
  { value: 'not-yet',    label: "Haven't started treatment yet" },
]

const CLAIM_OPTIONS: { value: ClaimStatus; label: string }[] = [
  { value: 'accepted',  label: 'Claim accepted — receiving benefits' },
  { value: 'denied',    label: 'Claim denied' },
  { value: 'pending',   label: 'Claim pending — no decision yet' },
  { value: 'not-filed', label: "I haven't filed a claim yet" },
]

export default function StepClaimInfo({
  stateSlug, treatmentStatus, claimStatus, companyOffer, hasOffer, roughEstimate, onChange,
}: Props) {
  const stateData = US_STATES.find(s => s.slug === stateSlug)
  const offerPct = (hasOffer && companyOffer && roughEstimate > 0)
    ? Math.round((companyOffer / roughEstimate) * 100) : null

  return (
    <div className="space-y-6">
      {/* Section A */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Current treatment status</h2>
        <div className="space-y-1.5">
          {TREATMENT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('treatmentStatus', opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all text-sm ${
                treatmentStatus === opt.value
                  ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-800'
                  : 'border-gray-200 bg-white hover:border-emerald-400 text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {treatmentStatus === 'mmi' && (
          <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <p className="text-xs text-emerald-800">
              ✓ MMI reached — your permanent disability benefits can now be calculated accurately
            </p>
          </div>
        )}
      </div>

      {/* Section B */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">How has your employer responded?</h3>
        <div className="space-y-1.5">
          {CLAIM_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('claimStatus', opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all text-sm ${
                claimStatus === opt.value
                  ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-800'
                  : 'border-gray-200 bg-white hover:border-emerald-400 text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {claimStatus === 'denied' && (
          <div className="mt-2 border-l-[3px] border-amber-400 bg-amber-50 px-4 py-3 rounded-r-lg">
            <p className="text-xs text-amber-800 leading-relaxed">
              A denied claim is not the end. You have the right to appeal, and most denials can be reversed with
              attorney assistance.
            </p>
          </div>
        )}
        {claimStatus === 'not-filed' && stateData && (
          <p className="mt-2 text-xs text-red-600 font-medium">
            ⏰ Filing deadline in {stateData.name}: {stateData.sol}. Missing this permanently bars your claim.
          </p>
        )}
      </div>

      {/* Section C */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Has your employer made a settlement offer?</h3>
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => onChange('hasOffer', true)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              hasOffer ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:border-emerald-400'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => { onChange('hasOffer', false); onChange('companyOffer', null) }}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              !hasOffer ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-700 hover:border-emerald-400'
            }`}
          >
            No
          </button>
        </div>

        {hasOffer && (
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-700">Their offer amount</label>
              <span className="text-sm font-semibold text-gray-900">${(companyOffer ?? 0).toLocaleString()}</span>
            </div>
            <input
              type="range" min={0} max={200000} step={1000}
              value={companyOffer ?? 0}
              onChange={e => onChange('companyOffer', Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#059669' }}
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>$0</span><span>$200,000</span>
            </div>
            {offerPct !== null && (
              <p className={`mt-2 text-xs leading-relaxed px-3 py-2 rounded border ${
                offerPct < 50
                  ? 'text-red-600 bg-red-50 border-red-200'
                  : 'text-gray-600 bg-gray-50 border-gray-200'
              }`}>
                {offerPct < 50 && '⚠ '}Their offer represents approximately {offerPct}% of your estimated claim value.
                {offerPct < 50 && ' This appears significantly below the estimated range for similar cases.'}
                {' '}Only a licensed attorney can confirm whether this offer is fair for your case.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
