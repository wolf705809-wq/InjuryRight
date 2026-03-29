import Link from 'next/link'
import { FOOTER_DISCLAIMER } from '@/lib/compliance'
import { US_STATES, INJURY_TYPES } from '@/lib/pseo-data'

const TOP_STATES   = US_STATES.slice(0, 10)
const TOP_INJURIES = INJURY_TYPES.slice(0, 10)

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* 4-column grid */}
      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Col 1: Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-3">
            <span className="text-base font-bold text-gray-900">Work</span>
            <span className="text-base font-bold text-emerald-600">InjuryCalc</span>
          </Link>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Free workers&apos; compensation estimates for 47 states. Not a law firm. Attorney advertising.
          </p>
        </div>

        {/* Col 2: States */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Top States</p>
          <ul className="space-y-2">
            {TOP_STATES.map(s => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Injuries */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Common Injuries</p>
          <ul className="space-y-2">
            {TOP_INJURIES.map(i => (
              <li key={i.slug}>
                <Link href={`/injuries/${i.slug}`} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Legal</p>
          <ul className="space-y-2">
            {[
              { href: '/legal/privacy',    label: 'Privacy Policy' },
              { href: '/legal/terms',      label: 'Terms of Service' },
              { href: '/legal/disclaimer', label: 'Disclaimer' },
              { href: '/calculator',       label: 'Free Calculator' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Attorney Disclosure</p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Results shown are estimates only. Prior results do not guarantee similar outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] text-gray-400 text-center leading-[1.7] mb-2">
            {FOOTER_DISCLAIMER}
          </p>
          <p className="text-[11px] text-gray-400 text-center">
            © {new Date().getFullYear()} WorkInjuryCalc · Attorney advertising. Not a law firm.{' '}
            <Link href="/legal/disclaimer" className="hover:text-gray-600 underline">See disclaimer.</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
