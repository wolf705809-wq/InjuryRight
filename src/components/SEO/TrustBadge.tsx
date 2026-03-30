interface Props {
  state?: string
  isReviewed?: boolean
}

export default function TrustBadge({ state, isReviewed = false }: Props) {
  const updated = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="flex flex-wrap gap-2 mb-5">

      {/* Badge 1: Updated date */}
      <span className="flex items-center gap-1.5 px-[10px] py-1 text-[11px] text-[#6b7280] rounded-[6px]"
        style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <rect x="1" y="2" width="10" height="9" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
          <path d="M4 1v2M8 1v2M1 5h10" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Updated {updated}
      </span>

      {/* Badge 2: Data sources */}
      <span className="flex items-center gap-1.5 px-[10px] py-1 text-[11px] text-[#6b7280] rounded-[6px]"
        style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <ellipse cx="6" cy="3.5" rx="4.5" ry="2" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
          <path d="M1.5 3.5v2c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-2" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
          <path d="M1.5 7.5v1c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-1" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
        </svg>
        Sources: NCCI, BLS{state ? `, ${state.toUpperCase()} DWC` : ', State DWC'}
      </span>

      {/* Badge 3: Attorney reviewed (conditional) */}
      {isReviewed && (
        <span className="flex items-center gap-1.5 px-[10px] py-1 text-[11px] text-[#6b7280] rounded-[6px]"
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1L1.5 3v3.5C1.5 9 3.5 10.8 6 11.5c2.5-.7 4.5-2.5 4.5-5V3L6 1z" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
            <path d="M4 6l1.5 1.5L8 4.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Attorney reviewed
        </span>
      )}

      {/* Badge 4: Estimates only */}
      <span className="flex items-center gap-1.5 px-[10px] py-1 text-[11px] text-[#6b7280] rounded-[6px]"
        style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <rect x="2" y="1.5" width="8" height="9" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="none"/>
          <path d="M4 4h4M4 6h4M4 8h2.5" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Estimates only — not legal advice
      </span>

    </div>
  )
}
