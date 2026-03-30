import Link from 'next/link'

// ── Section 3: The Turn data ──────────────────────────────────────────────────
const TURN_STATS = [
  {
    number:  '$42,000',
    label:   "Average workers' comp settlement",
    sub:     'Most initial offers are 40–60% of this',
    subRed:  true,
  },
  {
    number:  '2×',
    label:   'Higher settlements with an attorney',
    sub:     'Source: BLS & NCCI data',
    subRed:  false,
  },
  {
    number:  '1 year',
    label:   'Average time before insurers offer settlement',
    sub:     'The longer you wait, the less leverage you have',
    subRed:  true,
  },
]

// ── Section 5: Dark Data ──────────────────────────────────────────────────────
const DARK_STATS = [
  { number: '$1.2B', label: "Total workers' comp paid in CA (2023)",    source: 'Source: CA DWC Annual Report' },
  { number: '2.6M',  label: 'Work injury claims filed annually in the US', source: 'Source: Bureau of Labor Statistics' },
  { number: '68%',   label: "Of injured workers don't hire an attorney",   source: 'Source: NCCI' },
  { number: '40%',   label: 'Gap between first offer and final settlement', source: 'With legal representation' },
]

// ── Section 7: Social Proof ───────────────────────────────────────────────────
const CASES = [
  {
    tag:    'Construction · Houston, TX',
    amount: '$31,000',
    offer:  "Employer's first offer: $8,200",
    body:   'After understanding the actual formula, settled for nearly 4× the initial offer.',
    foot:   'Back injury · 6 years employed',
  },
  {
    tag:    'Warehouse · Chicago, IL',
    amount: 'Full benefits',
    offer:  'Claim initially denied',
    body:   'Learned about appeal rights. Attorney secured full medical + wage benefits.',
    foot:   'Knee injury · MMI reached',
  },
  {
    tag:    'Platform Worker · Los Angeles, CA',
    amount: '$38K–$67K',
    offer:  'Estimated range · case pending',
    body:   'Flagged as possible misclassification. Now pursuing full employee benefits.',
    foot:   'Shoulder injury · 2 yrs on platform',
  },
]

