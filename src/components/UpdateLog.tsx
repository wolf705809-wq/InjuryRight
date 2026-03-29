import { UPDATE_LOG } from '@/lib/update-log'

interface Props {
  state: string
  stateName: string
}

export default function UpdateLog({ state, stateName }: Props) {
  const entries = UPDATE_LOG.filter(e => e.state === state)
  if (entries.length === 0) return null

  return (
    <div className="mt-8">
      <p className="text-[13px] font-medium text-gray-700 mb-3">
        Benefit Rate History — {stateName}
      </p>
      <div className="divide-y divide-gray-100">
        {entries.map((e, i) => (
          <div key={i} className="py-2.5 grid grid-cols-[80px_1fr_auto] gap-3 items-start">
            <span className="text-[12px] text-gray-400">{e.date}</span>
            <span className="text-[12px] text-gray-600">{e.change}</span>
            <a
              href={e.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-600 hover:underline whitespace-nowrap"
            >
              {e.source} ↗
            </a>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        Rates updated quarterly or upon legislative change
      </p>
    </div>
  )
}
