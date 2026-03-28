export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: "Email обов'язковий" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success - don't reveal if email exists
    if (!user || !user.password) {
      return NextResponse.json({ success: true });
    }

    // Delete old tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    });

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: { email: email.toLowerCase(), token, expires },
    });

    await sendPasswordResetEmail(email.toLowerCase(), token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[forgot-password]', err);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
