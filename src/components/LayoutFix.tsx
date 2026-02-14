'use client'

import { useEffect } from 'react'

// Scroll to top on page load and trigger resize for layout calculations
export default function LayoutFix() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Scroll to top immediately on mount
    window.scrollTo(0, 0)

    // Small delay then trigger resize for any components that need it
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}
