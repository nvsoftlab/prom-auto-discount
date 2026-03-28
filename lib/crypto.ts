import crypto from 'crypto'

const ALGO = 'aes-256-cbc'

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)')
  }
  return Buffer.from(key, 'hex')
}

export function encrypt(text: string): { encrypted: string; iv: string } {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  return {
    encrypted: encrypted.toString('hex'),
    iv: iv.toString('hex'),
  }
}

export function decrypt(encrypted: string, iv: string): string {
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(iv, 'hex'))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final(),
  ])
  return decrypted.toString('utf8')
}
