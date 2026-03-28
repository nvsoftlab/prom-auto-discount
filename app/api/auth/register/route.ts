import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email та пароль обов'язкові" }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Пароль повинен містити мінімум 8 символів' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Користувач з таким email вже існує' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: { email, name: name || null, password: hashed },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
