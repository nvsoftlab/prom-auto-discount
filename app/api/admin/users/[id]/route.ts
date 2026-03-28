export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()

  const data: Record<string, unknown> = {}

  if (typeof body.accessEnabled === 'boolean') data.accessEnabled = body.accessEnabled
  if (body.plan) data.plan = body.plan

  if (body.startTrial) {
    const now = new Date()
    const end = new Date(now)
    end.setDate(end.getDate() + 3)
    data.trialStartedAt = now
    data.trialEndsAt = end
    data.plan = 'trial'
    data.accessEnabled = true
  }

  const user = await prisma.user.update({ where: { id }, data })
  return NextResponse.json(user)
}
