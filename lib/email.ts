import nodemailer from 'nodemailer';

export interface ShopFailure {
  name: string;
  errors: string[];
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"PromAutoDiscount" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Відновлення паролю - PromAutoDiscount',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #f5f5f7; padding: 32px 16px;">
        <div style="background: white; border-radius: 12px; padding: 32px; border: 1px solid #dadae8;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #7b04df; border-radius: 10px; color: white; font-weight: 900; font-size: 18px; margin-bottom: 12px;">P</div>
            <h1 style="margin: 0; font-size: 22px; color: #01011b;">PromAutoDiscount</h1>
          </div>

          <h2 style="font-size: 18px; color: #01011b; margin-top: 0;">Відновлення паролю</h2>
          <p style="color: #5c5c7a; line-height: 1.6;">
            Ми отримали запит на відновлення паролю для вашого акаунту.
            Натисніть кнопку нижче, щоб встановити новий пароль.
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #7b04df; color: white; font-weight: 600; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 15px;">
              Встановити новий пароль
            </a>
          </div>

          <p style="color: #9999b3; font-size: 13px; line-height: 1.5;">
            Посилання діє <strong>1 годину</strong>. Якщо ви не запитували відновлення паролю - просто ігноруйте цей лист.
          </p>

          <hr style="border: none; border-top: 1px solid #dadae8; margin: 20px 0;" />
          <p style="color: #9999b3; font-size: 12px; margin: 0; text-align: center;">
            © ${new Date().getFullYear()} PromAutoDiscount · <a href="${process.env.NEXTAUTH_URL}" style="color: #7b04df;">promauto.app</a>
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendTrialExpiringAlert(users: { email: string; name?: string | null; trialEndsAt: Date }[]) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  if (!adminEmail) return

  const rows = users
    .map(
      (u) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#01011b">${u.name || '—'}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#01011b">${u.email}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#dc2626;font-weight:600">
          ${u.trialEndsAt.toLocaleDateString('uk-UA', { timeZone: 'Europe/Kyiv' })}
        </td>
      </tr>`
    )
    .join('')

  await transporter.sendMail({
    from: `"PromAutoDiscount" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `⏰ Тріал закінчується у ${users.length} користувач${users.length > 1 ? 'ів' : 'а'}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f7;padding:32px 16px;">
        <div style="background:white;border-radius:12px;padding:32px;border:1px solid #dadae8;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
            <div style="width:36px;height:36px;background:#7b04df;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:16px;">P</div>
            <span style="font-size:16px;font-weight:700;color:#01011b;">PromAutoDiscount</span>
          </div>
          <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px 16px;margin-bottom:24px;">
            <strong style="color:#c2410c;">⏰ Тріал закінчується завтра</strong>
          </div>
          <p style="color:#5c5c7a;margin-bottom:16px;">Наступні користувачі мають тріал що закінчується завтра. Зв'яжіться з ними або продовжте доступ:</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f5f5f7;">
                <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;color:#5c5c7a;">Ім'я</th>
                <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;color:#5c5c7a;">Email</th>
                <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;color:#5c5c7a;">Закінчується</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div style="margin-top:24px;text-align:center;">
            <a href="${process.env.NEXTAUTH_URL}/admin" style="display:inline-block;background:#7b04df;color:white;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;">
              Відкрити адмін-панель
            </a>
          </div>
          <hr style="border:none;border-top:1px solid #dadae8;margin:24px 0;" />
          <p style="color:#9999b3;font-size:12px;margin:0;text-align:center;">© ${new Date().getFullYear()} PromAutoDiscount</p>
        </div>
      </div>
    `,
  })
}

export async function sendSyncFailureAlert(failures: ShopFailure[]) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const rows = failures
    .map(
      (f) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;font-weight:600;color:#01011b;white-space:nowrap">${f.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#dc2626;font-size:13px;line-height:1.5">${f.errors.join('<br>')}</td>
      </tr>`
    )
    .join('');

  const now = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

  await transporter.sendMail({
    from: `"PromAutoDiscount Monitor" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `⚠️ Sync Alert: ${failures.length} shop${failures.length > 1 ? 's' : ''} failed — ${now}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f7;padding:32px 16px;">
        <div style="background:white;border-radius:12px;padding:32px;border:1px solid #dadae8;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
            <div style="width:36px;height:36px;background:#7b04df;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:16px;flex-shrink:0;">P</div>
            <span style="font-size:16px;font-weight:700;color:#01011b;">PromAutoDiscount Monitor</span>
          </div>

          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px 16px;margin-bottom:24px;">
            <strong style="color:#dc2626;">⚠️ ${failures.length} shop${failures.length > 1 ? 's' : ''} failed to sync</strong>
            <span style="color:#9ca3af;font-size:13px;margin-left:8px;">${now} (Kyiv)</span>
          </div>

          <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f5f5f7;">
                <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#5c5c7a;">Магазин</th>
                <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#5c5c7a;">Помилка</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <div style="margin-top:24px;text-align:center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display:inline-block;background:#7b04df;color:white;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;">
              Відкрити дашборд
            </a>
          </div>

          <hr style="border:none;border-top:1px solid #dadae8;margin:24px 0;" />
          <p style="color:#9999b3;font-size:12px;margin:0;text-align:center;">
            © ${new Date().getFullYear()} PromAutoDiscount · <a href="${process.env.NEXTAUTH_URL}" style="color:#7b04df;">promauto.app</a>
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendShopSyncErrorEmail(to: string, failures: ShopFailure[]) {
  const shopWord = failures.length > 1 ? 'магазинів' : 'магазину';
  const shopList = failures
    .map(
      (f) => `
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-weight:700;color:#01011b;margin-bottom:6px;">🏪 ${f.name}</div>
        <div style="color:#dc2626;font-size:13px;line-height:1.6;">${f.errors.join('<br>')}</div>
      </div>`
    )
    .join('');

  await transporter.sendMail({
    from: `"PromAutoDiscount" <${process.env.SMTP_USER}>`,
    to,
    subject: `Помилка синхронізації ${shopWord} — PromAutoDiscount`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#f5f5f7;padding:32px 16px;">
        <div style="background:white;border-radius:12px;padding:32px;border:1px solid #dadae8;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#7b04df;border-radius:10px;color:white;font-weight:900;font-size:18px;margin-bottom:12px;">P</div>
            <h1 style="margin:0;font-size:20px;color:#01011b;">PromAutoDiscount</h1>
          </div>

          <h2 style="font-size:17px;color:#01011b;margin-top:0;">Проблема з синхронізацією</h2>
          <p style="color:#5c5c7a;line-height:1.6;margin-bottom:20px;">
            Сьогоднішня синхронізація знижок завершилась з помилками. Перевірте правильність API-ключа та статус магазину на Prom.ua.
          </p>

          ${shopList}

          <div style="margin-top:24px;text-align:center;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display:inline-block;background:#7b04df;color:white;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;">
              Перейти до дашборду
            </a>
          </div>

          <p style="color:#9999b3;font-size:13px;line-height:1.5;margin-top:20px;">
            Якщо проблема повторюється — напишіть нам на <a href="mailto:support@promauto.app" style="color:#7b04df;">support@promauto.app</a>
          </p>

          <hr style="border:none;border-top:1px solid #dadae8;margin:20px 0;" />
          <p style="color:#9999b3;font-size:12px;margin:0;text-align:center;">
            © ${new Date().getFullYear()} PromAutoDiscount · <a href="${process.env.NEXTAUTH_URL}" style="color:#7b04df;">promauto.app</a>
          </p>
        </div>
      </div>
    `,
  });
}
