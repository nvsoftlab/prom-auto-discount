import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ShopCard } from '@/components/dashboard/shop-card'

const btnPrimary =
  'inline-flex items-center justify-center rounded-lg bg-[#7b04df] hover:bg-[#6200d1] text-white px-4 py-2 text-sm font-semibold transition-colors shadow-sm'

export default async function DashboardPage() {
  const session = await auth()
  const shops = await prisma.shop.findMany({
    where: { userId: session!.user!.id! },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Мої магазини</h1>
          <p className="text-[#5c5c7a] text-sm mt-1">Керуйте автоматичним оновленням знижок</p>
        </div>
        <Link href="/dashboard/shops/new" className={btnPrimary}>
          + Додати магазин
        </Link>
      </div>

      {shops.length === 0 ? (
        <div className="text-center py-24 text-[#5c5c7a]">
          <p className="text-lg mb-4">У вас ще немає магазинів</p>
          <Link href="/dashboard/shops/new" className={btnPrimary}>
            Підключити перший магазин
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  )
}
