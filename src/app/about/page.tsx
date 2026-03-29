import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About WorkInjuryCalc | Workers' Comp Calculator",
  description: "WorkInjuryCalc helps injured workers understand their rights before speaking to an attorney. Free, transparent, and built on actual state workers' comp law.",
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About WorkInjuryCalc',
  publisher: {
    '@type': 'Organization',
    name: 'WorkInjuryCalc',
    url: 'https://workinjurycalc.com',
    foundingDate: '2025',
    areaServed: 'United States',
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <main className="bg-white py-14 px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ letterSpacing: '-0.5px' }}>
            About WorkInjuryCalc
          </h1>

          {/* Mission */}
          <section className="mb-10">
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              We built WorkInjuryCalc because injured workers often don&apos;t know what their claim is
              worth — and insurers count on that.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Our calculator uses the same formulas licensed workers&apos; compensation attorneys use to
              evaluate cases, made accessible to anyone, completely free.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              We cover all 47 states where private workers&apos; compensation claims can be made. (Ohio,
              Washington, and Wyoming operate exclusive state funds where private attorneys cannot
              assist with claims.)
            </p>
          </section>

          {/* Revenue transparency */}
          <section
            className="mb-10 rounded-lg p-5"
            style={{ background: '#f0fdf4', borderLeft: '3px solid #059669' }}
          >
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              How we make money — full transparency
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              When you choose to connect with an attorney through our service, we may receive a referral
              fee from that attorney. This fee is:
            </p>
            <ul className="space-y-1.5 mb-3">
              {[
                'Never charged to you',
                'Paid by the attorney from their contingency fee',
                'Does not affect the legal advice you receive',
                'Does not affect your settlement outcome',
                'Does not influence the information we provide',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-emerald-600 mt-0.5 flex-shrink-0">·</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              We disclose this because you have a right to know.{' '}
              <Link href="/legal/referral-disclosure" className="text-emerald-700 hover:underline">
                See our full Referral Fee Disclosure →
              </Link>
            </p>
          </section>

          {/* Who operates it */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Who operates this site</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              WorkInjuryCalc is operated by a team of legal researchers and former insurance industry
              professionals who understand how insurers value claims.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our attorney review network includes licensed workers&apos; compensation attorneys in all 47
              covered states who review our state-specific content for accuracy.
            </p>
          </section>

          {/* Team */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Our team</h2>
            <ul className="space-y-2">
              {[
                'Former insurance industry professionals who understand how insurers value claims',
                'Legal researchers with workers\' compensation expertise across all 47 covered states',
                'Licensed workers\' compensation attorneys who review and verify state-specific content',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-emerald-600 mt-0.5 flex-shrink-0">·</span> {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
            <p className="text-sm text-gray-600 mb-1">
              Email: <a href="mailto:info@workinjurycalc.com" className="text-emerald-700 hover:underline">info@workinjurycalc.com</a>
            </p>
            <p className="text-sm text-gray-500 mb-4">We respond within 1 business day, Monday through Friday.</p>
            <Link href="/contact" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              Contact us →
            </Link>
          </section>

          {/* Legal notice */}
          <section className="border-t border-gray-200 pt-6">
            <p className="text-[12px] text-gray-400 leading-relaxed">
              WorkInjuryCalc is not a law firm and does not provide legal advice. We connect injured
              workers with licensed attorneys. Attorney advertising. Prior results do not guarantee
              similar outcomes.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
