import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Політика конфіденційності - PromAutoDiscount',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Nav */}
      <header className="bg-white border-b border-[#dadae8] shadow-sm px-4 md:px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PromAutoDiscount"
              height={28}
              width={140}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-[#7b04df] hover:text-[#6200d1] transition-colors"
          >
            ← На головну
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="bg-white border border-[#dadae8] rounded-xl shadow-sm p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#01011b] mb-2">
            Політика конфіденційності
          </h1>
          <p className="text-sm text-[#5c5c7a] mb-8">
            Редакція від 28 березня 2026 року
          </p>

          <div className="prose prose-sm max-w-none text-[#01011b] space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                1. Загальні положення
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ця Політика конфіденційності (далі - «Політика») описує, як ФОП
                [Ваше ім&apos;я та прізвище] (далі - «PromAutoDiscount», «ми»,
                «нас») збирає, використовує та захищає персональні дані
                користувачів сервісу PromAutoDiscount, доступного за адресою{' '}
                <strong>promauto.app</strong>.
              </p>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Використовуючи сервіс, ви погоджуєтесь з умовами цієї Політики.
                Якщо ви не згодні - будь ласка, припиніть використання сервісу.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                2. Які дані ми збираємо
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>
                  <strong className="text-[#01011b]">Облікові дані:</strong>{' '}
                  електронна адреса (email), ім&apos;я - під час реєстрації.
                </li>
                <li>
                  <strong className="text-[#01011b]">Дані магазину:</strong>{' '}
                  назва магазину, API-токен Prom.ua (зберігається виключно у
                  зашифрованому вигляді AES-256-CBC).
                </li>
                <li>
                  <strong className="text-[#01011b]">Технічні дані:</strong>{' '}
                  IP-адреса, тип браузера, дата та час запитів - у стандартних
                  логах сервера.
                </li>
                <li>
                  <strong className="text-[#01011b]">Платіжні дані:</strong> ми
                  не збираємо та не зберігаємо дані банківських карток. Платежі
                  обробляються провайдером (LiqPay / WayForPay).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                3. Як ми використовуємо дані
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>
                  Надання та підтримка сервісу автоматичного оновлення знижок на
                  Prom.ua.
                </li>
                <li>Автентифікація та захист вашого акаунту.</li>
                <li>
                  Відправлення технічних сповіщень (помилки синхронізації,
                  важливі оновлення).
                </li>
                <li>
                  Покращення якості сервісу на основі знеособленої аналітики.
                </li>
                <li>Виконання вимог законодавства України.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                4. Зберігання та захист даних
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Усі дані зберігаються на захищених серверах. API-токени Prom.ua
                шифруються за алгоритмом AES-256-CBC з унікальним вектором
                ініціалізації для кожного запису. Ключ шифрування зберігається
                окремо від бази даних.
              </p>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Ми не передаємо ваші дані третім особам, крім випадків,
                передбачених законодавством України, або технічних підрядників
                (хостинг, платіжні системи), які зобов&apos;язані дотримуватись
                конфіденційності.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                5. Ваші права
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed mb-2">
                Відповідно до Закону України «Про захист персональних даних» ви
                маєте право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>Отримати доступ до своїх персональних даних.</li>
                <li>Вимагати виправлення або видалення неточних даних.</li>
                <li>Відкликати згоду на обробку даних та видалити акаунт.</li>
                <li>
                  Подати скаргу до Уповноваженого Верховної Ради України з прав
                  людини.
                </li>
              </ul>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Для реалізації прав звертайтесь:{' '}
                <a
                  href="mailto:privacy@promauto.app"
                  className="text-[#7b04df] hover:underline"
                >
                  privacy@promauto.app
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                6. Cookies
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ми використовуємо технічно необхідні cookies для підтримки сесії
                авторизації (NextAuth.js). Маркетингові або аналітичні cookies
                не використовуються без вашої згоди.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                7. Зміни до Політики
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ми можемо оновлювати цю Політику. Про суттєві зміни ми
                повідомимо на email. Актуальна версія завжди доступна на цій
                сторінці.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                8. Контакти
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                З питань конфіденційності звертайтесь:
                <br />
                Email:{' '}
                <a
                  href="mailto:privacy@promauto.app"
                  className="text-[#7b04df] hover:underline"
                >
                  privacy@promauto.app
                </a>
                <br />
                ФОП [Ваше ім&apos;я та прізвище], ІПН: [XXXXXXXXXX]
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#dadae8] py-5 px-4 md:px-6 bg-white mt-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#5c5c7a]">
          <span>© {new Date().getFullYear()} PromAutoDiscount</span>
          <div className="flex gap-5">
            <Link
              href="/terms"
              className="hover:text-[#01011b] transition-colors"
            >
              Умови використання
            </Link>
            <Link
              href="/offer"
              className="hover:text-[#01011b] transition-colors"
            >
              Договір оферти
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
