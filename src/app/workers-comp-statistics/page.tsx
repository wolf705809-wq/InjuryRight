'use client'

import Link from 'next/link'
import { useState } from 'react'
import { INJURY_COST_DATA, STATE_BENEFIT_RATES_2025 } from '@/lib/statistics-data'

const CITATION_TEXT = `WorkerRight. (2025). Workers' Compensation Statistics 2025: Settlement Averages, Claim Costs & State Data. Retrieved from https://getfairclaimpro.com/workers-comp-statistics. Primary sources: NCCI, NSC, BLS.`

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Workers Compensation Statistics 2025',
  description: "Annual workers compensation settlement data, claim costs, and benefit rates compiled from NCCI, BLS, and NSC public data.",
  url: 'https://getfairclaimpro.com/workers-comp-statistics',
  creator: { '@type': 'Organization', name: 'WorkerRight', url: 'https://getfairclaimpro.com' },
  temporalCoverage: '2022/2025',
  spatialCoverage: 'United States',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  citation: [
    'NCCI Workers Compensation Statistical Plan 2025',
    'National Safety Council Injury Facts 2024',
    'Bureau of Labor Statistics, IIF 2024',
  ],
}

// Key findings data
const KEY_STATS = [
  {
    number: '$47,316',
    label: "Average cost per workers' comp claim (2022–23)",
    source: 'NCCI Workers Compensation Statistical Plan, via NSC Injury Facts 2024',
    color: '#059669',
  },
  {
    number: '$44,179',
    label: "Average workers' comp settlement (2024)",
    source: 'National Safety Council, Injury Facts 2024',
    color: '#059669',
  },
  {
    number: '$91,433',
    label: 'Average cost — motor vehicle crash injuries',
    source: 'NCCI via NSC Injury Facts 2024 · Highest of all injury causes',
    color: '#10b981',
  },
  {
    number: '+6%',
    label: 'Indemnity claim severity increase (2024)',
    source: 'NCCI 2025 State of the Line Report · Medical severity also +6%',
    color: '#059669',
  },
  {
    number: '$41.6B',
    label: 'Total workers\' comp premiums paid (2024)',
    source: 'NCCI 2025 State of the Line Report',
    color: '#059669',
  },
]

// Trend cards
const TRENDS = [
  {
    dir: 'up',
    title: 'Medical severity: +6% in 2024',
    body: 'After moderate growth in 2022–2023, medical claim severity accelerated in 2024. NCCI projects continued pressure from healthcare inflation through 2026.',
    source: 'NCCI 2025 State of the Line',
    alert: null,
  },
  {
    dir: 'down',
    title: 'Claim frequency: -6% in 2024',
    body: 'Lost-time claim frequency has declined for two decades. The shift to remote work post-2020 accelerated this trend among office workers.',
    source: 'NCCI 2025 State of the Line',
    alert: null,
  },
  {
    dir: 'up',
    title: 'Indemnity severity: +6% in 2024',
    body: 'Wage replacement costs rose faster than the long-term average in 2024, driven by wage growth and increased claim duration in complex cases.',
    source: 'NCCI 2025 State of the Line',
    alert: null,
  },
  {
    dir: 'stable',
    title: 'System profitability: 86% combined ratio',
    body: "The workers' comp insurance industry posted its 8th consecutive year with a combined ratio under 90% — meaning insurers collect significantly more than they pay out.",
    source: 'NCCI 2025 State of the Line',
    alert: 'This is why insurers negotiate aggressively.',
  },
]

const SOURCES = [
  {
    n: 1,
    text: 'NCCI. (2025). State of the Line Guide 2025. National Council on Compensation Insurance.',
    url: 'https://www.ncci.com/',
  },
  {
    n: 2,
    text: "National Safety Council. (2024). Workers' Compensation Costs. Injury Facts.",
    url: 'https://injuryfacts.nsc.org/work/costs/workers-compensation-costs/',
  },
  {
    n: 3,
    text: "National Safety Council. (2024). Workers' Compensation Costs — Average Settlement.",
    url: 'https://injuryfacts.nsc.org/',
  },
  {
    n: 4,
    text: 'Bureau of Labor Statistics. (2024). Injuries, Illnesses, and Fatalities. U.S. Department of Labor.',
    url: 'https://www.bls.gov/iif/',
  },
  {
    n: 5,
    text: "National Academy of Social Insurance. (2024). Workers' Compensation: Benefits, Coverage, and Costs, February 2024.",
    url: 'https://www.nasi.org/',
  },
]