export default function HomePage() {
  return (
    <main>

      {/* ── 1: HERO (Layer C — Humanist Minimal) ────────────────────────── */}
      <section className="section-white">
        <div className="section-inner">
          <p className="eyebrow mb-5">US Workers&apos; Rights · 47 States</p>
          <h1
            className="serif font-bold leading-[1.12] mb-0"
            style={{ fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '-0.04em' }}
          >
            <span className="text-[#111827] block">The day you got hurt,</span>
            <span className="text-[#059669] block">their adjuster was already working.</span>
          </h1>
          <div className="em-divider" />
          <p className="body-large mb-4 max-w-[520px]">
            Insurance adjusters are measured by how little they pay out. Most injured workers
            don&apos;t know this until it&apos;s too late.
          </p>
          <p className="text-base font-semibold text-[#111827] leading-[1.8] mb-6 max-w-[520px]">
            WorkerRight gives you the same information they have — free.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/calculator"
              className="inline-block text-white text-[14px] font-medium px-[26px] py-[13px] rounded-lg transition-all hover:opacity-90 active:scale-[0.99]"
              style={{ background: '#059669' }}
            >
              See what your case is worth →
            </Link>
            <p className="text-[12px] text-[#9ca3af]">Free · 47 states · 2 minutes · No obligation</p>
          </div>
        </div>
      </section>

      {/* ── 2: TRUST STRIP (Layer A — Editorial) ────────────────────────── */}
      <div className="border-t border-b border-[#e5e7eb] px-8 py-4">
        <div className="flex gap-x-8 gap-y-2 justify-center flex-wrap">
          {[
            '47 states covered',
            'Free always',
            'Licensed attorney network',
            'No win, no fee',
            'Results in 2 minutes',
          ].map(item => (
            <span key={item} className="flex items-center gap-2 text-[12px] text-[#6b7280]">
              <span className="w-[5px] h-[5px] rounded-full bg-[#059669] shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3: THE TURN — Data (Layer A) ─────────────────────────────────── */}
      <section className="border-b border-[#e5e7eb] px-8 py-10">
        <div className="max-w-[660px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {TURN_STATS.map(s => (
            <div key={s.number}>
              <span className="stat-number">{s.number}</span>
              <p className="text-[14px] font-medium text-[#111827] leading-snug mt-3 mb-1">{s.label}</p>
              <p className={`text-[12px] leading-snug ${s.subRed ? 'text-[#dc2626]' : 'text-[#9ca3af]'}`}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4: ORIGIN STORY (Layer C — Humanist) ─────────────────────────── */}
      <section className="section-warm">
        <div className="section-inner">
          <p className="eyebrow mb-5">Why WorkerRight exists</p>
          <h2
            className="serif font-bold text-[#111827]"
            style={{ fontSize: 'clamp(22px,4vw,32px)', letterSpacing: '-0.03em' }}
          >
            The information was never secret.
            <br />
            It just wasn&apos;t yours.
          </h2>
          <div className="em-divider" />
          <div className="space-y-5">
            <p className="text-[15px] text-[#374151] leading-[1.9]">
              We came from the insurance industry. We know how adjusters are trained. We know the
              formulas they use to calculate what to offer you — and when to offer less.
            </p>
            <p className="text-[15px] text-[#374151] leading-[1.9]">
              That information was never secret. It was just never made accessible. State workers&apos;
              comp law is public. The formulas are public. The settlement data is public.
              <br /><br />
              It just takes time to find, understand, and apply. Time that most injured workers
              don&apos;t have.
            </p>
            <p className="text-[15px] font-semibold text-[#111827] leading-[1.9]">
              WorkerRight does that work for you. Free. In 2 minutes. Before you&apos;ve spoken
              to anyone.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5: DARK DATA (Layer B — Dark Authority) ──────────────────────── */}
      <section className="section-dark">
        <div className="section-inner">
          <p className="eyebrow mb-4">By the numbers</p>
          <h2
            className="serif font-bold text-white mb-2"
            style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
          >
            The system is designed to pay you less.
          </h2>
          <p className="text-[14px] text-[#6b7280] mb-8">Here&apos;s what the data actually shows.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DARK_STATS.map(s => (
              <div key={s.number} className="rounded-[10px] p-5" style={{ background: '#1a2235' }}>
                <span className="stat-number mb-3">{s.number}</span>
                <p className="text-[12px] text-[#9ca3af] leading-snug mt-3 mb-1">{s.label}</p>
                <p className="text-[10px] text-[#4b5563]">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6: HOW IT WORKS (Layer B) ────────────────────────────────────── */}
      <section style={{ background: '#111827' }}>
        <div className="section-inner">
          <p className="eyebrow mb-4">How it works</p>
          <h2
            className="serif font-bold text-white mb-10"
            style={{ fontSize: 'clamp(20px,4vw,32px)', letterSpacing: '-0.03em' }}
          >
            Three steps to knowing your number
          </h2>
          <div className="space-y-0 divide-y divide-[#1f2937]">
            {[
              {
                n:    '01',
                title:'Answer 7 questions',
                desc: 'Tell us about your injury, your state, and your situation. Takes 2 minutes.',
              },
              {
                n:    '02',
                title:'See the actual formula',
                desc: "We show you the same calculation your state's workers' comp board uses — and what similar cases have settled for.",
              },
              {
                n:    '03',
                title:'Walk in prepared',
                desc: 'Use the information however you choose. Connect with an attorney, or don\'t. No pressure. No obligation. No catch.',
                italic: 'however you choose',
              },
            ].map(step => (
              <div key={step.n} className="flex items-start gap-6 py-7">
                <span className="text-[32px] font-bold text-[#059669] leading-none shrink-0 w-12">{step.n}</span>
                <div>
                  <p className="text-[16px] font-semibold text-white mb-1">{step.title}</p>
                  <p className="text-[14px] text-[#6b7280] leading-[1.7]">
                    {step.n === '03'
                      ? <>Use the information <em className="not-italic font-normal text-[#10b981]">however you choose</em>. Connect with an attorney, or don&apos;t. No pressure. No obligation. No catch.</>
                      : step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7: SOCIAL PROOF (Layer A — Editorial) ────────────────────────── */}
      <section className="section-white">
        <div className="section-inner">
          <p className="eyebrow mb-4">Real outcomes</p>
          <h2
            className="serif font-bold text-[#111827] mb-2"
            style={{ fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: '-0.03em' }}
          >
            Workers who came prepared.
          </h2>
          <p className="text-[12px] text-[#9ca3af] mb-8">Illustrative cases based on typical outcomes. Individual results vary.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CASES.map(c => (
              <div key={c.tag} className="border border-[#e5e7eb] rounded-[10px] p-5 flex flex-col gap-3">
                <span className="inline-block text-[10px] font-medium text-[#065f46] bg-[#ecfdf5] px-3 py-1 rounded-full self-start">
                  {c.tag}
                </span>
                <div>
                  <p className="text-[18px] font-bold text-[#111827] leading-tight">{c.amount}</p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">{c.offer}</p>
                </div>
                <p className="text-[13px] text-[#374151] leading-[1.65] flex-1">{c.body}</p>
                <p className="text-[11px] text-[#9ca3af] border-t border-[#e5e7eb] pt-3">{c.foot}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8: FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="text-center px-8 py-16" style={{ background: '#059669' }}>
        <h2
          className="serif font-bold text-white mb-2"
          style={{ fontSize: 'clamp(20px,4vw,32px)', letterSpacing: '-0.03em' }}
        >
          Before anyone calls you with an offer —
        </h2>
        <p
          className="serif font-bold mb-7"
          style={{ fontSize: 'clamp(18px,3vw,26px)', color: 'rgba(255,255,255,0.9)' }}
        >
          Know what you&apos;re owed.
        </p>
        <Link
          href="/calculator"
          className="inline-block bg-white text-[#059669] text-[14px] font-semibold px-8 py-[14px] rounded-lg transition-colors hover:bg-[#f0fdf4]"
        >
          Calculate my compensation →
        </Link>
        <p className="text-[12px] mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Free · No sign-up · No obligation
        </p>
      </section>

    </main>
  )
}
