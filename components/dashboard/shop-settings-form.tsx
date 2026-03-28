'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface Shop {
  id: string
  name: string
  discountPercent: number
  durationDays: number
}

export function ShopSettingsForm({ shop }: { shop: Shop }) {
  const router = useRouter()
  const [name, setName] = useState(shop.name)
  const [token, setToken] = useState('')
  const [discountPercent, setDiscountPercent] = useState(String(shop.discountPercent))
  const [durationDays, setDurationDays] = useState(String(shop.durationDays))
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const body: Record<string, unknown> = { name, discountPercent: parseInt(discountPercent), durationDays: parseInt(durationDays) }
    if (token) body.token = token

    const res = await fetch(`/api/shops/${shop.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setLoading(false)

    if (res.ok) {
      toast.success('Налаштування збережено')
      setToken('')
      router.refresh()
    } else {
      toast.error('Помилка збереження')
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-base">Налаштування магазину</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Назва</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="token">Новий API-токен (залиште порожнім, щоб не змінювати)</Label>
            <Input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Вставте новий токен для ротації"
              className="bg-zinc-800 border-zinc-700 font-mono text-sm"
            />
            <p className="text-xs text-zinc-500">Новий токен буде зашифровано (AES-256) перед збереженням</p>
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
            {loading ? 'Збереження...' : 'Зберегти зміни'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
