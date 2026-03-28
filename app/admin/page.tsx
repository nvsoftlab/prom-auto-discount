'use client'

import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faClipboardList,
  faLink,
  faCheck,
  faBan,
  faPlay,
  faCopy,
} from '@fortawesome/free-solid-svg-icons'

type WaitlistEntry = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  telegram: string | null
  note: string | null
  status: string
  createdAt: string
}

type User = {
  id: string
  name: string | null
  email: string
  plan: string
  accessEnabled: boolean
  trialStartedAt: string | null
  trialEndsAt: string | null
  createdAt: string
  _count: { shops: number }
}

const PLANS = ['trial', 'starter', 'business', 'unlimited']
const PLAN_LABELS: Record<string, string> = {
  trial: 'Тріал',
  starter: 'Starter',
  business: 'Business',
  unlimited: 'Unlimited',
}

export default function AdminPage() {
  const [tab, setTab] = useState<'waitlist' | 'users'>('waitlist')
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const loadWaitlist = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/waitlist')
    setWaitlist(await res.json())
    setLoading(false)
  }, [])

  const loadUsers = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    setUsers(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    if (tab === 'waitlist') loadWaitlist()
    else loadUsers()
  }, [tab, loadWaitlist, loadUsers])

  async function generateInvite(email: string) {
    const res = await fetch('/api/admin/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (data.url) {
      await navigator.clipboard.writeText(data.url)
      setCopiedLink(email)
      setTimeout(() => setCopiedLink(null), 3000)
    }
  }

  async function markContacted(id: string) {
    await fetch(`/api/admin/waitlist/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'contacted' }),
    })
    setWaitlist((prev) => prev.map((e) => (e.id === id ? { ...e, status: 'contacted' } : e)))
  }

  async function updateUser(id: string, body: Record<string, unknown>) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      const updated = await res.json()
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)))
    }
  }

  const trialDaysLeft = (endsAt: string | null) => {
    if (!endsAt) return null
    const diff = new Date(endsAt).getTime() - Date.now()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#01011b]">Адмін-панель</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#f5f5f7] border border-[#dadae8] rounded-lg p-1 w-fit mb-6">
        <button
          onClick={() => setTab('waitlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'waitlist' ? 'bg-white text-[#01011b] shadow-sm' : 'text-[#5c5c7a] hover:text-[#01011b]'
          }`}
        >
          <FontAwesomeIcon icon={faClipboardList} className="w-3.5 h-3.5" />
          Заявки ({waitlist.length})
        </button>
        <button
          onClick={() => setTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'users' ? 'bg-white text-[#01011b] shadow-sm' : 'text-[#5c5c7a] hover:text-[#01011b]'
          }`}
        >
          <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" />
          Користувачі ({users.length})
        </button>
      </div>

      {loading && <p className="text-sm text-[#5c5c7a]">Завантаження...</p>}

      {/* Waitlist tab */}
      {tab === 'waitlist' && !loading && (
        <div className="bg-white border border-[#dadae8] rounded-xl overflow-hidden shadow-sm">
          {waitlist.length === 0 ? (
            <div className="text-center py-16 text-[#5c5c7a]">
              <FontAwesomeIcon icon={faClipboardList} className="w-8 h-8 mx-auto mb-3 text-[#dadae8]" />
              <p>Заявок поки немає</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f5f7] text-left text-xs text-[#5c5c7a] uppercase tracking-wider">
                    <th className="px-4 py-3">Ім'я</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Телефон</th>
                    <th className="px-4 py-3">Telegram</th>
                    <th className="px-4 py-3">Нотатка</th>
                    <th className="px-4 py-3">Статус</th>
                    <th className="px-4 py-3">Дата</th>
                    <th className="px-4 py-3">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {waitlist.map((entry) => (
                    <tr key={entry.id} className="hover:bg-[#fafafa]">
                      <td className="px-4 py-3 text-[#01011b]">{entry.name || '—'}</td>
                      <td className="px-4 py-3 text-[#01011b]">{entry.email || '—'}</td>
                      <td className="px-4 py-3 text-[#5c5c7a]">{entry.phone || '—'}</td>
                      <td className="px-4 py-3 text-[#5c5c7a]">{entry.telegram ? `@${entry.telegram.replace('@', '')}` : '—'}</td>
                      <td className="px-4 py-3 text-[#5c5c7a] max-w-[180px] truncate">{entry.note || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.status === 'new'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : entry.status === 'contacted'
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          {entry.status === 'new' ? 'Новий' : entry.status === 'contacted' ? 'Зв\'язались' : 'Конвертований'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#5c5c7a] whitespace-nowrap">
                        {new Date(entry.createdAt).toLocaleDateString('uk-UA')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {entry.status === 'new' && (
                            <button
                              onClick={() => markContacted(entry.id)}
                              title="Позначити як зв'язались"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors border border-yellow-200"
                            >
                              <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                            </button>
                          )}
                          {entry.email && (
                            <button
                              onClick={() => generateInvite(entry.email!)}
                              title={copiedLink === entry.email ? 'Скопійовано!' : 'Згенерувати запрошення'}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors border ${
                                copiedLink === entry.email
                                  ? 'bg-green-50 text-green-600 border-green-200'
                                  : 'bg-[#7b04df]/8 text-[#7b04df] hover:bg-[#7b04df]/15 border-[#7b04df]/20'
                              }`}
                            >
                              <FontAwesomeIcon icon={copiedLink === entry.email ? faCopy : faLink} className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Users tab */}
      {tab === 'users' && !loading && (
        <div className="bg-white border border-[#dadae8] rounded-xl overflow-hidden shadow-sm">
          {users.length === 0 ? (
            <div className="text-center py-16 text-[#5c5c7a]">
              <FontAwesomeIcon icon={faUsers} className="w-8 h-8 mx-auto mb-3 text-[#dadae8]" />
              <p>Користувачів поки немає</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f5f7] text-left text-xs text-[#5c5c7a] uppercase tracking-wider">
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Ім'я</th>
                    <th className="px-4 py-3">Тариф</th>
                    <th className="px-4 py-3">Доступ</th>
                    <th className="px-4 py-3">Тріал</th>
                    <th className="px-4 py-3">Магазини</th>
                    <th className="px-4 py-3">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {users.map((user) => {
                    const daysLeft = trialDaysLeft(user.trialEndsAt)
                    return (
                      <tr key={user.id} className="hover:bg-[#fafafa]">
                        <td className="px-4 py-3 text-[#01011b] font-medium">{user.email}</td>
                        <td className="px-4 py-3 text-[#5c5c7a]">{user.name || '—'}</td>
                        <td className="px-4 py-3">
                          <select
                            value={user.plan}
                            onChange={(e) => updateUser(user.id, { plan: e.target.value })}
                            className="border border-[#dadae8] rounded-md px-2 py-1 text-xs text-[#01011b] bg-white focus:outline-none focus:border-[#7b04df]"
                          >
                            {PLANS.map((p) => (
                              <option key={p} value={p}>{PLAN_LABELS[p]}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.accessEnabled
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {user.accessEnabled ? 'Активний' : 'Вимкнено'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#5c5c7a] text-xs whitespace-nowrap">
                          {user.trialEndsAt ? (
                            <span className={daysLeft !== null && daysLeft <= 1 ? 'text-red-600 font-semibold' : ''}>
                              {daysLeft !== null && daysLeft > 0
                                ? `${daysLeft} дн.`
                                : daysLeft !== null && daysLeft <= 0
                                ? 'Вийшов'
                                : '—'}
                              <span className="block text-[#9999b3]">
                                {new Date(user.trialEndsAt).toLocaleDateString('uk-UA')}
                              </span>
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-3 text-[#5c5c7a]">{user._count.shops}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {/* Toggle access */}
                            <button
                              onClick={() => updateUser(user.id, { accessEnabled: !user.accessEnabled })}
                              title={user.accessEnabled ? 'Вимкнути доступ' : 'Увімкнути доступ'}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors border text-xs ${
                                user.accessEnabled
                                  ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200'
                                  : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200'
                              }`}
                            >
                              <FontAwesomeIcon icon={user.accessEnabled ? faBan : faCheck} className="w-3 h-3" />
                            </button>
                            {/* Start trial */}
                            <button
                              onClick={() => updateUser(user.id, { startTrial: true })}
                              title="Почати тріал (3 дні)"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#7b04df]/8 text-[#7b04df] hover:bg-[#7b04df]/15 border border-[#7b04df]/20 transition-colors"
                            >
                              <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
                            </button>
                            {/* Generate invite */}
                            <button
                              onClick={() => generateInvite(user.email)}
                              title={copiedLink === user.email ? 'Скопійовано!' : 'Нове запрошення'}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors border ${
                                copiedLink === user.email
                                  ? 'bg-green-50 text-green-600 border-green-200'
                                  : 'bg-[#f5f5f7] text-[#5c5c7a] hover:bg-[#e8e8f0] border-[#dadae8]'
                              }`}
                            >
                              <FontAwesomeIcon icon={copiedLink === user.email ? faCopy : faLink} className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
