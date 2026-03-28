import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req: NextRequest & { auth: unknown }) => {
  const isLoggedIn = !!(req as any).auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
})

export const config = {
  matcher: ['/dashboard/:path*'],
}
