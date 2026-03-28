import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/crypto'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const shops = await prisma.shop.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { syncLogs: true } } },
  })

  return NextResponse.json(shops)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, token, discountPercent, durationDays } = await req.json()

  if (!name || !token) {
    return NextResponse.json({ error: "Назва та токен обов'язкові" }, { status: 400 })
  }

  const { encrypted, iv } = encrypt(token)

  const shop = await prisma.shop.create({
    data: {
      userId: session.user.id,
      name,
      encryptedToken: encrypted,
      iv,
      discountPercent: discountPercent ?? 10,
      durationDays: durationDays ?? 1,
    },
  })

  return NextResponse.json(shop, { status: 201 })
}
