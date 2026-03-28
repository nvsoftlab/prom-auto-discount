import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function SyncLogsPage({ params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  const { shopId } = await params

  const shop = await prisma.shop.findFirst({
    where: { id: shopId, userId: session!.user!.id! },
  })
  if (!shop) notFound()

  const logs = await prisma.syncLog.findMany({
    where: { shopId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/shops/${shopId}`}
          className="text-sm text-zinc-400 hover:text-zinc-200"
        >
          ← Назад до налаштувань
        </Link>
        <h1 className="text-2xl font-bold mt-3">Журнал синхронізацій</h1>
        <p className="text-zinc-400 text-sm mt-1">{shop.name}</p>
      </div>

      {logs.length === 0 ? (
        <p className="text-zinc-500 text-center py-16">Синхронізацій ще не було</p>
      ) : (
        <div className="flex flex-col gap-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 flex items-start gap-4"
            >
              <Badge
                className={
                  log.status === 'SUCCESS'
                    ? 'bg-emerald-900 text-emerald-300 border-emerald-700 shrink-0'
                    : 'bg-red-900 text-red-300 border-red-800 shrink-0'
                }
              >
                {log.status === 'SUCCESS' ? 'Успішно' : 'Помилка'}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200 break-words">{log.message}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(log.createdAt).toLocaleString('uk-UA')}
                </p>
              </div>
              {log.status === 'SUCCESS' && (
                <span className="text-sm text-zinc-400 shrink-0">
                  {log.itemsUpdatedCount} товарів
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
