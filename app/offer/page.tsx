import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Договір публічної оферти - PromAutoDiscount',
};

export default function OfferPage() {
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
            Договір публічної оферти
          </h1>
          <p className="text-sm text-[#5c5c7a] mb-1">
            про надання доступу до програмного сервісу PromAutoDiscount
          </p>
          <p className="text-sm text-[#5c5c7a] mb-8">
            Редакція від 28 березня 2026 року
          </p>

          {/* Intro box */}
          <div className="bg-[#7b04df]/5 border border-[#7b04df]/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-[#5c5c7a] leading-relaxed">
              Цей документ є офіційною пропозицією (офертою) ФОП [Ваше ім&apos;я
              та прізвище] (далі - «Виконавець») укласти договір про надання
              доступу до сервісу PromAutoDiscount. Реєстрація акаунту або
              здійснення першого платежу вважається повним і беззастережним
              прийняттям (акцептом) умов цього Договору відповідно до ст. 633,
              641, 642 Цивільного кодексу України.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                1. Визначення термінів
              </h2>
              <ul className="space-y-2 text-[#5c5c7a]">
                <li>
                  <strong className="text-[#01011b]">Виконавець</strong> - ФОП
                  [Ваше ім&apos;я та прізвище], ІПН [XXXXXXXXXX].
                </li>
                <li>
                  <strong className="text-[#01011b]">Замовник</strong> - фізична
                  або юридична особа, яка прийняла умови цього Договору шляхом
                  реєстрації.
                </li>
                <li>
                  <strong className="text-[#01011b]">Сервіс</strong> -
                  програмний комплекс PromAutoDiscount, доступний за адресою
                  promauto.app.
                </li>
                <li>
                  <strong className="text-[#01011b]">Тарифний план</strong> -
                  набір умов доступу до Сервісу з визначеною щомісячною
                  вартістю.
                </li>
                <li>
                  <strong className="text-[#01011b]">API-токен</strong> - ключ
                  доступу до API маркетплейсу Prom.ua, що належить Замовнику.
                </li>
                <li>
                  <strong className="text-[#01011b]">Акцепт</strong> -
                  реєстрація акаунту або оплата будь-якого тарифного плану.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                2. Предмет Договору
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Виконавець зобов&apos;язується надавати Замовнику доступ до
                Сервісу, який забезпечує автоматичне оновлення дат знижок у
                магазинах Замовника на маркетплейсі Prom.ua через офіційний API
                щоночі о 23:50 за київським часом, а Замовник
                зобов&apos;язується оплачувати обраний Тарифний план.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                3. Порядок укладення Договору
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Договір вважається укладеним з моменту реєстрації акаунту на
                сайті promauto.app. Замовник підтверджує, що ознайомився з
                умовами Договору, Політикою конфіденційності та Умовами
                використання і погоджується з ними.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                4. Тарифи та вартість послуг
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse mt-2">
                  <thead>
                    <tr className="bg-[#f5f5f7]">
                      <th className="text-left p-3 border border-[#dadae8] font-semibold text-[#01011b]">
                        Тариф
                      </th>
                      <th className="text-left p-3 border border-[#dadae8] font-semibold text-[#01011b]">
                        Кількість магазинів
                      </th>
                      <th className="text-left p-3 border border-[#dadae8] font-semibold text-[#01011b]">
                        Вартість
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5c5c7a]">
                    <tr>
                      <td className="p-3 border border-[#dadae8]">Starter</td>
                      <td className="p-3 border border-[#dadae8]">1 магазин</td>
                      <td className="p-3 border border-[#dadae8] font-medium text-[#01011b]">
                        199 грн / місяць
                      </td>
                    </tr>
                    <tr className="bg-[#f5f5f7]">
                      <td className="p-3 border border-[#dadae8]">Business</td>
                      <td className="p-3 border border-[#dadae8]">
                        До 5 магазинів
                      </td>
                      <td className="p-3 border border-[#dadae8] font-medium text-[#01011b]">
                        499 грн / місяць
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-[#dadae8]">Unlimited</td>
                      <td className="p-3 border border-[#dadae8]">
                        Необмежено
                      </td>
                      <td className="p-3 border border-[#dadae8] font-medium text-[#01011b]">
                        999 грн / місяць
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#5c5c7a] leading-relaxed mt-3">
                Перші 3 (три) календарних дні після реєстрації Замовник
                користується Сервісом безкоштовно (пробний період). Після
                закінчення пробного періоду без здійснення оплати доступ до
                автоматизації призупиняється.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                5. Порядок оплати
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Оплата здійснюється щомісяця наперед через платіжні системи
                LiqPay або WayForPay. Датою оплати є дата зарахування коштів на
                рахунок Виконавця. Виконавець надає Замовнику рахунок-фактуру
                або чек в електронному вигляді на запит.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                6. Повернення коштів
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Замовник має право вимагати повернення коштів за поточний місяць
                протягом 3 (трьох) календарних днів з дати оплати за умови, що
                автоматичний синхронізатор не запускався жодного разу за цей
                час. Для повернення - зверніться на{' '}
                <a
                  href="mailto:support@promauto.app"
                  className="text-[#7b04df] hover:underline"
                >
                  support@promauto.app
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                7. Права та обов&apos;язки Виконавця
              </h2>
              <p className="text-[#5c5c7a] mb-2">
                Виконавець зобов&apos;язується:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[#5c5c7a]">
                <li>
                  Забезпечувати роботу Сервісу 24/7 з цільовим показником
                  доступності 99%.
                </li>
                <li>
                  Зберігати API-токени Замовника у зашифрованому вигляді
                  (AES-256-CBC).
                </li>
                <li>
                  Не передавати дані Замовника третім особам без його згоди.
                </li>
                <li>
                  Повідомляти про планові технічні роботи не менше ніж за 24
                  години.
                </li>
              </ul>
              <p className="text-[#5c5c7a] mt-3 mb-2">Виконавець має право:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#5c5c7a]">
                <li>
                  Змінювати тарифні плани, повідомляючи Замовника за 30 днів.
                </li>
                <li>
                  Припинити доступ до Сервісу у разі порушення Умов
                  використання.
                </li>
                <li>
                  Тимчасово зупиняти Сервіс для технічного обслуговування.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                8. Права та обов&apos;язки Замовника
              </h2>
              <p className="text-[#5c5c7a] mb-2">
                Замовник зобов&apos;язується:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[#5c5c7a]">
                <li>Своєчасно сплачувати обраний Тарифний план.</li>
                <li>Надавати достовірні дані при реєстрації.</li>
                <li>
                  Використовувати Сервіс відповідно до умов API маркетплейсу
                  Prom.ua.
                </li>
                <li>Не передавати доступ до акаунту третім особам.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                9. Відповідальність сторін
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Виконавець не несе відповідальності за збої у роботі API
                маркетплейсу Prom.ua, зміни в правилах маркетплейсу, а також за
                непрямі збитки Замовника. Максимальна відповідальність Виконавця
                обмежується сумою, сплаченою Замовником за поточний календарний
                місяць.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                10. Форс-мажор
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Сторони звільняються від відповідальності за невиконання
                зобов&apos;язань внаслідок обставин непереборної сили (воєнні
                дії, стихійні лиха, відключення інфраструктури, дії державних
                органів тощо), які виникли після укладення Договору і не
                залежать від волі сторін.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                11. Строк дії та розірвання Договору
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Договір набирає чинності з моменту акцепту і діє безстроково.
                Замовник може розірвати Договір у будь-який момент, видаливши
                акаунт. Виконавець може розірвати Договір в односторонньому
                порядку у разі систематичного порушення його умов, повідомивши
                Замовника за 14 днів.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                12. Вирішення спорів
              </h2>
              <p className="text-[#5c5c7a] leading-relaxed">
                Усі спори вирішуються шляхом переговорів. У разі неможливості
                досягти згоди - у судовому порядку відповідно до законодавства
                України за місцем реєстрації Виконавця.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#01011b] mb-2">
                13. Реквізити Виконавця
              </h2>
              <div className="bg-[#f5f5f7] border border-[#dadae8] rounded-lg p-4 text-[#5c5c7a] text-sm space-y-1">
                <p>
                  <strong className="text-[#01011b]">ФОП:</strong> [Ваше
                  ім&apos;я та прізвище]
                </p>
                <p>
                  <strong className="text-[#01011b]">ІПН:</strong> [XXXXXXXXXX]
                </p>
                <p>
                  <strong className="text-[#01011b]">Банк:</strong> [Назва
                  банку]
                </p>
                <p>
                  <strong className="text-[#01011b]">IBAN:</strong>{' '}
                  UA[XXXXXXXXXXXXXXXXXXXXXXXXXX]
                </p>
                <p>
                  <strong className="text-[#01011b]">Email:</strong>{' '}
                  <a
                    href="mailto:support@promauto.app"
                    className="text-[#7b04df] hover:underline"
                  >
                    support@promauto.app
                  </a>
                </p>
              </div>
              <p className="text-xs text-[#9999b3] mt-3">
                ⚠️ Замініть усі поля у дужках [xxx] на ваші реальні дані перед
                публікацією.
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
              href="/terms"
              className="hover:text-[#01011b] transition-colors"
            >
              Умови використання
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
