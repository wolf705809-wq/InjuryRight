import Link from 'next/link'
import { FOOTER_DISCLAIMER } from '@/lib/compliance'
import { US_STATES } from '@/lib/pseo-data'

const TOP_STATES = US_STATES.slice(0, 5)

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Col 1: Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-2" style={{ letterSpacing: '-0.4px', fontSize: '18px' }}>
            <span style={{ color: '#111827', fontWeight: 700 }}>Worker</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>Right</span>
          </Link>
          <p className="text-[13px] text-gray-500 mb-3">Know your rights. Get what you&apos;re owed.</p>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            WorkerRight is not a law firm and does not provide legal advice. We connect workers with licensed attorneys. Attorney advertising. Prior results do not guarantee similar outcomes.
          </p>
        </div>

        {/* Col 2: Calculators */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Calculators</p>
          <ul className="space-y-2">
            <li><Link href="/calculator" className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">Workers&apos; Comp Calculator</Link></li>
            {TOP_STATES.map(s => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Resources */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Resources</p>
          <ul className="space-y-2">
            {[
              { href: '/calculator',                 label: 'How It Works' },
              { href: '/methodology',                label: 'Methodology' },
              { href: '/workers-comp-statistics',    label: "Workers' Comp Statistics" },
              { href: '/guides',                     label: 'Guides' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Legal</p>
          <ul className="space-y-2">
            {[
              { href: '/legal/privacy',             label: 'Privacy Policy' },
              { href: '/legal/terms',               label: 'Terms of Service' },
              { href: '/legal/disclaimer',          label: 'Disclaimer' },
              { href: '/legal/referral-disclosure', label: 'Referral Disclosure' },
              { href: '/legal/attorney-advertising',label: 'Attorney Advertising' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[12px] text-gray-500 hover:text-gray-800 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] text-gray-400 text-center leading-[1.7] mb-2">
            {FOOTER_DISCLAIMER}
          </p>
          <p className="text-[11px] text-gray-400 text-center">
            © {new Date().getFullYear()} WorkerRight · Not a law firm · Attorney advertising · Prior results do not guarantee similar outcomes.
          </p>
        </div>
      </div>
    </footer>
  )
}
