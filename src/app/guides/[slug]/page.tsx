import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { GUIDES } from '@/lib/guides-data'
import LegalReviewer from '@/components/SEO/LegalReviewer'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = GUIDES.find(g => g.slug === params.slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | WorkerRight`,
    description: guide.description,
    alternates: {
      canonical: `https://getfairclaimpro.com/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} | WorkerRight`,
      description: guide.description,
    },
  }
}

export default function GuidePage({ params }: Props) {
  const guide = GUIDES.find(g => g.slug === params.slug)
  if (!guide) notFound()

  const relatedGuides = GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: `https://getfairclaimpro.com/guides/${guide.slug}`,
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'WorkerRight Research Team',
      url: 'https://getfairclaimpro.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WorkerRight',
      url: 'https://getfairclaimpro.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, articleSchema]) }}
      />

      <main className="bg-white py-14 px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 flex gap-2 mb-8 flex-wrap">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-gray-600">Guides</Link>
            <span>/</span>
            <span>{guide.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-4">
              <span className="text-emerald-600">●</span>
              Attorney-Reviewed Guide
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ letterSpacing: '-0.5px' }}>
              {guide.title}
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">{guide.description}</p>
          </div>

          {/* Legal Reviewer */}
          <LegalReviewer />

          {/* Table of Contents */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
            <p className="text-sm font-semibold text-gray-800 mb-3">In this guide</p>
            <ol className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-emerald-600 font-semibold text-sm flex-shrink-0">{i + 1}.</span>
                  <a
                    href={`#section-${i}`}
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              {guide.faqItems.length > 0 && (
                <li className="flex gap-3">
                  <span className="text-emerald-600 font-semibold text-sm flex-shrink-0">{guide.sections.length + 1}.</span>
                  <a href="#faq" className="text-sm text-emerald-700 hover:underline">
                    Frequently Asked Questions
                  </a>
                </li>
              )}
            </ol>
          </div>

          {/* Main content sections */}
          <div className="space-y-12 mb-14">
            {guide.sections.map((section, i) => (
              <section key={i} id={`section-${i}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {i + 1}. {section.heading}
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Inline CTA */}
          <div
            className="rounded-xl p-6 mb-14 text-center"
            style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
          >
            <p className="text-base font-semibold text-gray-900 mb-2">
              Get your personalized settlement estimate
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Free calculator — takes 2 minutes. No obligation.
            </p>
            <Link
              href="/calculator"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Calculate my claim →
            </Link>
          </div>

          {/* FAQ Section */}
          {guide.faqItems.length > 0 && (
            <section id="faq" className="mb-14">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {guide.sections.length + 1}. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {guide.faqItems.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related guides */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related guides</h2>
            <div className="space-y-3">
              {relatedGuides.map(g => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="flex items-start gap-4 border border-gray-200 hover:border-emerald-400 rounded-xl p-4 group transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 mb-1">
                      {g.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{g.description}</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-emerald-400 text-lg flex-shrink-0 mt-0.5">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom disclaimer */}
          <div
            className="rounded-lg p-4 text-[11px] text-gray-400 leading-relaxed"
            style={{ background: '#fef9c3', borderLeft: '3px solid #f59e0b' }}
          >
            This guide is for informational purposes only and does not constitute legal advice.
            Workers&apos; compensation laws vary by state and change frequently. Consult a licensed
            attorney in your state for advice specific to your situation.
          </div>
        </div>
      </main>
    </>
  )
}
