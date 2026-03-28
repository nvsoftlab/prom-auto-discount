import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SignOutButton } from '@/components/dashboard/sign-out-button';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { accessEnabled: true, plan: true, trialEndsAt: true },
  });

  const trialExpired =
    user?.plan === 'trial' &&
    user?.trialEndsAt !== null &&
    user.trialEndsAt < new Date();

  const accessBlocked = !user?.accessEnabled || trialExpired;

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      <header className="bg-white border-b border-[#dadae8] shadow-sm px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PromAutoDiscount"
            height={28}
            width={140}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-[#5c5c7a]">
            {session.user.email}
          </span>
          <SignOutButton />
        </div>
      </header>

      {accessBlocked ? (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white border border-[#dadae8] rounded-xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#01011b] mb-2">
              {trialExpired ? 'Тріал завершився' : 'Доступ обмежено'}
            </h2>
            <p className="text-sm text-[#5c5c7a] mb-6 leading-relaxed">
              {trialExpired
                ? "Ваш безкоштовний тріал завершився. Зв'яжіться з нами щоб продовжити доступ."
                : "Ваш доступ тимчасово обмежено. Зв'яжіться з підтримкою для відновлення."}
            </p>
            <a
              href="mailto:support@promauto.app"
              className="inline-block bg-[#7b04df] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#6200d1] transition-colors"
            >
              Написати в підтримку
            </a>
          </div>
        </div>
      ) : (
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
          {children}
        </main>
      )}
    </div>
  );
}
