export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { shopId } = await params
  const shop = await prisma.shop.findFirst({ where: { id: shopId, userId: session.user.id } })
  if (!shop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const logs = await prisma.syncLog.findMany({
    where: { shopId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json(logs)
}
