import { USState } from '@/types'

interface Props {
  state: USState
}

export default function StateLawBlock({ state }: Props) {
  return (
    <div
      className="rounded-lg px-6 py-5 my-6"
      style={{ background: '#f9fafb', borderLeft: '3px solid #059669' }}
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        {state.name} Workers&apos; Comp — Key Legal Facts
      </h3>

      <div className="space-y-2.5">
        {state.statute && (
          <div className="flex flex-wrap gap-x-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[160px]">Governing law:</span>
            {state.statLink ? (
              <a
                href={state.statLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {state.statute} ↗
              </a>
            ) : (
              <span className="text-gray-700">{state.statute}</span>
            )}
          </div>
        )}

        {state.regulator && (
          <div className="flex flex-wrap gap-x-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[160px]">Regulated by:</span>
            {state.regulatorLink ? (
              <a
                href={state.regulatorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {state.regulator} ↗
              </a>
            ) : (
              <span className="text-gray-700">{state.regulator}</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-x-2 text-sm">
          <span className="text-gray-500 font-medium min-w-[160px]">TTD benefit rate:</span>
          <span className="text-gray-700">{(state.ttdRate * 100).toFixed(0)}% of average weekly wage</span>
        </div>

        <div className="flex flex-wrap gap-x-2 text-sm">
          <span className="text-gray-500 font-medium min-w-[160px]">Max weekly benefit:</span>
          <span className="text-gray-700">${state.maxWeeklyBenefit.toLocaleString()}/week</span>
        </div>

        {state.reportingDays != null && (
          <div className="flex flex-wrap gap-x-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[160px]">Report to employer:</span>
            <span className="text-gray-700">Within {state.reportingDays} days of injury</span>
          </div>
        )}

        <div className="flex flex-wrap gap-x-2 text-sm">
          <span className="text-gray-500 font-medium min-w-[160px]">File claim by:</span>
          <span className="text-gray-700">{state.sol}</span>
        </div>

        <div className="flex flex-wrap gap-x-2 text-sm">
          <span className="text-gray-500 font-medium min-w-[160px]">Missing deadline:</span>
          <span className="text-red-600 font-medium">Permanently bars your claim</span>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-200">
        Verified January 2025 · Source:{' '}
        {state.regulatorLink ? (
          <a href={state.regulatorLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {state.regulator}
          </a>
        ) : (
          state.regulator ?? `${state.name} Workers' Compensation Authority`
        )}
      </p>
    </div>
  )
}
