'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) setError(data.error || 'Щось пішло не так');
    else setSent(true);
  }

  return (
    <div className="w-full max-w-md bg-white border border-[#dadae8] rounded-xl shadow-sm p-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 justify-center mb-4"
        >
          <Image
            src="/logo.png"
            alt="PromAutoDiscount"
            height={32}
            width={160}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <h1 className="text-xl font-bold text-[#01011b]">Забули пароль?</h1>
        <p className="text-sm text-[#5c5c7a] mt-1">
          Згадали?{' '}
          <Link
            href="/login"
            className="text-[#7b04df] hover:text-[#6200d1] font-medium"
          >
            Увійти
          </Link>
        </p>
      </div>

      {sent ? (
        <div className="text-center space-y-3 py-4">
          <div className="text-5xl mb-2">📬</div>
          <p className="text-[#01011b] font-semibold">Перевірте пошту</p>
          <p className="text-[#5c5c7a] text-sm leading-relaxed">
            Якщо акаунт з адресою{' '}
            <strong className="text-[#01011b]">{email}</strong> існує - ми
            надіслали посилання для відновлення паролю.
          </p>
          <p className="text-[#9999b3] text-xs">
            Не отримали? Перевірте папку «Спам».
          </p>
          <Link
            href="/login"
            className="inline-block mt-3 text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors font-medium"
          >
            ← Повернутися до входу
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-[#5c5c7a] text-sm leading-relaxed -mt-2">
            Введіть email вашого акаунту. Ми надішлемо посилання для відновлення
            паролю.
          </p>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#01011b]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm text-[#01011b] bg-white placeholder-[#9999b3] focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7b04df] hover:bg-[#6200d1] disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Надсилаємо...' : 'Надіслати посилання'}
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-[#9999b3] hover:text-[#5c5c7a] transition-colors"
          >
            ← Повернутися до входу
          </Link>
        </form>
      )}
    </div>
  );
}
