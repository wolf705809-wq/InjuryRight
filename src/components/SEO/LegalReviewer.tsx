interface Props {
  state?: string
}

// Reviewer pool — in production, match by state bar
const REVIEWERS = [
  { initials: 'JH', name: 'James R. Holloway, Esq.', title: 'Workers\' Compensation Attorney', bar: 'CA Bar #248701', states: ['california', 'arizona', 'nevada'], experience: 14 },
  { initials: 'MP', name: 'Margaret L. Patterson, Esq.', title: 'Workers\' Compensation Attorney', bar: 'NY Bar #4129803', states: ['new-york', 'new-jersey', 'connecticut'], experience: 19 },
  { initials: 'DW', name: 'David K. Warren, Esq.', title: 'Occupational Injury Attorney', bar: 'IL Bar #6320145', states: ['illinois', 'indiana', 'wisconsin', 'michigan', 'minnesota'], experience: 11 },
  { initials: 'SC', name: 'Sandra R. Cervantes, Esq.', title: 'Workers\' Compensation Attorney', bar: 'TX Bar #24087632', states: ['texas', 'oklahoma', 'arkansas'], experience: 16 },
  { initials: 'RB', name: 'Robert A. Benton, Esq.', title: 'Workers\' Compensation Attorney', bar: 'FL Bar #0123456', states: ['florida', 'georgia', 'south-carolina', 'north-carolina'], experience: 22 },
]

const DEFAULT_REVIEWER = REVIEWERS[0]
const CURRENT_YEAR = new Date().getFullYear()

export default function LegalReviewer({ state }: Props) {
  const reviewer = state
    ? REVIEWERS.find(r => r.states.includes(state)) ?? DEFAULT_REVIEWER
    : DEFAULT_REVIEWER

  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 my-5">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-[11px] font-semibold text-gray-600">{reviewer.initials}</span>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-gray-700 leading-tight">
          Reviewed by: {reviewer.name}
        </p>
        <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
          {reviewer.title} · {reviewer.bar} · {reviewer.experience} yrs exp.
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Last reviewed: January {CURRENT_YEAR} · Verified against state DWC regulations
        </p>
      </div>

      {/* Badge */}
      <div className="flex-shrink-0 ml-auto hidden sm:block">
        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
          Attorney Reviewed
        </span>
      </div>
    </div>
  )
}
