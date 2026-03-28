'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function InvitePage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [invite, setInvite] = useState<{ email: string } | null>(null);
  const [status, setStatus] = useState<
    'loading' | 'valid' | 'invalid' | 'used'
  >('loading');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/invite/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error === 'used') return setStatus('used');
        if (data.error) return setStatus('invalid');
        setInvite(data);
        setStatus('valid');
      })
      .catch(() => setStatus('invalid'));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!invite) return;
    setLoading(true);
    setError('');

    const res = await fetch('/api/invite/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, name, email: invite.email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Помилка реєстрації');
      setLoading(false);
      return;
    }

    await signIn('credentials', {
      email: invite.email,
      password,
      callbackUrl: '/dashboard',
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#dadae8] rounded-xl shadow-sm p-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="PromAutoDiscount"
              height={32}
              width={160}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {status === 'loading' && (
          <p className="text-center text-[#5c5c7a] text-sm">
            Перевіряємо запрошення...
          </p>
        )}

        {status === 'invalid' && (
          <div className="text-center space-y-3">
            <div className="text-4xl">❌</div>
            <p className="font-semibold text-[#01011b]">
              Посилання недійсне або прострочене
            </p>
            <Link
              href="/"
              className="text-sm text-[#7b04df] hover:text-[#6200d1]"
            >
              ← На головну
            </Link>
          </div>
        )}

        {status === 'used' && (
          <div className="text-center space-y-3">
            <div className="text-4xl">✅</div>
            <p className="font-semibold text-[#01011b]">
              Це запрошення вже використано
            </p>
            <Link
              href="/login"
              className="text-sm text-[#7b04df] hover:text-[#6200d1]"
            >
              Увійти в акаунт
            </Link>
          </div>
        )}

        {status === 'valid' && invite && (
          <>
            <div className="bg-[#7b04df]/5 border border-[#7b04df]/20 rounded-lg px-4 py-3 mb-6 text-center">
              <p className="text-sm text-[#7b04df] font-medium">
                Персональне запрошення для
              </p>
              <p className="font-semibold text-[#01011b] mt-0.5">
                {invite.email}
              </p>
            </div>

            <h1 className="text-xl font-bold text-[#01011b] mb-5">
              Створити акаунт
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#01011b]">
                  Ім'я (необов'язково)
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Як вас звати?"
                  className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#01011b]">
                  Email
                </label>
                <input
                  value={invite.email}
                  disabled
                  className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm bg-[#f5f5f7] text-[#5c5c7a] cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#01011b]">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Мінімум 8 символів"
                  className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7b04df] hover:bg-[#6200d1] disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2"
              >
                {loading ? 'Створюємо акаунт...' : 'Створити акаунт'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
