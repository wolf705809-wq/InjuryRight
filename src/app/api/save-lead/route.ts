import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

// ── Rate limiting ────────────────────────────────────────────────────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS  = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const { turnstileToken, ...lead } = body

  // 2. Turnstile verification
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret) {
    if (!turnstileToken) {
      return NextResponse.json({ success: false, error: 'Bot verification required' }, { status: 400 })
    }
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ secret: turnstileSecret, response: turnstileToken }),
    })
    const verifyJson = await verify.json() as { success: boolean }
    if (!verifyJson.success) {
      return NextResponse.json({ success: false, error: 'Bot verification failed' }, { status: 400 })
    }
  }

  // 3. Save to Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[save-lead] Supabase not configured — lead not saved')
    return NextResponse.json({ success: true, note: 'db skipped (no config)' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error: dbError } = await supabase.from('leads').insert([{
    name:                  lead.name,
    email:                 lead.email,
    phone:                 lead.phone             || null,
    country:               lead.country           || 'us',
    state:                 lead.state             || null,
    industry:              lead.industry          || null,
    injury_type:           lead.injuryType        || null,
    body_part:             lead.bodyPart          || null,
    weekly_wage:           lead.weeklyWage        || null,
    employment_months:     lead.employmentMonths  || null,
    impairment_rating:     lead.impairmentRating  || null,
    treatment_weeks:       lead.treatmentWeeks    || null,
    employment_status:     lead.employmentStatus  || null,
    employer_control:      lead.employerControl   || null,
    severity_level:        lead.severityLevel     || null,
    treatment_status:      lead.treatmentStatus   || null,
    claim_status:          lead.claimStatus       || null,
    company_offer:         lead.companyOffer      ?? null,
    is_estimated_rating:   lead.isEstimatedRating ?? null,
    mmi_reached:           lead.mmiReached        ?? null,
    ttd_estimate:          lead.ttdEstimate       || null,
    ppd_estimate:          lead.ppdEstimate       || null,
    medical_estimate:      lead.medicalEstimate   || null,
    total_low:             lead.totalLow          || null,
    total_high:            lead.totalHigh         || null,
    case_strength:         lead.caseStrength      || null,
    case_strength_score:   lead.caseStrengthScore || null,
    consent:               lead.consent,
    source_url:            lead.sourceUrl         || null,
    utm_source:            lead.utmSource         || null,
    utm_medium:            lead.utmMedium         || null,
    utm_campaign:          lead.utmCampaign       || null,
    status:                'new',
  }])

  if (dbError) {
    console.error('[save-lead] DB error:', dbError.message)
    return NextResponse.json({ success: false, error: dbError.message }, { status: 500 })
  }

  // 4. Telegram notification
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId   = process.env.TELEGRAM_CHAT_ID_WORKERRIGHT

  if (botToken && chatId) {
    const fmt = (n: number) => '$' + Number(n).toLocaleString('en-US')
    const range =
      lead.totalLow && lead.totalHigh
        ? `${fmt(lead.totalLow)} – ${fmt(lead.totalHigh)}`
        : 'N/A'

    const message = [
      '🟢 *New WorkerRight Lead*',
      `👤 Name: ${lead.name}`,
      `📍 State: ${lead.state   || 'N/A'}`,
      `🏥 Injury: ${lead.injuryType || 'N/A'}`,
      `💰 Estimated: ${range}`,
    ].join('\n')

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
    }).catch(e => console.error('[save-lead] Telegram error:', e))
  }

  return NextResponse.json({ success: true })
}
