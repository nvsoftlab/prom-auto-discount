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
    <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
      <button onClick={() => smoothScrollTo('how')} className="hover:text-white transition-colors cursor-pointer">
        Як це працює
      </button>
      <button onClick={() => smoothScrollTo('pricing')} className="hover:text-white transition-colors cursor-pointer">
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
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2 cursor-pointer"
        aria-label="Меню"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0d0d14]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-col gap-3">
          <button onClick={() => handleScroll('how')} className="text-left text-zinc-300 hover:text-white py-2 text-sm transition-colors">
            Як це працює
          </button>
          <button onClick={() => handleScroll('pricing')} className="text-left text-zinc-300 hover:text-white py-2 text-sm transition-colors">
            Ціни
          </button>
          <hr className="border-white/10" />
          <Link href="/login" onClick={() => setOpen(false)} className="text-zinc-300 hover:text-white py-2 text-sm transition-colors">
            Увійти
          </Link>
          <Link href="/register" onClick={() => setOpen(false)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 px-4 rounded-lg text-center transition-colors">
            Спробувати безкоштовно
          </Link>
        </div>
      )}
    </div>
  )
}

export function ScrollButton({ target }: { target: string }) {
  return (
    <button
      onClick={() => smoothScrollTo(target)}
      className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
    >
      Дізнатися більше
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
