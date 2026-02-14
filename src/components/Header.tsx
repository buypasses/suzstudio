'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const linkClass = (href: string) => {
    const isActive = pathname === href
    return `text-sm sm:text-base tracking-wide transition-all duration-300 py-2 px-4 rounded-full ${
      isActive
        ? 'bg-gold text-[#263C29] font-medium'
        : 'bg-cream/90 text-[#263C29] hover:bg-gold/80'
    }`
  }

  return (
    <header className="sticky top-0 z-50 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 lg:gap-4">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
          <Link href="/work" className={linkClass('/work')}>
            Work
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
