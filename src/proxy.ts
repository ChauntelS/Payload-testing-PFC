import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost'
  let domain = host.split(':')[0]
  if (domain.includes('.localhost')) {
    domain = domain.split('.localhost')[0]
  }
  const response = NextResponse.next()
  response.headers.set('x-tenant-domain', domain)
  return response
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
