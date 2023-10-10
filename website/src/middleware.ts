import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { withLocales } from 'nextra/locales'

// TODO: Fix problem with redirection when accessing /.
export const middleware = withLocales((request: NextRequest) => {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL('/docs/overview/getting-started', request.url),
    )
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
