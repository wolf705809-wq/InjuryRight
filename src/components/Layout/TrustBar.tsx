const STATS = [
  { value: '47',       label: 'States Covered',          sub: 'All continental US states' },
  { value: 'Network',  label: 'Licensed Attorney',        sub: 'In every covered state' },
  { value: '2 min',    label: 'Average Assessment',       sub: 'Free · no obligation' },
  { value: 'No Fee',   label: 'Unless You Win',           sub: 'Attorney contingency basis' },
]

export default function TrustBar() {
  return (
    <div className="border-y border-gray-200 bg-gray-50 py-6 px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-center">
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-[12px] font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
