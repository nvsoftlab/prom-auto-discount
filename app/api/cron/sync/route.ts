export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { syncShopAndLog } from '@/lib/services/prom-sync'
import { sendSyncFailureAlert, sendShopSyncErrorEmail, ShopFailure } from '@/lib/email'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!auth || auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shops = await prisma.shop.findMany({
    where: { status: 'ACTIVE' },
    include: { user: { select: { email: true } } },
  })

  const results: {
    shopId: string
    name: string
    userEmail: string
    errors: string[]
  }[] = []

  for (const shop of shops) {
    try {
      const result = await syncShopAndLog(shop.id)
      results.push({
        shopId: shop.id,
        name: shop.name,
        userEmail: shop.user.email ?? '',
        errors: result.errors,
      })
    } catch (e: any) {
      results.push({
        shopId: shop.id,
        name: shop.name,
        userEmail: shop.user.email ?? '',
        errors: [e.message],
      })
    }
  }

  const failures = results.filter((r) => r.errors.length > 0)

  if (failures.length > 0) {
    // Admin alert with full summary
    await sendSyncFailureAlert(
      failures.map((f) => ({ name: f.name, errors: f.errors }))
    ).catch(console.error)

    // Per-user alerts grouped by email
    const byUser = new Map<string, ShopFailure[]>()
    for (const f of failures) {
      if (!f.userEmail) continue
      if (!byUser.has(f.userEmail)) byUser.set(f.userEmail, [])
      byUser.get(f.userEmail)!.push({ name: f.name, errors: f.errors })
    }
    for (const [email, shopFailures] of byUser) {
      await sendShopSyncErrorEmail(email, shopFailures).catch(console.error)
    }
  }

  return NextResponse.json({ synced: results.length, failures: failures.length, results })
}
