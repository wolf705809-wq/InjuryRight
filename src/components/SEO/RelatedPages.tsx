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
    .filter(i => i.slug !== injury.slug && industry.commonInjuries.includes(i.slug))
    .slice(0, 3)

  const fallbackInjuries = INJURY_TYPES
    .filter(i => i.slug !== injury.slug)
    .slice(0, 3)

  const displayInjuries = otherInjuries.length >= 2 ? otherInjuries : fallbackInjuries

  const otherStates = US_STATES
    .filter(s => s.slug !== state.slug)
    .slice(0, 3)

  return (
    <section className="pt-10 border-t border-[#e5e7eb] mt-4 space-y-10">

      {/* Other injuries in same industry/state — emerald cards */}
      <div>
        <p className="text-[11px] font-medium text-[#059669] uppercase tracking-[0.09em] mb-4">
          Other {industry.name} injuries in {state.name}:
        </p>
        <div className="grid gap-3">
          {displayInjuries.map(i => (
            <Link
              key={i.slug}
              href={`/${state.slug}/${industry.slug}/${i.slug}`}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#059669] transition-colors hover:bg-[#f0fdf4]"
              style={{ border: '1px solid #059669' }}
            >
              {i.name} workers&apos; comp settlements in {state.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Same injury in other states */}
      <div>
        <p className="text-[11px] font-medium text-[#6b7280] uppercase tracking-[0.09em] mb-4">
          {injury.name} workers&apos; comp in other states:
        </p>
        <div className="grid gap-2">
          {otherStates.map(s => (
            <Link
              key={s.slug}
              href={`/${s.slug}/${industry.slug}/${injury.slug}`}
              className="text-sm text-[#374151] hover:text-[#059669] hover:underline"
            >
              {s.name} {industry.name} {injury.name.toLowerCase()} workers&apos; comp
            </Link>
          ))}
        </div>
      </div>

      {/* Calculator CTA link */}
      <div>
        <Link
          href={`/calculator`}
          className="inline-block bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          style={{ transform: 'scale(1)' }}
        >
          Calculate My {state.name} Workers&apos; Comp
        </Link>
      </div>

    </section>
  )
}
