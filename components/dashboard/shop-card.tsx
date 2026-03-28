'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface Shop {
  id: string
  name: string
  status: string
  discountPercent: number
  durationDays: number
  lastSyncAt: Date | null
}

export function ShopCard({ shop }: { shop: Shop }) {
  const router = useRouter()
  const [active, setActive] = useState(shop.status === 'ACTIVE')
  const [syncing, setSyncing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  async function toggleStatus(checked: boolean) {
    setActive(checked)
    await fetch(`/api/shops/${shop.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: checked ? 'ACTIVE' : 'PAUSED' }),
    })
    router.refresh()
  }

  async function syncNow() {
    setSyncing(true)
    try {
      const res = await fetch(`/api/shops/${shop.id}/sync`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Синхронізовано: ${data.updatedCount} товарів оновлено`)
      } else {
        toast.error('Помилка синхронізації')
      }
    } finally {
      setSyncing(false)
      router.refresh()
    }
  }

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/shops/${shop.id}`, { method: 'DELETE' })
    setShowDelete(false)
    router.refresh()
  }

  const lastSync = shop.lastSyncAt
    ? new Date(shop.lastSyncAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })
    : 'Ніколи'

  return (
    <>
      <div className="bg-white border border-[#dadae8] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-[#01011b]">{shop.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
            active
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-gray-50 text-gray-500 border-gray-200'
          }`}>
            {active ? 'Активний' : 'Призупинено'}
          </span>
        </div>

        <p className="text-xs text-[#5c5c7a] mb-3">Остання синхронізація: {lastSync}</p>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-[#5c5c7a] mb-4">
          <span>Знижка: <strong className="text-[#01011b]">{shop.discountPercent}%</strong></span>
          <span>Тривалість: <strong className="text-[#01011b]">{shop.durationDays} дн.</strong></span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-[#5c5c7a]">
            <Switch checked={active} onCheckedChange={toggleStatus} />
            <span>{active ? 'Автосинк увімкнено' : 'Автосинк вимкнено'}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link
              href={`/dashboard/shops/${shop.id}`}
              className="text-xs font-medium px-3 py-1.5 border border-[#dadae8] rounded-lg text-[#01011b] hover:bg-[#f5f5f7] transition-colors"
            >
              Налаштування
            </Link>
            <button
              className="text-xs font-semibold px-3 py-1.5 bg-[#7b04df] hover:bg-[#6200d1] text-white rounded-lg transition-colors disabled:opacity-50"
              onClick={syncNow}
              disabled={syncing}
            >
              {syncing ? 'Синхронізація...' : 'Синхронізувати'}
            </button>
            <button
              className="text-xs font-medium px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              onClick={() => setShowDelete(true)}
            >
              Видалити
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="bg-white border border-[#dadae8] shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-[#01011b]">Видалити магазин?</DialogTitle>
          </DialogHeader>
          <p className="text-[#5c5c7a] text-sm">
            Магазин <strong className="text-[#01011b]">{shop.name}</strong> та всі журнали синхронізації будуть видалені безповоротно.
          </p>
          <DialogFooter>
            <button
              className="px-4 py-2 text-sm font-medium border border-[#dadae8] rounded-lg text-[#01011b] hover:bg-[#f5f5f7] transition-colors"
              onClick={() => setShowDelete(false)}
            >
              Скасувати
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Видалення...' : 'Так, видалити'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
