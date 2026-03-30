'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-8 py-[18px] flex items-center justify-between">
        <Link href="/" className="flex items-center" style={{ fontSize: '16px', letterSpacing: '-0.4px' }}>
          <span className="font-bold text-[#111827]">Worker</span>
          <span className="font-bold text-[#059669]">Right</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/calculator"               className="text-[#6b7280] hover:text-[#111827] text-[12px] transition-colors">Calculator</Link>
          <Link href="/workers-comp-statistics" className="text-[#6b7280] hover:text-[#111827] text-[12px] transition-colors">Statistics</Link>
          <Link href="/guides"                  className="text-[#6b7280] hover:text-[#111827] text-[12px] transition-colors">Guides</Link>
          <Link href="/about"                   className="text-[#6b7280] hover:text-[#111827] text-[12px] transition-colors">About</Link>
          <Link
            href="/calculator"
            className="text-white text-[12px] font-medium px-[14px] py-[7px] rounded-md transition-colors hover:opacity-90"
            style={{ background: '#059669' }}
          >
            Check my rights →
          </Link>
        </nav>
        <button className="md:hidden text-[#6b7280] p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#e5e7eb] px-8 py-4 flex flex-col gap-4 bg-white">
          <Link href="/calculator"               className="text-[#6b7280] text-sm" onClick={() => setOpen(false)}>Calculator</Link>
          <Link href="/workers-comp-statistics" className="text-[#6b7280] text-sm" onClick={() => setOpen(false)}>Statistics</Link>
          <Link href="/guides"                  className="text-[#6b7280] text-sm" onClick={() => setOpen(false)}>Guides</Link>
          <Link href="/about"                   className="text-[#6b7280] text-sm" onClick={() => setOpen(false)}>About</Link>
          <Link
            href="/calculator"
            className="text-white text-[12px] font-medium px-4 py-2 rounded-md text-center"
            style={{ background: '#059669' }}
            onClick={() => setOpen(false)}
          >
            Check my rights →
          </Link>
        </div>
      )}
    </header>
  )
}
