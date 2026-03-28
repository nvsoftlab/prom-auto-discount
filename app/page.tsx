import {
  FadeIn,
  FadeUp,
  FloatingBadge,
} from '@/components/landing/animated-section';
import {
  MobileNav,
  NavLinks,
  ScrollButton,
  WaitlistButton,
} from '@/components/landing/nav-links';
import {
  faArrowRight,
  faCheck,
  faGear,
  faKey,
  faMoon,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { WaitlistForm } from '@/components/landing/waitlist-form';

const steps = [
  {
    num: '01',
    icon: faKey,
    title: 'Підключіть магазин',
    desc: 'Вставте API-ключ від Prom.ua. Токен шифрується AES-256 і ніколи не зберігається у відкритому вигляді.',
  },
  {
    num: '02',
    icon: faGear,
    title: 'Налаштуйте умови',
    desc: 'Оберіть відсоток знижки та тривалість 1–3 дні. Система сама знатиме, коли треба оновити - і зробить це до того, як значок погасне.',
  },
  {
    num: '03',
    icon: faMoon,
    title: 'Спіть спокійно',
    desc: 'Щоночі о 23:50 PromAutoDiscount оновлює дати знижок - значки "Знижка" не гаснуть ніколи.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '199',
    sub: '1 магазин',
    features: ['1 підключений магазин', 'Підтримка'],
    accent: false,
  },
  {
    name: 'Business',
    price: '499',
    sub: 'До 5 магазинів',
    features: ['До 5 магазинів', 'Підтримка'],
    accent: true,
  },
  {
    name: 'Unlimited',
    price: '999',
    sub: 'Безліміт',
    features: ['Необмежена кількість магазинів', 'Пріоритетна підтримка'],
    accent: false,
  },
];

export default function LandingPage() {
  return (
    <div
      className="flex flex-col min-h-screen bg-white text-[#01011b]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#dadae8] shadow-sm px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="PromAutoDiscount"
              height={36}
              width={180}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>

          {/* Desktop nav links */}
          <NavLinks />

          {/* Desktop auth */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              href="/login"
              className="text-sm text-[#5c5c7a] hover:text-[#01011b] transition-colors px-3 py-1.5"
            >
              Увійти
            </Link>
            <WaitlistButton className="text-sm font-semibold bg-[#7b04df] hover:bg-[#6200d1] text-white transition-colors px-4 py-2 rounded-lg cursor-pointer">
              Спробувати безкоштовно
            </WaitlistButton>
          </div>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-4 md:px-6 pt-14 md:pt-28 pb-12 md:pb-24">
        {/* Subtle violet glow behind hero */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#7b04df]/5 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <FloatingBadge>
            <div className="inline-flex items-center gap-2 bg-[#7b04df]/8 border border-[#7b04df]/20 rounded-full px-4 py-1.5 text-sm text-[#7b04df] font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7b04df] animate-pulse" />
              Для продавців Prom.ua · 3 дні безкоштовно
            </div>
          </FloatingBadge>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-[#01011b]">
              Значки «Знижка» на <span className="text-[#7b04df]">Prom.ua</span>
              <br />
              гаснуть - ми оновлюємо їх автоматично
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-base md:text-xl text-[#5c5c7a] max-w-2xl mx-auto mb-8 leading-relaxed">
              На Prom.ua знижки мають термін дії - коли він спливає, значок
              «Знижка» зникає з лістингу і товар губиться серед конкурентів.
              PromAutoDiscount щоночі о{' '}
              <strong className="text-[#01011b] font-semibold">23:50</strong>{' '}
              оновлює дати знижок через офіційний API - без вашої участі.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.3}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <WaitlistButton className="inline-flex items-center gap-2 bg-[#7b04df] hover:bg-[#6200d1] text-white font-semibold px-6 md:px-8 py-3.5 rounded-lg text-sm md:text-base transition-colors shadow-md shadow-[#7b04df]/20 w-full sm:w-auto justify-center cursor-pointer">
              Розпочати безкоштовно
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </WaitlistButton>
            <ScrollButton target="how" />
          </FadeUp>

          {/* Mock dashboard preview */}
          <FadeIn
            delay={0.5}
            className="mt-12 md:mt-20 w-full max-w-3xl mx-auto"
          >
            <div className="rounded-xl border border-[#dadae8] bg-[#f5f5f7] overflow-hidden shadow-lg shadow-black/8">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#dadae8] bg-white">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="flex-1 mx-4">
                  <div className="bg-[#f5f5f7] border border-[#dadae8] rounded px-3 py-1 text-xs text-[#5c5c7a] text-center max-w-xs mx-auto">
                    promauto.app/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard preview body */}
              <div className="p-4 md:p-6 bg-[#f5f5f7]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="h-4 w-28 bg-[#dadae8] rounded mb-1.5" />
                    <div className="h-3 w-40 bg-[#e8e8f0] rounded" />
                  </div>
                  <div className="h-8 w-32 bg-[#7b04df] rounded-lg opacity-80" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      name: 'Магазин Одяг',
                      status: 'Активний',
                      items: '147 товарів',
                      active: true,
                    },
                    {
                      name: 'Електроніка UA',
                      status: 'Активний',
                      items: '89 товарів',
                      active: true,
                    },
                    {
                      name: 'Дім та Сад',
                      status: 'Призупинено',
                      items: '-',
                      active: false,
                    },
                  ].map((shop, i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#dadae8] rounded-lg p-3 md:p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-sm text-[#01011b]">
                          {shop.name}
                        </div>
                        <div
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${shop.active ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}
                        >
                          {shop.status}
                        </div>
                      </div>
                      <div className="text-xs text-[#5c5c7a]">
                        Оновлено сьогодні · {shop.items}
                      </div>
                      <div className="flex gap-2 mt-2.5">
                        <div className="h-5 flex-1 bg-[#f5f5f7] border border-[#dadae8] rounded" />
                        <div className="h-5 w-20 bg-[#7b04df]/80 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#9999b3] mt-2">
              Інтерфейс дашборду PromAutoDiscount
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-[#dadae8] py-6 md:py-8 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs text-[#9999b3] uppercase tracking-widest mb-4">
            Працює з маркетплейсом
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#7b04df] flex items-center justify-center font-black text-white text-sm shrink-0">
                P
              </div>
              <span className="font-bold text-[#01011b] text-lg tracking-tight">
                Prom.ua
              </span>
            </div>
            <span className="text-[#5c5c7a] text-sm">Офіційне API v1</span>
            <span className="text-[#5c5c7a] text-sm">AES-256 шифрування</span>
            <span className="text-[#5c5c7a] text-sm">Kyiv TZ підтримка</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10 md:mb-14">
              <div className="text-[#7b04df] text-xs font-semibold uppercase tracking-widest mb-3">
                Як це працює
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#01011b]">
                Три кроки до автоматизації
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div className="bg-white border border-[#dadae8] rounded-xl p-5 md:p-6 hover:border-[#7b04df]/30 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#7b04df]/8 border border-[#7b04df]/15 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="w-4 h-4 text-[#7b04df]"
                      />
                    </div>
                    <span className="text-xs font-mono text-[#7b04df]/50 font-semibold">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 text-[#01011b]">
                    {step.title}
                  </h3>
                  <p className="text-[#5c5c7a] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="py-16 md:py-24 px-4 md:px-6 bg-[#f5f5f7] border-y border-[#dadae8]"
      >
        <div className="max-w-xl mx-auto">
          <FadeUp>
            <div className="text-center mb-8">
              <div className="text-[#7b04df] text-xs font-semibold uppercase tracking-widest mb-3">
                Ранній доступ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#01011b] mb-3">
                Залиште контакт - ми зв'яжемося
              </h2>
              <p className="text-[#5c5c7a]">
                Залиште email або Telegram - і ми надішлемо персональне
                запрошення.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <WaitlistForm />
          </FadeUp>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="pt-8 md:pt-10 pb-16 md:pb-24 px-4 md:px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10 md:mb-14">
              <div className="text-[#7b04df] text-xs font-semibold uppercase tracking-widest mb-3">
                Тарифи
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#01011b] mb-3">
                Прозорі ціни
              </h2>
              <p className="text-[#5c5c7a]">
                Без прихованих платежів. Скасуйте будь-коли.
              </p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {plans.map((plan, i) => (
              <FadeUp key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col rounded-xl border p-5 md:p-6 h-full transition-all hover:-translate-y-1 hover:shadow-md ${
                    plan.accent
                      ? 'bg-[#7b04df]/4 border-[#7b04df]/40 shadow-sm shadow-[#7b04df]/10'
                      : 'bg-white border-[#dadae8]'
                  }`}
                >
                  {plan.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-[#7b04df] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        Найпопулярніший
                      </div>
                    </div>
                  )}
                  <div className="mb-5">
                    <div className="text-lg font-bold text-[#01011b] mb-0.5">
                      {plan.name}
                    </div>
                    <div className="text-[#5c5c7a] text-sm mb-3">
                      {plan.sub}
                    </div>
                    <div className="flex items-end gap-1 mb-3">
                      <span className="text-4xl font-extrabold text-[#01011b]">
                        {plan.price}
                      </span>
                      <span className="text-[#5c5c7a] text-sm mb-1.5">
                        грн / міс
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                      3 дні безкоштовно
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-5 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-[#01011b]"
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="w-3.5 h-3.5 text-[#7b04df] shrink-0 mt-0.5"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <WaitlistButton
                    className={`w-full text-center font-semibold py-3 rounded-lg text-sm transition-colors cursor-pointer ${
                      plan.accent
                        ? 'bg-[#7b04df] hover:bg-[#6200d1] text-white shadow-sm'
                        : 'bg-[#f5f5f7] hover:bg-[#ebebf2] text-[#01011b] border border-[#dadae8]'
                    }`}
                  >
                    Почати зараз
                  </WaitlistButton>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-[#7b04df]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <FontAwesomeIcon
              icon={faRocket}
              className="w-8 h-8 text-white/80 mb-4"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Значки «Знижка» не повинні гаснути
            </h2>
            <p className="text-white/70 mb-7 text-sm md:text-base">
              Підключіть перший магазин за 2 хвилини. Перші 3 дні - безкоштовно.
            </p>
            <WaitlistButton className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#7b04df] font-semibold px-6 md:px-8 py-3.5 rounded-lg transition-colors shadow-sm text-sm md:text-base cursor-pointer">
              Розпочати безкоштовно
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </WaitlistButton>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#dadae8] py-6 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#5c5c7a]">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="PromAutoDiscount"
              height={24}
              width={120}
              className="h-6 w-auto object-contain"
            />
          </div>
          <span className="text-xs text-center text-[#9999b3]">
            © {new Date().getFullYear()} PromAutoDiscount. Всі права захищені.
          </span>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <Link
              href="/login"
              className="hover:text-[#01011b] transition-colors"
            >
              Увійти
            </Link>
            <Link
              href="/offer"
              className="hover:text-[#01011b] transition-colors"
            >
              Договір оферти
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#01011b] transition-colors"
            >
              Конфіденційність
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#01011b] transition-colors"
            >
              Умови
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
