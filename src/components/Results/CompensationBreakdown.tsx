import { CalculationResult } from '@/types'
import { formatUSD } from '@/lib/calculator-us'

interface Props { result: CalculationResult }

export default function CompensationBreakdown({ result }: Props) {
  const rows = [
    { label: 'TTD Benefits',     amount: result.ttd,             desc: 'Temporary Total Disability — lost wages' },
    { label: 'PPD Award',        amount: result.ppd,             desc: 'Permanent Partial Disability compensation' },
    { label: 'Medical Estimate', amount: result.medicalEstimate, desc: 'Expected treatment & rehabilitation costs' },
  ]

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--ink)]">Compensation Breakdown</h3>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {rows.map(row => (
          <div key={row.label} className="px-5 py-4 flex items-center justify-between bg-white">
            <div>
              <p className="text-sm font-medium text-[var(--ink)]">{row.label}</p>
              <p className="text-xs text-[var(--ink-3)] mt-0.5">{row.desc}</p>
            </div>
            <span className="font-mono font-semibold text-sm text-[var(--ink)]">{formatUSD(row.amount)}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 bg-[var(--warm)] border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">Estimated Settlement Range</p>
            <p className="text-xs text-[var(--ink-3)]">Before attorney fees &amp; deductions</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[var(--em)] font-mono">
              {formatUSD(result.totalLow)} – {formatUSD(result.totalHigh)}
            </p>
            <p className="text-[11px] text-[var(--ink-4)]">Weekly benefit: {formatUSD(result.weeklyBenefit)}/wk</p>
          </div>
        </div>
      </div>
    </div>
  )
}
