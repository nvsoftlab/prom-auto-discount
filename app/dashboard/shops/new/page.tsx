'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function NewShopPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [discountPercent, setDiscountPercent] = useState('10')
  const [durationDays, setDurationDays] = useState('1')
  const [loading, setLoading] = useState(false)
  const [showTokenHelp, setShowTokenHelp] = useState(false)

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
        <Link href="/dashboard" className="text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors">
          ← Назад до дашборду
        </Link>
        <h1 className="text-2xl font-bold mt-3 text-[#01011b]">Додати магазин</h1>
      </div>

      <div className="bg-white border border-[#dadae8] rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#01011b] mb-5">Дані магазину</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-[#01011b]">Назва магазину</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Мій магазин на Prom.ua"
              className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm text-[#01011b] bg-white placeholder-[#9999b3] focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="token" className="text-sm font-medium text-[#01011b]">API-токен Prom.ua</label>
              <button
                type="button"
                onClick={() => setShowTokenHelp((v) => !v)}
                className="text-xs text-[#7b04df] hover:text-[#6200d1] transition-colors"
              >
                {showTokenHelp ? 'Сховати інструкцію' : 'Як знайти токен?'}
              </button>
            </div>
            {showTokenHelp && (
              <div className="bg-[#f5f5f7] border border-[#dadae8] rounded-lg p-4 text-sm text-[#01011b]">
                <p className="font-semibold mb-3">Де знайти API-токен на Prom.ua:</p>
                <ol className="flex flex-col gap-2.5 text-[#5c5c7a]">
                  <li className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#7b04df] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                    <span>Відкрийте <strong className="text-[#01011b]">my.prom.ua</strong> і увійдіть в акаунт продавця</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#7b04df] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                    <span>У лівому меню оберіть <strong className="text-[#01011b]">Налаштування → Доступ до API</strong></span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#7b04df] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                    <span>Натисніть <strong className="text-[#01011b]">«Додати ключ»</strong>, дайте назву (наприклад, <em>PromAutoDiscount</em>) та збережіть</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#7b04df] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">4</span>
                    <span>Скопіюйте згенерований токен і вставте його в поле нижче</span>
                  </li>
                </ol>
                <p className="mt-3 text-xs text-[#9999b3]">Токен виглядає приблизно так: <span className="font-mono bg-white border border-[#dadae8] px-1.5 py-0.5 rounded text-[#01011b]">a1b2c3d4e5f6...</span></p>
              </div>
            )}
            <input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              placeholder="Вставте ваш API-ключ"
              className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm text-[#01011b] bg-white placeholder-[#9999b3] focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors font-mono"
            />
            <p className="text-xs text-[#5c5c7a]">Токен буде зашифровано (AES-256) перед збереженням</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#01011b]">Відсоток знижки</label>
              <Select value={discountPercent} onValueChange={(v) => v && setDiscountPercent(v)}>
                <SelectTrigger className="border-[#dadae8] bg-white text-[#01011b]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#dadae8]">
                  {[5, 10, 15, 20, 25, 30, 40, 50].map((v) => (
                    <SelectItem key={v} value={String(v)}>{v}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#01011b]">Тривалість знижки</label>
              <Select value={durationDays} onValueChange={(v) => v && setDurationDays(v)}>
                <SelectTrigger className="border-[#dadae8] bg-white text-[#01011b]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#dadae8]">
                  <SelectItem value="1">1 день</SelectItem>
                  <SelectItem value="2">2 дні</SelectItem>
                  <SelectItem value="3">3 дні</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7b04df] hover:bg-[#6200d1] disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2"
          >
            {loading ? 'Збереження...' : 'Додати магазин'}
          </button>
        </form>
      </div>
    </div>
  )
}
