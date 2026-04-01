'use client'

import { useRef, useState } from 'react'
import Script from 'next/script'
import { CONSENT_TEXT } from '@/lib/compliance'
import { LeadFormData } from '@/types'

interface Props { prefill?: Partial<LeadFormData> }

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function LeadCaptureForm({ prefill = {} }: Props) {
  const [name,           setName]           = useState('')
  const [email,          setEmail]          = useState('')
  const [phone,          setPhone]          = useState('')
  const [consent,        setConsent]        = useState(false)
  const [loading,        setLoading]        = useState(false)
  const [success,        setSuccess]        = useState(false)
  const [error,          setError]          = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const trustedFormRef = useRef<HTMLInputElement>(null)

  // Expose Turnstile callback to window so the widget can call it
  if (typeof window !== 'undefined') {
    (window as any).__onTurnstileCallback = (token: string) => setTurnstileToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) { setError('You must agree to be contacted.'); return }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError('Please complete the security check.')
      return
    }
    setLoading(true); setError('')

    try {
      const res = await fetch('/api/save-lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...prefill,
          name, email,
          phone:              phone || undefined,
          country:            'us',
          consent,
          sourceUrl:          typeof window !== 'undefined' ? window.location.href : undefined,
          turnstileToken:     turnstileToken || undefined,
          trustedFormCertUrl: trustedFormRef.current?.value || undefined,
        }),
      })
      const json = await res.json() as { success: boolean }
      setLoading(false)
      if (json.success) setSuccess(true)
      else setError('Something went wrong. Please try again.')
    } catch {
      setLoading(false)
      setError('Something went wrong. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="border border-[var(--border)] bg-[var(--em-light)] rounded-xl p-8 text-center">
        <div className="w-10 h-10 rounded-full bg-[var(--em-light)] flex items-center justify-center mx-auto mb-4">
          <span className="text-[var(--em)] text-lg font-bold">✓</span>
        </div>
        <h3 className="text-[var(--em-dark)] font-semibold text-lg mb-2">Request Received</h3>
        <p className="text-[var(--em-dark)] text-sm">A licensed workers' comp attorney will contact you within 24 hours.</p>
      </div>
    )
  }

  const inputClass = 'w-full border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--ink)] text-sm placeholder:text-[var(--ink-4)] focus:border-[var(--em)] focus:outline-none focus:shadow-[0_0_0_3px_var(--em-light)]'

  return (
    <>
      {/* TrustedForm */}
      <Script
        id="trusted-form"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {
  var tf = document.createElement('script');
  tf.type = 'text/javascript'; tf.async = true;
  tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
    '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
    new Date().getTime() + Math.random();
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(tf, s);
})();`,
        }}
      />

      {/* Cloudflare Turnstile */}
      {TURNSTILE_SITE_KEY && (
        <Script
          id="cf-turnstile-script"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      <div className="border border-[var(--border)] rounded-xl p-6 bg-white">
        <h3 className="text-[var(--ink)] font-semibold text-base mb-1">Get a free case review</h3>
        <p className="text-[var(--ink-3)] text-sm mb-6">A licensed attorney in your state contacts you within 24 hours. No fees unless you win.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TrustedForm hidden input — populated automatically by the TrustedForm script */}
          <input type="hidden" name="xxTrustedFormCertUrl" ref={trustedFormRef} />

          <div>
            <label className="text-xs text-[var(--ink-3)] block mb-1.5">Full Name *</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-[var(--ink-3)] block mb-1.5">Email Address *</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-[var(--ink-3)] block mb-1.5">Phone (optional)</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" className={inputClass} />
          </div>
          <div className="flex items-start gap-3 pt-1">
            <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-[var(--em)]" />
            <label htmlFor="consent" className="text-[11px] text-[var(--ink-3)] leading-relaxed cursor-pointer">{CONSENT_TEXT}</label>
          </div>

          {/* Cloudflare Turnstile widget */}
          {TURNSTILE_SITE_KEY && (
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              data-callback="__onTurnstileCallback"
            />
          )}

          {error && <p className="text-[var(--red-dead)] text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--em)] hover:bg-[var(--em)] disabled:bg-[var(--border)] disabled:text-[var(--ink-4)] text-white font-medium py-3.5 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Submitting…' : 'Get my free attorney review →'}
          </button>
        </form>
      </div>
    </>
  )
}
