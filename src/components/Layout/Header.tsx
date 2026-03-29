'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" style={{ letterSpacing: '-0.3px' }} className="flex items-center">
          <span className="text-xl font-semibold text-gray-900">WorkInjury</span>
          <span className="text-xl font-semibold text-emerald-600">Calc</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/calculator" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Calculator</Link>
          <Link href="/injuries/back-injury" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">Injuries</Link>
          <Link href="/calculator" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            Check my claim
          </Link>
        </nav>
        <button className="md:hidden text-gray-500 p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 px-6 py-4 flex flex-col gap-4 bg-white">
          <Link href="/calculator" className="text-gray-600 text-sm" onClick={() => setOpen(false)}>Calculator</Link>
          <Link href="/injuries/back-injury" className="text-gray-600 text-sm" onClick={() => setOpen(false)}>Injuries</Link>
          <Link href="/calculator" className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md text-center" onClick={() => setOpen(false)}>
            Check my claim
          </Link>
        </div>
      )}
    </header>
  )
}
