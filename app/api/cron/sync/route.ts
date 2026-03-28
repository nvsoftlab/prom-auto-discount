import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { syncShopAndLog } from '@/lib/services/prom-sync'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!auth || auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shops = await prisma.shop.findMany({ where: { status: 'ACTIVE' } })

  const results = []
  for (const shop of shops) {
    try {
      const result = await syncShopAndLog(shop.id)
      results.push({ shopId: shop.id, name: shop.name, ...result })
    } catch (e: any) {
      results.push({ shopId: shop.id, name: shop.name, error: e.message })
    }
  }

  return NextResponse.json({ synced: results.length, results })
}
