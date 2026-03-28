'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Невірний email або пароль')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold text-indigo-400 mb-2 block">
            PromAuto
          </Link>
          <CardTitle className="text-xl">Увійти в акаунт</CardTitle>
          <CardDescription className="text-zinc-400">
            Немає акаунту?{' '}
            <Link href="/register" className="text-indigo-400 hover:underline">
              Зареєструватися
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full border-zinc-700"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Увійти через Google
          </Button>
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <div className="flex-1 h-px bg-zinc-800" />
            або
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-full"
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
