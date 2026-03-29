import Link from 'next/link'
import { US_STATES, INJURY_TYPES } from '@/lib/pseo-data'
import { USState, Industry, InjuryType } from '@/types'

interface Props {
  state: USState
  industry: Industry
  injury: InjuryType
}

export default function RelatedPages({ state, industry, injury }: Props) {
  const otherInjuries = INJURY_TYPES
    .filter(i => i.slug !== injury.slug)
    .slice(0, 5)

  const otherStates = US_STATES
    .filter(s => s.slug !== state.slug)
    .slice(0, 5)

  return (
    <section className="py-10 px-0 border-t border-gray-200 mt-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Other injuries in this state */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Other {state.name} Workers&apos; Comp Claims
          </p>
          <ul className="space-y-2">
            {otherInjuries.map(i => (
              <li key={i.slug}>
                <Link
                  href={`/${state.slug}/${industry.slug}/${i.slug}`}
                  className="text-sm text-emerald-700 hover:text-emerald-900 hover:underline"
                >
                  {i.name} in {state.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Same injury in other states */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
            {injury.name} in Other States
          </p>
          <ul className="space-y-2">
            {otherStates.map(s => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}/${industry.slug}/${injury.slug}`}
                  className="text-sm text-emerald-700 hover:text-emerald-900 hover:underline"
                >
                  {injury.name} in {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
