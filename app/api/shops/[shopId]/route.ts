export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/crypto'

async function getOwnedShop(shopId: string, userId: string) {
  return prisma.shop.findFirst({ where: { id: shopId, userId } })
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { shopId } = await params
  const shop = await getOwnedShop(shopId, session.user.id)
  if (!shop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(shop)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { shopId } = await params
  const shop = await getOwnedShop(shopId, session.user.id)
  if (!shop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { name, token, discountPercent, durationDays, status } = await req.json()

  const updateData: Record<string, unknown> = {}
  if (name !== undefined) updateData.name = name
  if (discountPercent !== undefined) updateData.discountPercent = discountPercent
  if (durationDays !== undefined) updateData.durationDays = durationDays
  if (status !== undefined) updateData.status = status
  if (token) {
    const { encrypted, iv } = encrypt(token)
    updateData.encryptedToken = encrypted
    updateData.iv = iv
  }

  const updated = await prisma.shop.update({ where: { id: shopId }, data: updateData })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ shopId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { shopId } = await params
  const shop = await getOwnedShop(shopId, session.user.id)
  if (!shop) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.shop.delete({ where: { id: shopId } })
  return NextResponse.json({ ok: true })
}
