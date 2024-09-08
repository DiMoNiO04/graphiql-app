import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './i18n/i18n.config';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
});

export async function middleware(request: NextRequest) {
  const authRoutes = ['/signin', '/signup'];
  const routes = ['/rest-client', '/history', '/graphiQL-client'];

  if (authRoutes.includes(request.nextUrl.pathname)) {
    const sessionCookie = request.cookies.get('graphiql-app-f134va');
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (routes.includes(request.nextUrl.pathname)) {
    const sessionCookie = request.cookies.get('graphiql-app-f134va');
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next() && intlMiddleware(request);
}

export const config = {
  matcher: ['/signin', '/signup', '/rest-client', '/history', '/graphiQL-client', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
