import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, email, phone, telegram, note } = await req.json()

  if (!email && !phone && !telegram) {
    return NextResponse.json({ error: `Вкажіть хоча б один спосіб зв'язку` }, { status: 400 })
  }

  await prisma.waitlist.create({
    data: { name, email, phone, telegram, note },
  })

  return NextResponse.json({ ok: true })
}
