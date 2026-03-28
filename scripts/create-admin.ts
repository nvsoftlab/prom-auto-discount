import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const EMAIL = 'admin@promauto.app'
const PASSWORD = 'admin123'

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } })

  if (existing) {
    await prisma.user.update({
      where: { email: EMAIL },
      data: { isAdmin: true, accessEnabled: true },
    })
    console.log(`Updated existing user ${EMAIL} → isAdmin=true`)
    return
  }

  const hashed = await bcrypt.hash(PASSWORD, 12)
  await prisma.user.create({
    data: {
      email: EMAIL,
      name: 'Admin',
      password: hashed,
      isAdmin: true,
      accessEnabled: true,
      plan: 'unlimited',
    },
  })
  console.log(`Created admin: ${EMAIL} / ${PASSWORD}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