export default function WorkersCompStatisticsPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CITATION_TEXT)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <main>

        {/* 1 — HERO */}
        <section className="section-white">
          <div className="section-inner">
            <p className="eyebrow mb-5">2025 Annual Report · Updated October 2025</p>
            <h1
              className="serif font-bold leading-[1.12] mb-0"
              style={{ fontSize: 'clamp(28px,5vw,42px)', letterSpacing: '-0.04em', color: '#111827' }}
            >
              Workers&apos; Compensation in America:
              <br />
              What the Data Actually Shows
            </h1>
            <div className="em-divider" />
            <p className="text-[16px] text-[#374151] leading-[1.8] max-w-[560px]">
              We compiled workers&apos; compensation settlement data, claim costs, and benefit rates from
              NCCI, the National Safety Council, and the Bureau of Labor Statistics. This page is updated
              annually and is free to cite for non-commercial purposes.
            </p>
            <div className="flex flex-wrap gap-6 mt-5 pt-5 border-t border-[#e5e7eb]">
              {[
                'Last updated: October 2025',
                'Data period: 2022–2024',
                'Primary source: NCCI, NSC, BLS',
                'Free to cite with attribution',
              ].map(item => (
                <span key={item} className="text-[12px] text-[#6b7280]">{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — KEY FINDINGS (Dark) */}
        <section className="section-dark">
          <div className="section-inner">
            <p className="eyebrow mb-4">Key findings — 2022–2024 data</p>
            <h2
              className="serif font-bold text-white mb-8"
              style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
            >
              Five numbers every injured worker should know
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KEY_STATS.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-[10px] p-5 ${i === 4 ? 'sm:col-span-2' : ''}`}
                  style={{ background: '#1a2235' }}
                >
                  <span className="stat-number mb-3" style={{ color: s.color }}>{s.number}</span>
                  <p className="text-[13px] text-[#9ca3af] leading-snug mt-3 mb-1">{s.label}</p>
                  <p className="text-[10px] text-[#4b5563]">Source: {s.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — INJURY COST TABLE */}
        <section className="section-white">
          <div className="section-inner">
            <p className="eyebrow mb-4">Claim costs by cause of injury</p>
            <h2
              className="serif font-bold text-[#111827] mb-2"
              style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
            >
              What your injury type costs — and what that means for your settlement
            </h2>
            <p className="text-[13px] text-[#6b7280] mb-6 leading-relaxed">
              NCCI data from accidents occurring in 2022–2023, valued as of October 2025. These are average
              total claim costs, not settlement amounts.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Cause of Injury', 'Avg Claim Cost', 'vs. Overall Avg', 'Note', 'Source'].map(col => (
                      <th
                        key={col}
                        className="text-left text-[11px] text-[#6b7280] font-medium uppercase tracking-wide"
                        style={{ padding: '10px 16px' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INJURY_COST_DATA.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '0.5px solid #e5e7eb',
                        background: row.baseline ? '#f0fdf4' : row.estimated ? '#f9fafb' : 'white',
                      }}
                    >
                      <td className="text-[13px] text-[#111827]" style={{ padding: '12px 16px', fontWeight: row.baseline ? 600 : 400 }}>
                        {row.cause}
                      </td>
                      <td className="text-[13px] text-[#111827] font-semibold" style={{ padding: '12px 16px' }}>
                        ${row.avgCost.toLocaleString()}
                      </td>
                      <td
                        className="text-[13px] font-medium"
                        style={{
                          padding: '12px 16px',
                          color: row.vsAverage === '—' ? '#9ca3af' : row.vsAverage.startsWith('+') ? '#059669' : '#dc2626',
                        }}
                      >
                        {row.vsAverage}
                      </td>
                      <td className="text-[12px] text-[#6b7280]" style={{ padding: '12px 16px' }}>
                        {row.note}
                        {row.estimated && (
                          <span className="ml-2 text-[10px] text-[#9ca3af] bg-[#f3f4f6] px-1.5 py-0.5 rounded">(est.)</span>
                        )}
                      </td>
                      <td className="text-[11px] text-[#9ca3af]" style={{ padding: '12px 16px' }}>
                        {row.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4 — TREND ANALYSIS (Warm) */}
        <section className="section-warm">
          <div className="section-inner">
            <p className="eyebrow mb-4">Trend analysis 2020–2024</p>
            <h2
              className="serif font-bold text-[#111827] mb-8"
              style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
            >
              Workers&apos; comp costs are rising.
              <br />
              Here&apos;s what the data shows.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TRENDS.map((t, i) => (
                <div key={i} className="bg-white border border-[#e5e7eb] rounded-[10px] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {t.dir === 'up' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#059669] shrink-0">
                        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {t.dir === 'down' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#0284c7] shrink-0">
                        <path d="M8 4v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {t.dir === 'stable' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#9ca3af] shrink-0">
                        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                    <p className="text-[13px] font-semibold text-[#111827]">{t.title}</p>
                  </div>
                  <p className="text-[13px] text-[#374151] leading-[1.7] mb-2">{t.body}</p>
                  <p className="text-[11px] text-[#9ca3af]">Source: {t.source}</p>
                  {t.alert && (
                    <p className="text-[12px] font-medium text-[#dc2626] mt-2">{t.alert}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — STATE BENEFIT RATES */}
        <section className="section-white">
          <div className="section-inner">
            <p className="eyebrow mb-4">State benefit rates — 2025</p>
            <h2
              className="serif font-bold text-[#111827] mb-2"
              style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
            >
              What your state actually pays
            </h2>
            <p className="text-[13px] text-[#6b7280] mb-6 leading-relaxed">
              TTD (Temporary Total Disability) rates are set by state law. These are the legal minimums and
              maximums — not settlement amounts.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['State', 'TTD Rate', 'Max Weekly', 'Min Weekly', 'Filing Deadline', 'Governing Statute'].map(col => (
                      <th
                        key={col}
                        className="text-left text-[11px] text-[#6b7280] font-medium uppercase tracking-wide"
                        style={{ padding: '10px 16px' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STATE_BENEFIT_RATES_2025.map((row, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '0.5px solid #e5e7eb' }}
                      className="hover:bg-[#f9fafb]"
                    >
                      <td className="text-[13px] font-medium text-[#111827]" style={{ padding: '12px 16px' }}>
                        <Link href={`/${row.slug}`} className="text-[#059669] hover:underline">
                          {row.state}
                        </Link>
                        {row.note && (
                          <span className="block text-[10px] text-[#9ca3af] mt-0.5">{row.note}</span>
                        )}
                      </td>
                      <td className="text-[13px] text-[#374151] font-medium" style={{ padding: '12px 16px' }}>
                        {row.ttdRate}
                      </td>
                      <td className="text-[13px] text-[#374151]" style={{ padding: '12px 16px' }}>
                        ${row.maxWeekly.toLocaleString()}
                      </td>
                      <td className="text-[13px] text-[#374151]" style={{ padding: '12px 16px' }}>
                        {row.minWeekly > 0 ? `$${row.minWeekly.toLocaleString()}` : '—'}
                      </td>
                      <td className="text-[13px] text-[#374151]" style={{ padding: '12px 16px' }}>
                        {row.sol}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <a
                          href={row.statLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#059669] hover:underline"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {row.statute}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#9ca3af] mt-4 leading-relaxed">
              Rates shown are for 2025. Always verify current rates with your state&apos;s Division of Workers&apos;
              Compensation.
            </p>
            <Link href="/calculator" className="inline-block mt-4 text-[13px] text-[#059669] hover:underline font-medium">
              View all 47 states →
            </Link>
          </div>
        </section>

        {/* 6 — METHODOLOGY (Warm) */}
        <section className="section-warm">
          <div className="section-inner">
            <p className="eyebrow mb-4">Methodology</p>
            <h2
              className="serif font-bold text-[#111827] mb-0"
              style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
            >
              How we compiled this data
            </h2>
            <div className="em-divider" />
            <div className="space-y-5">
              <p className="text-[15px] text-[#374151] leading-[1.9]">
                The settlement and claim cost figures on this page are drawn from publicly available data
                published by the National Council on Compensation Insurance (NCCI), the National Safety
                Council (NSC), and the U.S. Bureau of Labor Statistics (BLS). We do not conduct
                independent surveys.
              </p>
              <p className="text-[15px] text-[#374151] leading-[1.9]">
                Benefit rates (TTD maximums, minimums, and rates) are drawn from state workers&apos;
                compensation statutes and annual administrative updates. We update these figures annually.
                State-specific benefit rates change each year — always verify with your state&apos;s
                Division of Workers&apos; Compensation.
              </p>
              <p className="text-[15px] text-[#374151] leading-[1.9]">
                Some figures marked &ldquo;(estimated)&rdquo; represent our analysis of available data
                where primary sources do not publish figures at the required level of granularity. These
                are clearly labeled and should be treated as approximations.
              </p>
              <p className="text-[12px] text-[#9ca3af]">Last reviewed: October 2025</p>
            </div>

            {/* Sources */}
            <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
              <p className="text-[13px] font-semibold text-[#111827] mb-4">Primary Sources</p>
              <ol className="space-y-3">
                {SOURCES.map(s => (
                  <li key={s.n} className="flex items-start gap-3 text-[12px] text-[#374151] leading-relaxed">
                    <span className="text-[#9ca3af] font-medium shrink-0">[{s.n}]</span>
                    <span>
                      {s.text}{' '}
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#059669] hover:underline break-all"
                      >
                        {s.url}
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 7 — CITE / SHARE */}
        <section className="section-white">
          <div
            className="max-w-[660px] mx-auto px-8 py-8"
          >
            <div className="border border-[#e5e7eb] rounded-[12px] p-6">
              <h3 className="text-[15px] font-semibold text-[#111827] mb-2">Cite or share this data</h3>
              <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
                This data is free to use for editorial, educational, and non-commercial purposes with
                attribution to WorkerRight and the original primary sources listed above.
              </p>
              <div
                className="bg-[#f9fafb] rounded-lg p-[14px] mb-4 text-[12px] text-[#374151] leading-relaxed select-all"
                style={{ fontFamily: 'monospace' }}
              >
                {CITATION_TEXT}
              </div>
              <button
                onClick={handleCopy}
                className="text-[13px] font-medium px-4 py-2 rounded-lg border border-[#e5e7eb] text-[#374151] hover:border-[#059669] hover:text-[#059669] transition-colors cursor-pointer bg-white"
              >
                {copied ? 'Copied!' : 'Copy citation'}
              </button>
            </div>
          </div>
        </section>

        {/* 8 — FINAL CTA */}
        <section className="text-center px-8 py-14" style={{ background: '#059669' }}>
          <h2
            className="serif font-bold text-white mb-2"
            style={{ fontSize: 'clamp(20px,4vw,32px)', letterSpacing: '-0.03em' }}
          >
            See how these numbers apply to your case
          </h2>
          <p className="text-[15px] mb-7" style={{ color: 'rgba(255,255,255,0.9)' }}>
            State-specific estimate based on your injury, wage, and treatment status.
            Free. 2 minutes.
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-white text-[#059669] text-[14px] font-semibold px-8 py-[14px] rounded-lg hover:bg-[#f0fdf4] transition-colors"
          >
            Calculate my case →
          </Link>
        </section>

      </main>
    </>
  )
}
