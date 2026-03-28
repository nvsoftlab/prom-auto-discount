'use client'

import { useState } from 'react'
import Link from 'next/link'

export function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 64
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-8 text-sm text-[#5c5c7a]">
      <button onClick={() => smoothScrollTo('how')} className="hover:text-[#01011b] transition-colors cursor-pointer">
        Як це працює
      </button>
      <button onClick={() => smoothScrollTo('security')} className="hover:text-[#01011b] transition-colors cursor-pointer">
        Безпека
      </button>
      <button onClick={() => smoothScrollTo('pricing')} className="hover:text-[#01011b] transition-colors cursor-pointer">
        Ціни
      </button>
    </nav>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)

  function handleScroll(id: string) {
    setOpen(false)
    setTimeout(() => smoothScrollTo(id), 50)
  }

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2 cursor-pointer"
        aria-label="Меню"
      >
        <span className={`block w-5 h-0.5 bg-[#01011b] transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-[#01011b] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-[#01011b] transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-[#dadae8] rounded-xl shadow-lg px-4 py-3 flex flex-col gap-2 z-50">
          <button onClick={() => handleScroll('how')} className="text-left text-[#5c5c7a] hover:text-[#01011b] py-2 text-sm transition-colors">
            Як це працює
          </button>
          <button onClick={() => handleScroll('security')} className="text-left text-[#5c5c7a] hover:text-[#01011b] py-2 text-sm transition-colors">
            Безпека
          </button>
          <button onClick={() => handleScroll('pricing')} className="text-left text-[#5c5c7a] hover:text-[#01011b] py-2 text-sm transition-colors">
            Ціни
          </button>
          <hr className="border-[#dadae8]" />
          <Link href="/login" onClick={() => setOpen(false)} className="text-[#5c5c7a] hover:text-[#01011b] py-2 text-sm transition-colors">
            Увійти
          </Link>
          <button onClick={() => handleScroll('waitlist')} className="bg-[#7b04df] hover:bg-[#6200d1] text-white text-sm font-semibold py-2.5 px-4 rounded-lg text-center transition-colors">
            Спробувати безкоштовно
          </button>
        </div>
      )}
    </div>
  )
}

export function WaitlistButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <button onClick={() => smoothScrollTo('waitlist')} className={className}>
      {children}
    </button>
  )
}

export function ScrollButton({ target }: { target: string }) {
  return (
    <button
      onClick={() => smoothScrollTo(target)}
      className="text-sm text-[#5c5c7a] hover:text-[#01011b] transition-colors flex items-center gap-1 cursor-pointer"
    >
      Дізнатися більше
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
