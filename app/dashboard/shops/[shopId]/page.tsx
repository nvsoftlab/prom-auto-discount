import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShopSettingsForm } from '@/components/dashboard/shop-settings-form'

export default async function ShopSettingsPage({ params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  const { shopId } = await params

  const shop = await prisma.shop.findFirst({
    where: { id: shopId, userId: session!.user!.id! },
  })

  if (!shop) notFound()

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors">
          ← Назад до дашборду
        </Link>
        <h1 className="text-2xl font-bold mt-3 text-[#01011b]">{shop.name}</h1>
        <div className="flex gap-3 mt-2">
          <Link href={`/dashboard/shops/${shopId}/logs`} className="text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors">
            Журнал синхронізацій →
          </Link>
        </div>
      </div>
      <ShopSettingsForm shop={shop} />
    </div>
  )
}
