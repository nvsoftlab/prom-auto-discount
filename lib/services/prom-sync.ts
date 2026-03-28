import axios from 'axios'
import { decrypt } from '@/lib/crypto'
import { prisma } from '@/lib/prisma'

const BASE_URL = 'https://my.prom.ua/api/v1'
const BATCH_LIMIT = 100
const RATE_LIMIT_MS = 500
const MAX_BATCHES = 200

interface PromProduct {
  id: number
  price: number
  discount?: {
    value: number
    type: string
    date_start: string
    date_end: string
  }
}

interface ShopInput {
  id: string
  encryptedToken: string
  iv: string
  durationDays: number
}

interface SyncResult {
  scannedCount: number
  updatedCount: number
  errors: string[]
}

function getDatesKyiv(durationDays: number): { start: string; end: string } {
  const now = new Date()
  const kyivFormatter = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const format = (date: Date) => {
    const parts = kyivFormatter.formatToParts(date)
    const d = parts.find((p) => p.type === 'day')!.value
    const m = parts.find((p) => p.type === 'month')!.value
    const y = parts.find((p) => p.type === 'year')!.value
    return `${d}.${m}.${y}`
  }

  const endDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000)
  return { start: format(now), end: format(endDate) }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function syncShop(shop: ShopInput): Promise<SyncResult> {
  const result: SyncResult = { scannedCount: 0, updatedCount: 0, errors: [] }

  let token: string
  try {
    token = decrypt(shop.encryptedToken, shop.iv)
  } catch (e) {
    result.errors.push('Failed to decrypt API token')
    return result
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { start, end } = getDatesKyiv(shop.durationDays)
  let lastId: number | null = null
  let batchCount = 0

  while (batchCount < MAX_BATCHES) {
    const url = lastId
      ? `${BASE_URL}/products/list?limit=${BATCH_LIMIT}&last_id=${lastId}`
      : `${BASE_URL}/products/list?limit=${BATCH_LIMIT}`

    let products: PromProduct[]
    try {
      const res = await axios.get(url, { headers })
      products = res.data.products ?? []
    } catch (e: any) {
      result.errors.push(`Fetch failed (batch ${batchCount}): ${e.message}`)
      break
    }

    if (products.length === 0) break

    result.scannedCount += products.length
    lastId = products[products.length - 1].id
    batchCount++

    const withDiscount = products.filter((p) => p.discount)
    if (withDiscount.length === 0) {
      await sleep(RATE_LIMIT_MS)
      continue
    }

    const payload = withDiscount.map((p) => ({
      id: p.id,
      price: p.price,
      discount: {
        value: p.discount!.value,
        type: p.discount!.type,
        date_start: start,
        date_end: end,
      },
    }))

    try {
      const res = await axios.post(`${BASE_URL}/products/edit`, payload, { headers })
      const errors = res.data?.errors
      if (errors && Object.keys(errors).length > 0) {
        result.errors.push(`API errors in batch ${batchCount}: ${JSON.stringify(errors)}`)
      }
      result.updatedCount += payload.length
    } catch (e: any) {
      result.errors.push(`Update failed (batch ${batchCount}): ${e.message}`)
    }

    await sleep(RATE_LIMIT_MS)
  }

  return result
}

export async function syncShopAndLog(shopId: string): Promise<SyncResult> {
  const shop = await prisma.shop.findUnique({ where: { id: shopId } })
  if (!shop) throw new Error('Shop not found')

  const result = await syncShop(shop)

  const success = result.errors.length === 0
  await prisma.syncLog.create({
    data: {
      shopId,
      status: success ? 'SUCCESS' : 'ERROR',
      message: success
        ? `Updated ${result.updatedCount} products (scanned ${result.scannedCount})`
        : result.errors.join('; '),
      itemsUpdatedCount: result.updatedCount,
    },
  })

  await prisma.shop.update({
    where: { id: shopId },
    data: { lastSyncAt: new Date() },
  })

  return result
}
