import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@/components/dashboard/sign-out-button'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-indigo-400">
          PromAuto
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{session.user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">{children}</main>
    </div>
  )
}
