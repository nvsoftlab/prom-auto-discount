import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SignOutButton } from '@/components/dashboard/sign-out-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (!session.user.isAdmin) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      <header className="bg-white border-b border-[#dadae8] shadow-sm px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PromAutoDiscount"
              height={28}
              width={140}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <span className="text-xs bg-[#7b04df] text-white px-2 py-0.5 rounded-full font-semibold">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-[#5c5c7a] hover:text-[#01011b] transition-colors"
          >
            Dashboard
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
