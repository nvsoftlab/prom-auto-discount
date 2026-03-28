'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center space-y-3 py-4">
        <div className="text-4xl">❌</div>
        <p className="text-[#01011b] font-semibold">Недійсне посилання</p>
        <p className="text-[#5c5c7a] text-sm">
          Посилання для відновлення паролю недійсне або застаріло.
        </p>
        <Link
          href="/forgot-password"
          className="inline-block text-sm text-[#7b04df] hover:text-[#6200d1] font-medium transition-colors"
        >
          Запросити нове посилання
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Паролі не співпадають');
      return;
    }
    if (password.length < 8) {
      setError('Пароль має бути не менше 8 символів');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Щось пішло не так');
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-3 py-4">
        <div className="text-5xl mb-2">✅</div>
        <p className="text-[#01011b] font-semibold">Пароль змінено!</p>
        <p className="text-[#5c5c7a] text-sm">
          Перенаправляємо на сторінку входу...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-[#01011b]"
        >
          Новий пароль
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Мінімум 8 символів"
          required
          minLength={8}
          className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm text-[#01011b] bg-white placeholder-[#9999b3] focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm" className="text-sm font-medium text-[#01011b]">
          Повторіть пароль
        </label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Повторіть новий пароль"
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
        {loading ? 'Збереження...' : 'Встановити новий пароль'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md bg-white border border-[#dadae8] rounded-xl shadow-sm p-8">
      {/* Logo */}
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
        <h1 className="text-xl font-bold text-[#01011b]">Новий пароль</h1>
        <p className="text-sm text-[#5c5c7a] mt-1">
          Введіть та підтвердіть новий пароль
        </p>
      </div>

      <Suspense
        fallback={
          <p className="text-[#5c5c7a] text-sm text-center">Завантаження...</p>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
