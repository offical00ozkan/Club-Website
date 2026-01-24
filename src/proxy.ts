import { NextRequest, NextResponse } from 'next/server'
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'
import { getClientIp } from './lib/getClientIp'
import { auth } from './lib/auth'

const rateLimiter = new RateLimiterMemory({
  points: 60,
  duration: 60,
})

const allowedOrigins = [
  'http://localhost:3000',
]

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, x-forwarded-for, x-real-ip',
}

const HSTS_HEADER = 'max-age=31536000; includeSubDomains; preload'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isApiRoute = pathname.startsWith('/api')
  const isPreflight = request.method === 'OPTIONS'

  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  if (isApiRoute && isPreflight) {
    return NextResponse.json(
      {},
      {
        headers: {
          ...(isAllowedOrigin && {
            'Access-Control-Allow-Origin': origin,
          }),
          ...corsHeaders,
        },
      }
    )
  }

  const needsAuth = pathname.startsWith('/dashboard') || pathname.startsWith('/home')

  const session = needsAuth ? await auth() : null

  if (pathname === '/api/admin' && session?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/home/auth/login', request.url))
  }

  if (pathname === '/api/user' && !session) {
    return NextResponse.redirect(new URL('/home/auth/login', request.url))
  }

  if (pathname === '/home/profile' && !session) {
    return NextResponse.redirect(new URL('/home/auth/login', request.url))
  }

  if (pathname === '/dashboard' && session?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/home/auth/login', request.url))
  }

  if (isApiRoute) {
    try {
      const ip = getClientIp(request)
      await rateLimiter.consume(ip)
    } catch (error) {
      const rejRes = error as RateLimiterRes

      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(
              rejRes.msBeforeNext / 1000
            ).toString(),
            ...(isAllowedOrigin && {
              'Access-Control-Allow-Origin': origin,
            }),
          },
        }
      )
    }
  }

  const response = NextResponse.next()

  if (isApiRoute) {
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(corsHeaders).forEach(([k, v]) => {
      response.headers.set(k, v)
    })
  }

  response.headers.set('Strict-Transport-Security', HSTS_HEADER)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
