import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from './i18n/i18n.config';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never',
});

const authRoutes = ['/signin', '/signup'];
const protectedRoutes = ['/rest-client', '/history', '/graphiQL-client'];

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('graphiql-app-f134va');
  const { pathname } = request.nextUrl;

  if (authRoutes.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (protectedRoutes.includes(pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/signin', '/signup', '/rest-client', '/history', '/graphiQL-client', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
