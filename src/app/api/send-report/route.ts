import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(req: NextRequest) {
  // Referer validation
  const referer = req.headers.get('referer') ?? ''
  const isAllowed =
    referer.includes('getfairclaimpro.com') ||
    referer.includes('localhost')
  if (!isAllowed) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const data = await req.json()
  const {
    email, name, state, injury,
    conservative, expected, bestCase,
    caseStrength, sol, statute,
  } = data

  const RESEND_API_KEY  = process.env.RESEND_API_KEY
  const FROM_EMAIL      = process.env.RESEND_FROM_EMAIL ?? 'reports@getfairclaimpro.com'

  if (!RESEND_API_KEY) {
    console.log('[send-report] RESEND_API_KEY not set — skipping email for:', email)
    return NextResponse.json({ success: true, note: 'email skipped (no key)' })
  }

  const fmt = (n: number) => '$' + Number(n).toLocaleString('en-US')

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f1623;font-family:system-ui,sans-serif;color:#e5e7eb">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">

    <div style="margin-bottom:28px">
      <span style="font-size:22px;font-weight:700;color:#ffffff">Worker</span><span style="font-size:22px;font-weight:700;color:#059669">Right</span>
    </div>

    <p style="color:#9ca3af;margin:0 0 24px">Hi ${escapeHtml(name)},</p>

    <div style="background:#1a2235;border:1px solid #2d3748;border-radius:16px;padding:24px;margin-bottom:20px;text-align:center">
      <p style="color:#9ca3af;font-size:11px;letter-spacing:0.09em;text-transform:uppercase;margin:0 0 8px">Estimated Settlement Range</p>
      <p style="color:#059669;font-size:32px;font-weight:700;margin:0">${fmt(conservative)} — ${fmt(bestCase)}</p>
      <p style="color:#6b7280;font-size:13px;margin:8px 0 0">Expected: ${fmt(expected)} · Case Strength: ${escapeHtml(caseStrength)}</p>
    </div>

    <div style="background:#1a2235;border:1px solid #2d3748;border-radius:16px;padding:20px;margin-bottom:20px">
      <p style="color:#059669;font-size:11px;letter-spacing:0.09em;text-transform:uppercase;font-weight:600;margin:0 0 12px">Case Details</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#9ca3af;font-size:13px;padding:4px 0">State</td><td style="color:#ffffff;font-size:13px;text-align:right">${escapeHtml(state)}</td></tr>
        <tr><td style="color:#9ca3af;font-size:13px;padding:4px 0">Injury</td><td style="color:#ffffff;font-size:13px;text-align:right">${escapeHtml(injury)}</td></tr>
        <tr><td style="color:#9ca3af;font-size:13px;padding:4px 0">Filing Deadline</td><td style="color:#fbbf24;font-size:13px;text-align:right;font-weight:600">${escapeHtml(sol)} from injury date</td></tr>
        <tr><td style="color:#9ca3af;font-size:13px;padding:4px 0">Statute</td><td style="color:#ffffff;font-size:13px;text-align:right">${escapeHtml(statute)}</td></tr>
      </table>
    </div>

    <div style="background:#1a2235;border:1px solid #2d3748;border-radius:16px;padding:20px;margin-bottom:24px">
      <p style="color:#059669;font-size:11px;letter-spacing:0.09em;text-transform:uppercase;font-weight:600;margin:0 0 12px">Next Steps</p>
      <p style="color:#d1d5db;font-size:13px;margin:0 0 8px">① A licensed ${escapeHtml(state)} workers' comp attorney may contact you within 24 hours.</p>
      <p style="color:#d1d5db;font-size:13px;margin:0 0 8px">② The consultation is completely free — no obligation to proceed.</p>
      <p style="color:#d1d5db;font-size:13px;margin:0">③ Do not accept any settlement offer before speaking with an attorney.</p>
    </div>

    <div style="text-align:center;margin-bottom:28px">
      <a href="https://getfairclaimpro.com/results" style="background:#059669;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:14px 32px;border-radius:12px;display:inline-block">View Your Full Report Online →</a>
    </div>

    <hr style="border:none;border-top:1px solid #1f2937;margin:24px 0">
    <p style="color:#4b5563;font-size:11px;text-align:center;line-height:1.6;margin:0">
      This is not legal advice. WorkerRight is not a law firm. Estimates are for informational purposes only.<br>
      © 2025 WorkerRight · getfairclaimpro.com<br>
      Attorney Advertising · Not a law firm · Not legal advice
    </p>

  </div>
</body>
</html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `WorkerRight <${FROM_EMAIL}>`,
        to: [email],
        subject: `Your Workers' Comp Settlement Report — WorkerRight`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[send-report] Resend error:', err)
      return NextResponse.json({ success: false, error: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[send-report] fetch error:', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
