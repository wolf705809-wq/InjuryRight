'use client'

import { useState } from 'react'
import { CONSENT_TEXT } from '@/lib/compliance'
import { saveLead } from '@/lib/supabase'
import { LeadFormData } from '@/types'

interface Props { prefill?: Partial<LeadFormData> }

export default function LeadCaptureForm({ prefill = {} }: Props) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) { setError('You must agree to be contacted.'); return }
    setLoading(true); setError('')

    const result = await saveLead({
      ...prefill,
      name, email,
      phone: phone || undefined,
      country: 'us',
      consent,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    } as LeadFormData)

    setLoading(false)
    if (result.success) setSuccess(true)
    else setError('Something went wrong. Please try again.')
  }

  if (success) {
    return (
      <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-8 text-center">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-lg font-bold">✓</span>
        </div>
        <h3 className="text-emerald-800 font-semibold text-lg mb-2">Request Received</h3>
        <p className="text-emerald-700 text-sm">A licensed workers' comp attorney will contact you within 24 hours.</p>
      </div>
    )
  }

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      <h3 className="text-gray-900 font-semibold text-base mb-1">Get a free case review</h3>
      <p className="text-gray-500 text-sm mb-6">A licensed attorney in your state contacts you within 24 hours. No fees unless you win.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">Full Name *</label>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">Email Address *</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">Phone (optional)</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" className={inputClass} />
        </div>
        <div className="flex items-start gap-3 pt-1">
          <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5" style={{ accentColor: '#059669' }} />
          <label htmlFor="consent" className="text-[11px] text-gray-500 leading-relaxed cursor-pointer">{CONSENT_TEXT}</label>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3.5 rounded-lg text-sm transition-colors"
        >
          {loading ? 'Submitting…' : 'Get my free attorney review →'}
        </button>
      </form>
    </div>
  )
}
