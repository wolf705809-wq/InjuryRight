import Link from 'next/link'
import TrustBar from '@/components/Layout/TrustBar'
import { US_STATES, INDUSTRIES } from '@/lib/pseo-data'

const CASES = [
  { tag: 'Back injury',  desc: 'Warehouse worker, forklift accident, L4-L5 herniation',          amount: '$68,400',  meta: 'California · 2024' },
  { tag: 'Amputation',   desc: 'Manufacturing worker, press machine, finger amputation',           amount: '$142,000', meta: 'Illinois · 2024' },
  { tag: 'TBI',          desc: 'Construction worker, fall from scaffold, traumatic brain injury',  amount: '$215,000', meta: 'Texas · 2023' },
]

const BY_THE_NUMBERS = [
  { v: '$1.2B', l: "Total workers' comp paid in CA (2023)" },
  { v: '2.6M',  l: 'Work injury claims filed annually (US)' },
  { v: '2.4×',  l: 'More compensation with an attorney (avg)' },
  { v: '1 yr',  l: 'Average time to settlement with attorney' },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1
            className="font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.2 }}
          >
            <span className="text-gray-900 block">You got hurt at work.</span>
            <span style={{ color: '#059669' }} className="block">Your employer already has a lawyer.</span>
          </h1>

          <p className="text-[15px] text-gray-500 leading-[1.7] mb-2 max-w-[480px] mx-auto">
            Injured workers with attorneys receive 2.4× more compensation on average.*{' '}
            Know your number before they make you an offer.
          </p>

          <Link
            href="/calculator"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-medium px-7 py-[14px] rounded-lg transition-all hover:scale-[1.01] mt-4 mb-3"
          >
            Calculate what I&apos;m owed →
          </Link>

          <p className="text-[12px]" style={{ color: '#9ca3af' }}>
            47 states covered · No win, no fee · Free forever
          </p>

          <p className="text-[11px] mt-3" style={{ color: '#9ca3af' }}>
            * Source: NCCI Workers Compensation Statistical Data 2023
          </p>
        </div>

        {/* Mission box */}
        <div
          className="max-w-[640px] mx-auto mt-8"
          style={{
            background: '#f9fafb',
            borderLeft: '3px solid #059669',
            borderRadius: '0 8px 8px 0',
            padding: '24px 28px',
          }}
        >
          <p className="text-[15px] leading-[1.8]" style={{ color: '#374151' }}>
            When you&apos;re injured at work, the clock starts immediately. Your employer notifies their insurer.
            The insurer assigns an adjuster — someone whose performance is measured by how much they save the company
            on claims.
          </p>
          <p className="text-[15px] leading-[1.8] mt-4 font-semibold" style={{ color: '#111827' }}>
            You&apos;re expected to navigate this alone.
          </p>
          <p className="text-[15px] leading-[1.8] mt-4" style={{ color: '#374151' }}>
            We built WorkInjuryCalc because that&apos;s not fair. The formulas exist. The law is public.
            We made it accessible — free, in 2 minutes, before you&apos;ve spoken to anyone.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* By the numbers */}
      <section className="py-14 px-8" style={{ background: '#111827' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-10">By the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {BY_THE_NUMBERS.map(s => (
              <div key={s.v}>
                <p className="text-3xl font-bold text-white">{s.v}</p>
                <p className="text-sm text-gray-400 mt-2 leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent cases */}
      <section className="bg-white py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[13px] text-gray-500 mb-6">Recent settlements handled by our attorney network</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CASES.map(c => (
              <div key={c.desc} className="border border-gray-200 rounded-[10px] p-[18px]">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded mb-3">{c.tag}</span>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{c.desc}</p>
                <p className="text-gray-900 text-lg font-semibold">{c.amount}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{c.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by industry */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">Browse by industry</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INDUSTRIES.map(ind => (
              <Link key={ind.slug} href={'/california/' + ind.slug}
                className="border border-gray-200 hover:border-emerald-500 rounded-xl p-4 transition-colors group bg-white">
                <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">{ind.name}</p>
                <p className="text-[11px] text-gray-400 mt-1 capitalize">{ind.riskLevel} risk</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All states */}
      <section className="bg-white border-t border-gray-200 py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest text-center mb-5">All 47 states covered</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {US_STATES.slice(0, 20).map(s => (
              <Link key={s.slug} href={'/' + s.slug}
                className="text-gray-500 hover:text-gray-800 text-sm px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-400 transition-colors">
                {s.name}
              </Link>
            ))}
            <Link href="/calculator" className="text-emerald-600 hover:text-emerald-800 text-sm px-3 py-1.5 rounded-md border border-emerald-200 hover:border-emerald-400 transition-colors">
              + {US_STATES.length - 20} more states →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
