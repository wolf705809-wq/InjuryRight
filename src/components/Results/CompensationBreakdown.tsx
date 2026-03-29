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
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Compensation Breakdown</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {rows.map(row => (
          <div key={row.label} className="px-5 py-4 flex items-center justify-between bg-white">
            <div>
              <p className="text-sm font-medium text-gray-900">{row.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{row.desc}</p>
            </div>
            <span className="font-mono font-semibold text-sm text-gray-900">{formatUSD(row.amount)}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Estimated Settlement Range</p>
            <p className="text-xs text-gray-500">Before attorney fees &amp; deductions</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600 font-mono">
              {formatUSD(result.totalLow)} – {formatUSD(result.totalHigh)}
            </p>
            <p className="text-[11px] text-gray-400">Weekly benefit: {formatUSD(result.weeklyBenefit)}/wk</p>
          </div>
        </div>
      </div>
    </div>
  )
}
