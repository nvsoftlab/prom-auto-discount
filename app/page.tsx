import Link from 'next/link'
import { FadeUp, FadeIn, ScaleIn, FloatingBadge } from '@/components/landing/animated-section'
import { NavLinks, ScrollButton } from '@/components/landing/nav-links'

const steps = [
  {
    num: '01',
    icon: '🔑',
    title: 'Підключіть магазин',
    desc: 'Вставте API-ключ від Prom.ua. Токен шифрується AES-256 і ніколи не зберігається у відкритому вигляді.',
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'Налаштуйте умови',
    desc: 'Оберіть відсоток знижки та тривалість 1–3 дні. Все інше — справа автоматики.',
  },
  {
    num: '03',
    icon: '🌙',
    title: 'Спіть спокійно',
    desc: 'Щоночі о 23:50 PromAuto оновлює дати знижок — значки "Знижка" не гаснуть ніколи.',
  },
]

const plans = [
  {
    name: 'Basic',
    price: '249',
    sub: '1 магазин',
    features: ['1 підключений магазин', 'Щоденне оновлення о 23:50', 'Журнал синхронізацій', 'Ручний запуск'],
    accent: false,
  },
  {
    name: 'Business',
    price: '599',
    sub: 'До 5 магазинів',
    features: ['До 5 магазинів', 'Пріоритетна черга', 'Журнал синхронізацій', 'Ручний запуск', 'Email-сповіщення'],
    accent: true,
  },
  {
    name: 'Unlimited',
    price: '999',
    sub: 'Безліміт',
    features: ['Необмежена кількість', 'Найвища пріоритетність', 'Детальна аналітика', 'Email + Telegram', 'API-доступ'],
    accent: false,
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-800/10 blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm bg-black/20 px-6 py-4 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-black">P</div>
            <span className="text-lg font-bold tracking-tight">PromAuto</span>
          </div>
          <NavLinks />
          <div className="flex gap-3 items-center">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">
              Увійти
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-lg">
              Спробувати безкоштовно
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-24 max-w-5xl mx-auto w-full">
        <FloatingBadge>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            7 днів безкоштовно — без карти
          </div>
        </FloatingBadge>

        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Ваші знижки на{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                Prom.ua
              </span>
            </span>
            <br />
            ніколи не сплять
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Автоматичне оновлення знижок щоночі о <strong className="text-white">23:50</strong>.
            Значки «Знижка» залишаються активними — покупці бачать терміновість, ви отримуєте продажі.
          </p>
        </FadeUp>

        <FadeUp delay={0.3} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            Розпочати безкоштовно
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <ScrollButton target="how" />
        </FadeUp>

        {/* Mock dashboard preview */}
        <FadeIn delay={0.5} className="mt-20 w-full max-w-4xl">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-zinc-500 text-center max-w-xs mx-auto">
                  promauto.app/dashboard
                </div>
              </div>
            </div>
            {/* Mock UI content */}
            <div className="p-6 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="h-5 w-32 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-48 bg-white/5 rounded" />
                </div>
                <div className="h-8 w-36 bg-indigo-600/60 rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Магазин Одяг', status: 'Активний', updated: '147 товарів', color: 'emerald' },
                  { name: 'Електроніка UA', status: 'Активний', updated: '89 товарів', color: 'emerald' },
                  { name: 'Дім та Сад', status: 'Призупинено', updated: '—', color: 'zinc' },
                ].map((shop, i) => (
                  <div key={i} className={`bg-white/5 border border-white/8 rounded-xl p-4 ${i === 2 ? 'md:col-span-1' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-sm text-white">{shop.name}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${shop.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-700/50 text-zinc-400'}`}>
                        {shop.status}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">Оновлено сьогодні · {shop.updated}</div>
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 flex-1 bg-white/5 rounded" />
                      <div className="h-6 w-24 bg-indigo-600/40 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-3">Інтерфейс дашборду PromAuto</p>
        </FadeIn>
      </section>

      {/* Logos / Social proof */}
      <section className="relative z-10 border-y border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-6">Працює з маркетплейсом</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {/* Prom.ua stylized logo */}
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-black text-white text-sm">P</div>
              <span className="font-bold text-zinc-300 text-xl tracking-tight">Prom.ua</span>
            </div>
            <div className="text-zinc-700 text-sm">Офіційне API v1</div>
            <div className="text-zinc-700 text-sm">AES-256 шифрування</div>
            <div className="text-zinc-700 text-sm">Kyiv TZ підтримка</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Як це працює</div>
              <h2 className="text-4xl font-bold">Три кроки до автоматизації</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.15}>
                <div className="relative bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-xl">
                      {step.icon}
                    </div>
                    <span className="text-xs font-mono text-indigo-400/60">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScaleIn>
            <div className="grid grid-cols-3 gap-6 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border border-indigo-500/20 rounded-2xl p-8">
              {[
                { value: '23:50', label: 'Час запуску щодня' },
                { value: '100%', label: 'Uptime автоматики' },
                { value: 'AES-256', label: 'Шифрування токенів' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Тарифи</div>
              <h2 className="text-4xl font-bold mb-3">Прозорі ціни</h2>
              <p className="text-zinc-400">Без прихованих платежів. Скасуйте будь-коли.</p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.1}>
                <div className={`relative flex flex-col rounded-2xl border p-6 h-full transition-all hover:-translate-y-1 ${
                  plan.accent
                    ? 'bg-gradient-to-b from-indigo-600/20 to-violet-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-white/3 border-white/8 hover:border-white/15'
                }`}>
                  {plan.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Найпопулярніший
                      </div>
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-lg font-bold mb-0.5">{plan.name}</div>
                    <div className="text-zinc-400 text-sm mb-4">{plan.sub}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-zinc-400 text-sm mb-1.5">грн / міс</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                        <svg className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`w-full text-center font-semibold py-3 rounded-xl text-sm transition-all ${
                      plan.accent
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-white/8 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    Почати зараз
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center bg-gradient-to-br from-indigo-600/20 via-violet-600/15 to-purple-600/10 border border-indigo-500/25 rounded-3xl p-12">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-3">Готові автоматизувати знижки?</h2>
              <p className="text-zinc-400 mb-8">Підключіть перший магазин за 2 хвилини. Перші 7 днів — безкоштовно.</p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
              >
                Розпочати безкоштовно
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-black text-white">P</div>
            <span className="font-semibold text-zinc-400">PromAuto</span>
          </div>
          <span>© {new Date().getFullYear()} PromAuto. Всі права захищені.</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-zinc-400 transition-colors">Увійти</Link>
            <Link href="/register" className="hover:text-zinc-400 transition-colors">Реєстрація</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
