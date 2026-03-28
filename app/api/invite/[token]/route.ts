export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const invite = await prisma.inviteToken.findUnique({ where: { token } })

  if (!invite) return NextResponse.json({ error: 'invalid' }, { status: 404 })
  if (invite.usedAt) return NextResponse.json({ error: 'used' }, { status: 410 })
  if (invite.expiresAt < new Date()) return NextResponse.json({ error: 'invalid' }, { status: 410 })

  return NextResponse.json({ email: invite.email })
}
