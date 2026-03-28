'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm font-medium text-[#5c5c7a] hover:text-[#01011b] border border-[#dadae8] rounded-lg px-3 py-1.5 hover:bg-[#f5f5f7] transition-colors"
    >
      Вийти
    </button>
  )
}
