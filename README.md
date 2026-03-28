# PromAutoDiscount

> Автоматичне оновлення знижок на Prom.ua щоночі о 23:50 — щоб значки «Знижка» ніколи не гасли.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Що це

**PromAutoDiscount** — B2B Micro-SaaS для продавців маркетплейсу Prom.ua.

Щоночі о **23:50** сервіс автоматично оновлює дати знижок на всіх товарах магазину.
Значки «Знижка» та маркери терміновості залишаються активними — покупці бачать акцію, ви отримуєте CTR і продажі.

---

## Стек

| Шар | Технологія |
|---|---|
| Framework | Next.js 16 App Router + TypeScript |
| UI | Shadcn/UI + Tailwind CSS v4 (dark mode) |
| Анімації | Framer Motion |
| Auth | NextAuth.js v5 (Google OAuth + email/password) |
| ORM | Prisma 5 (SQLite dev / PostgreSQL prod) |
| Шифрування | AES-256-CBC (Node.js crypto built-in) |
| API | Prom.ua REST API v1 |

---

## Функціонал

- **Landing page** — анімована, з підтримкою кирилиці (шрифт Inter)
- **Реєстрація / вхід** — через Google або email + пароль (bcrypt)
- **Dashboard** — список магазинів з картками статусу
- **CRUD магазинів** — додати, редагувати, видалити (з каскадним видаленням логів)
- **Шифрування токенів** — API-ключ Prom.ua шифрується AES-256 перед збереженням
- **Ручна синхронізація** — кнопка «Синхронізувати зараз» на кожній картці
- **Toggle Active/Paused** — пауза автоматики для конкретного магазину
- **Журнал синхронізацій** — статус, кількість оновлених товарів, час
- **Cron endpoint** — захищений `CRON_SECRET`, для Vercel Cron / GitHub Actions

---

## Швидкий старт

### 1. Клонувати та встановити залежності

```bash
git clone https://github.com/nvsoftlab/prom-auto-discount.git
cd prom-auto-discount
npm install
```

### 2. Налаштувати змінні середовища

```bash
cp .env.example .env
```

Заповнити `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="згенерувати: openssl rand -hex 32"
NEXTAUTH_URL="http://localhost:3000"

# Опціонально — Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Обов'язково
ENCRYPTION_KEY=""   # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CRON_SECRET=""      # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Ініціалізувати БД

```bash
npx prisma migrate dev
```

### 4. Запустити

```bash
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000)

---

## Архітектура синхронізації

```
POST /api/cron/sync  (захищений Bearer CRON_SECRET)
        │
        ▼
Отримати всі ACTIVE магазини
        │
        ▼ для кожного магазину
Розшифрувати токен (AES-256-CBC)
        │
        ▼
Цикл пагінації (cursor last_id, 100 товарів / запит)
  ├─ GET /products/list?limit=100&last_id=...
  ├─ Фільтр: тільки товари з активною знижкою
  ├─ Оновити date_start = сьогодні, date_end = сьогодні + durationDays
  ├─ POST /products/edit
  ├─ Затримка 500ms (rate limiting)
  └─ Повторити до порожньої відповіді або 200 батчів
        │
        ▼
Записати SyncLog (SUCCESS / ERROR + кількість оновлених)
Оновити lastSyncAt магазину
```

---

## Nightly Cron

### Vercel Cron (`vercel.json`)

```json
{
  "crons": [
    { "path": "/api/cron/sync", "schedule": "50 20 * * *" },
    { "path": "/api/cron/sync", "schedule": "50 21 * * *" }
  ]
}
```

> `20:50 UTC` = `23:50 Kyiv (EET зима)` / `21:50 UTC` = `23:50 Kyiv (EEST літо)`

### GitHub Actions

```yaml
on:
  schedule:
    - cron: '50 20 * * *'
    - cron: '50 21 * * *'
steps:
  - run: |
      curl -X POST ${{ secrets.APP_URL }}/api/cron/sync \
        -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

---

## Структура проєкту

```
app/
├── page.tsx                      # Landing page
├── (auth)/login|register/        # Сторінки авторизації
├── dashboard/                    # Захищений дашборд
│   └── shops/[shopId]/logs/      # Журнал синхронізацій
└── api/
    ├── auth/                     # NextAuth + реєстрація
    ├── shops/[shopId]/sync/      # Ручна синхронізація
    └── cron/sync/                # Нічний крон
lib/
├── crypto.ts                     # AES-256-CBC encrypt/decrypt
├── auth.ts                       # NextAuth config
├── prisma.ts                     # Prisma singleton
└── services/prom-sync.ts         # Ядро синхронізації
prisma/schema.prisma              # User, Shop, SyncLog
```

---

## Безпека

- API-токени **ніколи** не зберігаються у відкритому вигляді
- Кожен токен шифрується унікальним `iv` (AES-256-CBC)
- Cron endpoint захищений `Bearer` токеном
- Всі shop API routes перевіряють власника через сесію

---

## Ліцензія

MIT © 2026 PromAutoDiscount
