'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function NewShopPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [discountPercent, setDiscountPercent] = useState('10')
  const [durationDays, setDurationDays] = useState('1')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        token,
        discountPercent: parseInt(discountPercent),
        durationDays: parseInt(durationDays),
      }),
    })
    setLoading(false)
    if (res.ok) {
      toast.success('Магазин додано успішно')
      router.push('/dashboard')
      router.refresh()
    } else {
      const data = await res.json()
      toast.error(data.error ?? 'Помилка')
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Назад до дашборду
        </Link>
        <h1 className="text-2xl font-bold mt-3">Додати магазин</h1>
      </div>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base">Дані магазину</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Назва магазину</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Мій магазин на Prom.ua"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="token">API-токен Prom.ua</Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                placeholder="Вставте ваш API-ключ"
                className="bg-zinc-800 border-zinc-700 font-mono text-sm"
              />
              <p className="text-xs text-zinc-500">Токен буде зашифровано (AES-256) перед збереженням</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Відсоток знижки</Label>
                <Select value={discountPercent} onValueChange={(v) => v && setDiscountPercent(v)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {[5, 10, 15, 20, 25, 30, 40, 50].map((v) => (
                      <SelectItem key={v} value={String(v)}>
                        {v}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Тривалість знижки</Label>
                <Select value={durationDays} onValueChange={(v) => v && setDurationDays(v)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="1">1 день</SelectItem>
                    <SelectItem value="2">2 дні</SelectItem>
                    <SelectItem value="3">3 дні</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-full mt-2"
            >
              {loading ? 'Збереження...' : 'Додати магазин'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
