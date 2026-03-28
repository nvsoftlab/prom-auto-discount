import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Умови використання - PromAutoDiscount',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
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
            Умови використання
          </h1>
          <p className="text-sm text-[#5c5c7a] mb-8">
            Редакція від 28 березня 2026 року
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                1. Прийняття умов
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Реєструючись або використовуючи сервіс PromAutoDiscount (далі -
                «Сервіс»), ви (далі - «Користувач») погоджуєтесь з цими Умовами
                використання. Якщо ви не погоджуєтесь - не використовуйте
                Сервіс.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                2. Опис Сервісу
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                PromAutoDiscount - це програмний сервіс, який автоматично
                оновлює дати знижок у магазинах на маркетплейсі Prom.ua щоночі о
                23:50 (за київським часом) через офіційний API Prom.ua. Сервіс є
                інструментом автоматизації та не надає гарантій щодо результатів
                продажів.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                3. Реєстрація та акаунт
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>
                  Для використання Сервісу необхідна реєстрація з дійсним email.
                </li>
                <li>
                  Ви відповідаєте за збереження конфіденційності свого паролю.
                </li>
                <li>
                  Ви зобов&apos;язані надавати достовірні дані при реєстрації.
                </li>
                <li>Один акаунт - для одного суб&apos;єкта господарювання.</li>
                <li>
                  Ми залишаємо право заблокувати акаунт у разі порушення цих
                  Умов.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                4. API-токен та доступ до Prom.ua
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Надаючи API-токен вашого магазину Prom.ua, ви підтверджуєте, що
                маєте законне право на використання цього токену та надаєте
                PromAutoDiscount право виконувати API-запити від вашого імені
                виключно для оновлення дат знижок.
              </p>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Токен зберігається у зашифрованому вигляді (AES-256-CBC) і не
                використовується для будь-яких інших дій, крім передбачених
                функціоналом Сервісу.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                5. Тарифи та оплата
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>
                  <strong className="text-[#01011b]">Starter</strong> - 199
                  грн/міс, 1 магазин.
                </li>
                <li>
                  <strong className="text-[#01011b]">Business</strong> - 499
                  грн/міс, до 5 магазинів.
                </li>
                <li>
                  <strong className="text-[#01011b]">Unlimited</strong> - 999
                  грн/міс, необмежена кількість магазинів.
                </li>
              </ul>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Оплата здійснюється щомісяця наперед. Після закінчення пробного
                3-денного періоду без оплати доступ до автоматизації
                призупиняється. Повернення коштів за невикористаний період
                можливе протягом 3 днів після оплати - за зверненням на
                support@promauto.app.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                6. Заборонене використання
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed mb-2">
                Забороняється:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a]">
                <li>
                  Використовувати Сервіс для порушення умов Prom.ua або чинного
                  законодавства.
                </li>
                <li>Передавати доступ до акаунту третім особам.</li>
                <li>Здійснювати реверс-інжиніринг або копіювання Сервісу.</li>
                <li>
                  Навантажувати Сервіс автоматизованими запитами понад розумну
                  норму.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                7. Відмова від гарантій та обмеження відповідальності
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Сервіс надається «як є». Ми не гарантуємо безперебійну роботу
                API Prom.ua, оскільки він є зовнішнім і не залежить від нас.
                PromAutoDiscount не несе відповідальності за:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#5c5c7a] mt-2">
                <li>
                  Збої в роботі API Prom.ua або зміну умов доступу до нього.
                </li>
                <li>Втрачений прибуток або непрямі збитки Користувача.</li>
                <li>Дії або бездіяльність маркетплейсу Prom.ua.</li>
              </ul>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Максимальна відповідальність PromAutoDiscount обмежується сумою,
                сплаченою Користувачем за поточний місяць.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                8. Припинення доступу
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ви можете видалити акаунт у будь-який час в налаштуваннях. Ми
                залишаємо право призупинити або закрити акаунт у разі порушення
                цих Умов без попередження. У разі планового закриття Сервісу ми
                повідомимо Користувачів не менше ніж за 30 днів.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                9. Зміни умов
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ми можемо змінювати ці Умови, повідомляючи про суттєві зміни на
                email. Продовження використання Сервісу після набрання чинності
                нової редакції означає вашу згоду з нею.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                10. Застосовне право
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Ці Умови регулюються законодавством України. Спори вирішуються
                шляхом переговорів, а у разі неможливості - в суді за місцем
                реєстрації ФОП.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                11. Контакти
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Email:{' '}
                <a
                  href="mailto:support@promauto.app"
                  className="text-[#7b04df] hover:underline"
                >
                  support@promauto.app
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
              href="/privacy"
              className="hover:text-[#01011b] transition-colors"
            >
              Конфіденційність
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
