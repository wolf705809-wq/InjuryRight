import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About WorkerRight | Workers' Rights Calculator",
  description:
    "WorkerRight gives workers free access to the same legal formulas attorneys use — for workers' comp and wrongful termination claims across all 47 US states.",
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About WorkerRight',
  publisher: {
    '@type': 'Organization',
    name: 'WorkerRight',
    url: 'https://getfairclaimpro.com',
    foundingDate: '2025',
    areaServed: 'United States',
  },
}

const SERVICES = [
  {
    badge: 'WC',
    title: "Workers' compensation",
    desc: 'Injured at work? Calculate your TTD, PPD, and medical benefits across all 47 states.',
    href: '/calculator',
    cta: 'Calculate my claim →',
  },
  {
    badge: 'WT',
    title: 'Wrongful termination',
    desc: 'Unfairly fired or dismissed by an algorithm? Understand your rights across all 47 states.',
    href: '/calculator',
    cta: 'Check my case →',
  },
  {
    badge: 'GW',
    title: 'Gig worker rights',
    desc: 'Working for a delivery or rideshare platform? Platform workers may be entitled to employee benefits depending on their state and working arrangement.',
    href: '/calculator',
    cta: 'Check my status →',
  },
]

const STATS = [
  { v: '47',      l: 'States covered' },
  { v: '15,000+', l: 'State-specific calculator pages' },
  { v: 'Free',    l: 'Always — no sign-up, no hidden fees' },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <main className="bg-white py-14 px-8">
        <div className="max-w-2xl mx-auto">

          {/* H1 */}
          <h1
            className="font-bold text-gray-900 mb-10"
            style={{ fontSize: 'clamp(24px,4vw,40px)', maxWidth: '640px' }}
          >
            The legal system wasn&apos;t built for workers.<br />
            We&apos;re changing that.
          </h1>

          {/* Mission */}
          <section className="mb-10">
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Every year, millions of American workers are injured on the job, wrongfully terminated, or
              misclassified as contractors to avoid paying them benefits.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              When it happens, the clock starts immediately. Employers notify their insurers. Insurers assign
              adjusters trained to pay as little as possible. Platforms hide behind terms of service.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Workers are expected to navigate this alone — without knowing their rights, their deadlines,
              or what their case is worth.
            </p>

            {/* Emphasis box */}
            <div
              className="rounded-r-lg px-6 py-5 mb-6"
              style={{ background: '#f9fafb', borderLeft: '3px solid #059669' }}
            >
              <p className="text-base font-medium" style={{ color: '#111827' }}>
                WorkerRight exists to close that gap.
              </p>
            </div>

            <p className="text-base text-gray-600 leading-relaxed mb-4">
              We built free, state-specific calculators based on the same legal formulas attorneys use —
              for workers&apos; comp claims, wrongful termination, and gig worker misclassification.
              No sign-up. No sales pitch. Just your number, in 2 minutes.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              When you&apos;re ready to take action, we connect you with licensed attorneys in your state.
              They work on contingency — you pay nothing unless you win.
            </p>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {STATS.map(s => (
              <div key={s.v} className="rounded-xl p-5" style={{ background: '#f9fafb' }}>
                <p className="text-2xl font-bold text-emerald-600 mb-1">{s.v}</p>
                <p className="text-[12px] text-gray-500 leading-snug">{s.l}</p>
              </div>
            ))}
          </div>

          {/* What we cover */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">What WorkerRight covers</h2>
            <div className="grid gap-4">
              {SERVICES.map(s => (
                <div key={s.badge} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <span
                      className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
                      style={{ background: '#d1fae5', color: '#065f46' }}
                    >
                      {s.badge}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{s.desc}</p>
                      <Link href={s.href} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                        {s.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Revenue transparency */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How we make money — full transparency</h2>
            <div
              className="rounded-r-lg px-7 py-6 mb-4"
              style={{ background: '#f9fafb', borderLeft: '3px solid #059669' }}
            >
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                When you choose to connect with an attorney through WorkerRight, we may receive a referral fee
                paid by that attorney.
              </p>
              <p className="text-sm font-medium text-gray-900 mb-3">This fee is:</p>
              <ul className="space-y-2 mb-4">
                {[
                  'Never charged to you',
                  'Paid by the attorney from their contingency fee',
                  'Does not affect your attorney\'s fees',
                  'Does not affect your settlement outcome',
                  'Does not influence the information we provide',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-600 mt-0.5 flex-shrink-0">·</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">We tell you this because you deserve to know.</p>
            </div>
            <Link href="/legal/referral-disclosure" className="text-sm text-emerald-700 hover:underline">
              Read our full referral disclosure →
            </Link>
          </section>

          {/* Methodology — data sources */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Our data sources</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our content is based on publicly available data from the following authoritative sources:
            </p>
            <ul className="space-y-2">
              {[
                { label: 'State workers\u2019 compensation statutes (all 47 states)', href: 'https://www.ncci.com/pages/default.aspx' },
                { label: 'NCCI Workers Compensation Statistical Plan 2025', href: 'https://www.ncci.com/Articles/Pages/II_Insights_2025StateoftheLine.aspx' },
                { label: 'National Safety Council Injury Facts 2024', href: 'https://injuryfacts.nsc.org/' },
                { label: 'Bureau of Labor Statistics, Injuries, Illnesses, and Fatalities (IIF)', href: 'https://www.bls.gov/iif/' },
                { label: 'Individual state DWC annual reports', href: 'https://www.dir.ca.gov/dwc/dwc_home_page.htm' },
              ].map(({ label, href }) => (
                <li key={href} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#059669] font-bold mt-0.5 flex-shrink-0">·</span>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#059669] hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal notice */}
          <section
            className="rounded-lg p-4 mb-10"
            style={{ background: '#f9fafb' }}
          >
            <p className="text-[11px] text-gray-400 leading-[1.7]">
              WorkerRight is not a law firm and does not provide legal advice. We connect workers with licensed
              attorneys. Attorney advertising. Prior results do not guarantee similar outcomes. Always consult
              a licensed attorney for your specific situation.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-8 border border-gray-200 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to know what you&apos;re owed?</h2>
            <Link
              href="/calculator"
              className="inline-block text-white font-medium px-7 py-3 rounded-lg transition-opacity hover:opacity-90 mt-4 mb-3"
              style={{ background: '#059669' }}
            >
              Calculate my claim →
            </Link>
            <p className="text-[12px] text-gray-400">Free · 2 minutes · No obligation</p>
          </section>

        </div>
      </main>
    </>
  )
}
