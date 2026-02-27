'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className="fixed top-0 right-0 z-50 p-4 sm:p-6">
        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex flex-col justify-center items-center gap-[6px] w-10 h-10 rounded-full bg-[#263C29] hover:bg-[#1e2e20] transition-colors duration-300 focus:outline-none"
        >
          {/* Line 1 */}
          <span
            className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          {/* Line 2 */}
          <span
            className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          {/* Line 3 */}
          <span
            className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in menu panel */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-[#263C29] shadow-2xl flex flex-col pt-24 px-8 gap-2 transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-lg tracking-wide py-3 px-4 rounded-full text-center transition-all duration-300 ${
                isActive
                  ? 'bg-white text-[#263C29] font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
