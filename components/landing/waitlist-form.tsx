'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function WaitlistForm() {
  const [form, setForm] = useState({ name: '', email: '', telegram: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Вкажіть ваше ім\'я')
      return
    }
    if (!form.email && !form.telegram) {
      setError('Вкажіть хоча б один спосіб зв\'язку')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) setDone(true)
    else setError('Щось пішло не так. Спробуйте ще раз.')
  }

  if (done) {
    return (
      <div className="bg-white border border-[#dadae8] rounded-xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-[#01011b] mb-2">Заявку отримано!</h3>
        <p className="text-sm text-[#5c5c7a]">Ми зв'яжемося з вами найближчим часом і надішлемо персональне запрошення.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#dadae8] rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#01011b]">Ім'я <span className="text-red-500">*</span></label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Як вас звати?"
          className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#01011b]">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="you@example.com"
          className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#01011b]">Telegram</label>
        <input
          value={form.telegram}
          onChange={(e) => set('telegram', e.target.value)}
          placeholder="@username"
          className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#01011b]">Коментар (необов'язково)</label>
        <textarea
          value={form.note}
          onChange={(e) => set('note', e.target.value)}
          placeholder="Кількість магазинів, питання..."
          rows={2}
          className="border border-[#dadae8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b04df]/20 focus:border-[#7b04df] transition-colors resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7b04df] hover:bg-[#6200d1] disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors cursor-pointer"
      >
        {loading ? 'Надсилаємо...' : 'Залишити заявку'}
      </button>
      <p className="text-xs text-[#9999b3] text-center">Вкажіть хоча б email або Telegram</p>
    </form>
  )
}
