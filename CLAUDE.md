# WorkerRight — Brand & Development Philosophy

## Who We Are

WorkerRight is not a lead generation website.
WorkerRight is not a legal information aggregator.
WorkerRight is not a tool.
WorkerRight is the information that was always supposed to be free — finally made free.

We exist because injured workers walk into negotiations alone, while the other side has lawyers, adjusters, and decades of data. We exist to end that imbalance.

---

## The One Thing We Never Forget

Every person who lands on WorkerRight is having one of the worst weeks of their life.
They didn't choose to get hurt.
They didn't choose to navigate a legal system designed by and for institutions.

Everything we build — every word, every number, every button — must honor that reality.

We do not manipulate. We do not pressure.
We give people the truth, and we let them decide.

---

## Design System

### Three-Layer Hybrid

Layer 1 — A (Authoritative Editorial): White background. Strong typography. The structural layer. Feels like the NYT legal section. Use for: overall layout, nav, trust elements, footer.

Layer 2 — C (Humanist Minimal): Serif headlines. Warm off-white (#fafaf9) sections. The emotional layer. Feels human, not corporate. Use for: hero, origin story, guide content, about page.

Layer 3 — B (Dark Authority): Dark background (#0f1623). Emerald numbers. The data layer. Feels like a Bloomberg terminal. Use for: statistics sections, data callouts only.

### Color Tokens

```
--ink:      #111827  (primary text)
--ink-2:    #374151  (body text)
--ink-3:    #6b7280  (secondary text)
--ink-4:    #9ca3af  (hints, sources)
--em:       #059669  (emerald primary)
--em-light: #ecfdf5  (emerald tint)
--em-mid:   #10b981  (emerald hover)
--em-dark:  #065f46  (emerald text on light)
--warm:     #fafaf9  (warm white sections)
--border:   #e5e7eb  (all borders)
--dark:     #0f1623  (dark sections)
--dark-2:   #1a2235  (dark cards)
--red:      #dc2626  (deadlines ONLY)
```

### Typography

Headings: Georgia, 'Times New Roman', serif
- H1: clamp(32px, 5vw, 48px), weight 700, letter-spacing -0.04em, line-height 1.12
- H2: clamp(20px, 3.5vw, 32px), weight 700, letter-spacing -0.03em

Body: system-ui, -apple-system, sans-serif
- 16px minimum, line-height 1.8
- Never below 13px for actionable text

Eyebrow label: 11px, uppercase, letter-spacing 0.09em, color: var(--em), font-weight 500

The emerald divider line (44px × 3px) replaces decorative elements between headline and body.

### Spacing Rhythm

- Section padding: 64px 32px (desktop), 48px 20px (mobile)
- Max content width: 660px, centered
- Component gap: 16px
- Card internal padding: 18px–24px

### Component Rules

Buttons:
- Primary: bg #059669, white text, radius 8px, padding 13px 26px, font-size 14px
- Hover: bg #047857, transform: scale(1.01)
- Never use exclamation points in button text.

Cards:
- border: 1px solid #e5e7eb
- border-radius: 10px
- padding: 18px–24px
- No shadows. No gradients.

Stat display (dark sections only):
- Number: 32px+, font-weight 700, color #059669
- Label: 12px, color #9ca3af
- Source: 10px, color #4b5563

Emerald divider: width 44px, height 3px, background #059669, border-radius 2px
Use after H1 in hero and content sections.

---

## Voice & Tone

### Always:
- Serif headlines carry the emotional weight
- Sans-serif body carries the facts
- Lead with truth, close with data
- Give before asking
- Say "may be entitled to" not "will get"
- Name the system, not the victim

### Never:
- Exclamation points in serious content
- "Guaranteed", "definitely", "absolutely"
- Fake urgency
- Passive voice when naming the problem
  - Wrong: "Benefits are often underpaid"
  - Right: "Insurers underpay — routinely"
- More than 5 sections on one page

### The Core Sequence (never reverse):
1. Emotional truth (serif, 1–2 lines)
2. Emerald divider
3. Factual body (sans-serif)
4. Data (emerald numbers)
5. CTA (one ask per section)

---

## pSEO Content Standard

Every /[state]/[industry]/[injury] page must:
- Reference the actual state statute by number
- Show a real data point from that state's DWC
- Be useful without the calculator
- Follow the same section sequence as the homepage

If removing the calculator makes the page useless, rewrite until it wouldn't be.

---

## Legal Guardrails (Non-Negotiable)

1. Introducer, not a law firm — on every page
2. All estimates labeled "estimated" or "indicative"
3. "Up to 2×" not "2×" without a cited source
4. No specific company names implying wrongdoing
5. Attorney advertising disclosure in every footer
6. Red (#dc2626) for deadlines only, never decoration

---

## Development Rules

- Tailwind classes only. Never inline `style={{}}`.
- Mobile first. Always.
- Every external link: `rel="noopener noreferrer"`
- Loading + error states for every form
- Never leave a user in a dead end
