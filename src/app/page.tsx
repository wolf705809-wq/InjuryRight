import Link from 'next/link'
import TrustBar from '@/components/Layout/TrustBar'
import CalculatorForm from '@/components/Calculator/CalculatorForm'
import { US_STATES, INDUSTRIES } from '@/lib/pseo-data'

const CASES = [
  { tag: 'Back injury',  desc: 'Warehouse worker, forklift accident, L4-L5 herniation',     amount: '$68,400',  meta: 'California · 2024' },
  { tag: 'Amputation',   desc: 'Manufacturing worker, press machine, finger amputation',      amount: '$142,000', meta: 'Illinois · 2024' },
  { tag: 'TBI',          desc: 'Construction worker, fall from scaffold, traumatic brain injury', amount: '$215,000', meta: 'Texas · 2023' },
]

const BY_THE_NUMBERS = [
  { v: '$1.2B', l: "Total workers' comp paid in CA (2023)" },
  { v: '2.6M',  l: 'Work injury claims filed annually (US)' },
  { v: '68%',   l: 'Workers who hire attorneys get higher settlements' },
  { v: '1 yr',  l: 'Average time to settlement with attorney' },
]

export default function HomePage() {
  return (
    <main>
      {/* Split Hero */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-[12px] text-gray-500 mb-5">Workers&apos; Compensation · 47 States</p>
            <h1
              className="font-bold text-gray-900 leading-tight mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.8px' }}
            >
              Find out what your work injury claim is worth.
            </h1>
            <p className="text-base text-gray-500 leading-[1.7] mb-7 max-w-[440px]">
              State-specific calculator based on actual workers&apos; comp law.
              Reviewed by licensed attorneys.
            </p>
            <Link
              href="/calculator"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-medium px-7 py-[14px] rounded-lg transition-colors"
            >
              Calculate my compensation →
            </Link>
            <p className="text-[12px] text-gray-400 mt-3">Free · No obligation · Results in 90 seconds</p>
          </div>

          {/* Right: Data Cards */}
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-xl p-5" style={{ borderLeft: '3px solid #059669' }}>
              <p className="text-[12px] text-gray-500 mb-1">Average Settlement</p>
              <p className="text-[28px] font-bold text-gray-900 leading-none">$42,000</p>
              <p className="text-[12px] text-gray-400 mt-1.5">Across all 47 states (2024)</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5" style={{ borderLeft: '3px solid #059669' }}>
              <p className="text-[12px] text-gray-500 mb-1">Top State Payout</p>
              <p className="text-[28px] font-bold text-gray-900 leading-none">$95,000</p>
              <p className="text-[12px] text-gray-400 mt-1.5">California — highest avg. settlement</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-[12px] text-gray-500 mb-1">Claim Deadline</p>
              <p className="text-[28px] font-bold text-red-600 leading-none">1–3 yrs</p>
              <p className="text-[12px] text-gray-400 mt-1.5">Varies by state — check yours now</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Calculator — Split Layout */}
      <section className="bg-gray-50 py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-medium text-emerald-600 tracking-[0.08em] uppercase text-center mb-2">Free Workers&apos; Comp Calculator</p>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">What&apos;s your case worth?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-7">
              <CalculatorForm />
            </div>
            {/* Right: Blurred Preview */}
            <div className="bg-white border border-gray-200 rounded-xl p-7 relative overflow-hidden hidden md:block">
              <div className="blur-sm select-none pointer-events-none">
                <p className="text-[11px] text-gray-500 mb-2">Your estimated range</p>
                <p className="text-4xl font-bold text-gray-900 font-mono">$── ── ──</p>
                <div className="mt-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">TTD Benefits</span>
                    <span className="text-sm font-semibold text-gray-900">$──,───</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">PPD Benefits</span>
                    <span className="text-sm font-semibold text-gray-900">$──,───</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Medical Costs</span>
                    <span className="text-sm font-semibold text-gray-900">$──,───</span>
                  </div>
                </div>
                <div className="mt-5 h-2 bg-gray-200 rounded-full w-full">
                  <div className="h-2 bg-emerald-600 rounded-full w-2/3"></div>
                </div>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <p className="text-sm text-gray-500 mt-3 text-center max-w-[160px] leading-relaxed">
                  Complete the calculator to see your estimate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the numbers — Dark Section */}
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
