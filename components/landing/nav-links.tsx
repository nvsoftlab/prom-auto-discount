'use client'

export function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 80
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
