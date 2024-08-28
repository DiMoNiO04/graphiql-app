import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const authRoutes = ['/signin', '/signup'];
  // check if the current route is an auth route
  if (authRoutes.includes(request.nextUrl.pathname)) {
    const sessionCookie = request.cookies.get('graphiql-app-f134va');
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup'],
};
