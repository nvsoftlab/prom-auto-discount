export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendTrialExpiringAlert } from '@/lib/email'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!auth || auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(tomorrow)
  dayAfter.setDate(dayAfter.getDate() + 1)

  // Users whose trial ends tomorrow
  const expiring = await prisma.user.findMany({
    where: {
      plan: 'trial',
      accessEnabled: true,
      trialEndsAt: { gte: tomorrow, lt: dayAfter },
    },
    select: { email: true, name: true, trialEndsAt: true },
  })

  if (expiring.length > 0) {
    await sendTrialExpiringAlert(
      expiring.map((u) => ({ email: u.email, name: u.name, trialEndsAt: u.trialEndsAt! }))
    ).catch(console.error)
  }

  // Auto-disable access for expired trials
  await prisma.user.updateMany({
    where: {
      plan: 'trial',
      accessEnabled: true,
      trialEndsAt: { lt: new Date() },
    },
    data: { accessEnabled: false },
  })

  return NextResponse.json({ checked: expiring.length })
}
