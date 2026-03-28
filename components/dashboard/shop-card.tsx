'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

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
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">{shop.name}</CardTitle>
            <Badge
              className={
                active
                  ? 'bg-emerald-900 text-emerald-300 border-emerald-700'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }
            >
              {active ? 'Активний' : 'Призупинено'}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500">Остання синхронізація: {lastSync}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4 text-sm text-zinc-400">
            <span>Знижка: <strong className="text-zinc-200">{shop.discountPercent}%</strong></span>
            <span>Тривалість: <strong className="text-zinc-200">{shop.durationDays} дн.</strong></span>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Switch checked={active} onCheckedChange={toggleStatus} />
              <span>{active ? 'Автосинк увімкнено' : 'Автосинк вимкнено'}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link
                href={`/dashboard/shops/${shop.id}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'border-zinc-700')}
              >
                Налаштування
              </Link>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={syncNow}
                disabled={syncing}
              >
                {syncing ? 'Синхронізація...' : 'Синхронізувати'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-950"
                onClick={() => setShowDelete(true)}
              >
                Видалити
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Видалити магазин?</DialogTitle>
          </DialogHeader>
          <p className="text-zinc-400 text-sm">
            Магазин <strong className="text-zinc-200">{shop.name}</strong> та всі журнали синхронізації будуть
            видалені безповоротно.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDelete(false)}>
              Скасувати
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Видалення...' : 'Так, видалити'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
