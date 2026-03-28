import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
        <Link href={`/dashboard/shops/${shopId}`} className="text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors">
          ← Назад до налаштувань
        </Link>
        <h1 className="text-2xl font-bold mt-3 text-[#01011b]">Журнал синхронізацій</h1>
        <p className="text-[#5c5c7a] text-sm mt-1">{shop.name}</p>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#dadae8] rounded-xl">
          <p className="text-[#5c5c7a]">Синхронізацій ще не було</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-[#dadae8] rounded-lg px-4 py-3 flex items-start gap-4 shadow-sm"
            >
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 mt-0.5 ${
                log.status === 'SUCCESS'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {log.status === 'SUCCESS' ? 'Успішно' : 'Помилка'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#01011b] break-words">{log.message}</p>
                <p className="text-xs text-[#5c5c7a] mt-1">
                  {new Date(log.createdAt).toLocaleString('uk-UA')}
                </p>
              </div>
              {log.status === 'SUCCESS' && (
                <span className="text-sm text-[#5c5c7a] shrink-0">
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
