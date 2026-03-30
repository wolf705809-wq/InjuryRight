import Link from 'next/link'
import type { Metadata } from 'next'
import { GUIDES } from '@/lib/guides-data'

export const metadata: Metadata = {
  title: "Workers' Comp Guides 2025 — Step-by-Step Help | WorkerRight",
  description: "Free workers' compensation guides written by attorneys. Learn how to file a claim, negotiate a settlement, appeal a denial, and understand your rights.",
  openGraph: {
    title: "Workers' Comp Guides 2025 — Step-by-Step Help | WorkerRight",
    description: "Free workers' compensation guides written by attorneys. Learn how to file a claim, negotiate a settlement, appeal a denial, and understand your rights.",
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  filing: 'Filing a Claim',
  settlement: 'Settlements',
  attorney: 'Attorneys',
  denial: 'Claim Denials',
  medical: 'Medical',
  disability: 'Disability Ratings',
  comparison: 'Know Your Rights',
}

export default function GuidesHubPage() {
  return (
    <main className="bg-white py-14 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-4">
            <span className="text-emerald-600">●</span>
            Attorney-Reviewed Guides
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ letterSpacing: '-0.5px' }}>
            Workers&apos; Compensation Guides
          </h1>
          <p className="text-base text-gray-500 max-w-2xl">
            Step-by-step guides written by licensed workers&apos; comp attorneys. Understand your rights,
            navigate the process, and maximize your settlement.
          </p>
        </div>

        {/* Guide cards grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {GUIDES.map(guide => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group border border-gray-200 hover:border-emerald-400 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 leading-snug">
                  {guide.title}
                </h2>
                <span className="text-gray-300 group-hover:text-emerald-400 text-xl flex-shrink-0 mt-0.5">→</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{guide.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {guide.sections.length} sections
                </span>
                <span className="text-[11px] text-gray-400">
                  {guide.faqItems.length} FAQs
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick nav */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <p className="text-sm font-semibold text-gray-800 mb-4">Jump to a topic</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'How to File', href: '/guides/how-to-file-workers-comp-claim' },
              { label: 'Settlements', href: '/guides/workers-comp-settlement-process' },
              { label: 'Need an Attorney?', href: '/guides/do-i-need-a-workers-comp-attorney' },
              { label: 'Claim Denied', href: '/guides/workers-comp-claim-denied' },
              { label: 'MMI Explained', href: '/guides/maximum-medical-improvement-guide' },
              { label: 'Impairment Ratings', href: '/guides/impairment-rating-explained' },
              { label: 'Workers Comp vs PI', href: '/guides/workers-comp-vs-personal-injury' },
              { label: 'Statistics', href: '/workers-comp-statistics' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="border border-gray-200 hover:border-emerald-400 rounded-lg px-3 py-2 text-center text-sm text-gray-700 hover:text-emerald-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
          <p className="text-lg font-semibold mb-2">Ready to calculate your settlement?</p>
          <p className="text-sm text-gray-400 mb-5">
            Use our free calculator for a personalized estimate based on your state, injury, and wages.
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Calculate my claim →
          </Link>
        </div>
      </div>
    </main>
  )
}
