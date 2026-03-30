import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact WorkerRight',
  description: "Contact our team for questions about workers' compensation calculations or our service.",
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact WorkerRight',
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main className="bg-white py-14 px-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ letterSpacing: '-0.5px' }}>
            Contact Us
          </h1>

          {/* Warning box */}
          <div
            className="rounded-lg p-4 mb-8"
            style={{ background: '#fffbeb', borderLeft: '3px solid #f59e0b' }}
          >
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              We are not a law firm and cannot provide legal advice or answer case-specific questions.
              For your specific claim, use our free attorney matching service.
            </p>
            <Link
              href="/calculator"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Get free attorney match →
            </Link>
          </div>

          {/* Contact info */}
          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Email</h2>
            <p className="text-sm text-gray-600 mb-1">
              <a href="mailto:info@getfairclaimpro.com" className="text-emerald-700 hover:underline font-medium">
                info@getfairclaimpro.com
              </a>
            </p>
            <p className="text-sm text-gray-500">
              We respond within 1 business day, Monday through Friday.
            </p>
          </section>

          {/* What we can and can't help with */}
          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">What we can help with</h2>
            <div className="space-y-2">
              {[
                { ok: true,  text: 'Calculator accuracy questions' },
                { ok: true,  text: 'Data source inquiries' },
                { ok: true,  text: 'Partnership and attorney network inquiries' },
                { ok: true,  text: 'Press and media inquiries' },
                { ok: false, text: 'Legal advice (please use our calculator instead)' },
                { ok: false, text: 'Case-specific questions about your claim' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-2">
                  <span className={`text-sm font-bold mt-0.5 flex-shrink-0 ${item.ok ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.ok ? '✓' : '✗'}
                  </span>
                  <span className={`text-sm ${item.ok ? 'text-gray-700' : 'text-gray-400'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              WorkerRight is not a law firm. Prior results do not guarantee similar outcomes.
              Attorney advertising.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
