'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger button */}
      <header className="fixed top-0 right-0 z-50 p-4 sm:p-5">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex flex-col justify-center items-center gap-[6px] w-10 h-10"
        >
          <span className="block w-7 h-[2px] bg-[#304254] rounded-full" />
          <span className="block w-7 h-[2px] bg-[#304254] rounded-full" />
          <span className="block w-7 h-[2px] bg-[#304254] rounded-full" />
        </button>
      </header>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#304254]/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-[#304254] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-[#D2B68A] hover:text-white transition-colors"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="24" y1="4" x2="4" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-1 px-8 pt-6">
          {[
            { href: '/', label: 'Home' },
            { href: '/work', label: 'Work' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`heading-display text-3xl italic py-4 border-b border-white/10 transition-colors duration-200 ${
                  isActive ? 'text-[#D2B68A]' : 'text-white hover:text-[#D2B68A]'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
