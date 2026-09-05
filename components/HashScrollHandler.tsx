'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function scrollToHashTarget() {
  const hash = window.location.hash.slice(1)
  if (!hash) return
  const element = document.getElementById(hash)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/** Scroll vers l’ancre après navigation client vers la home (ex. /videos → /#presentation). */
export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return
    if (!window.location.hash) return

    scrollToHashTarget()
    const timeoutId = window.setTimeout(scrollToHashTarget, 150)
    window.addEventListener('hashchange', scrollToHashTarget)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('hashchange', scrollToHashTarget)
    }
  }, [pathname])

  return null
}
