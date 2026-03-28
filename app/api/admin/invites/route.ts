import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // valid 7 days

  const invite = await prisma.inviteToken.create({
    data: { email, expiresAt },
  })

  const url = `${process.env.NEXTAUTH_URL}/invite/${invite.token}`
  return NextResponse.json({ url, token: invite.token })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const invites = await prisma.inviteToken.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(invites)
}
