// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IMPORTANT: Replace this with the actual name of your Appwrite session cookie!
const SESSION_COOKIE_NAME = 'a_session_YOUR_PROJECT_ID'; // Find this in browser dev tools

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Define public paths that do not require authentication
  const publicPaths = ['/login', '/register'];
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Get the session cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  // --- Redirect Logic ---

  // 1. If trying to access a protected route WITHOUT a session cookie, redirect to login
  if (!isPublicPath && !sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    // Optional: add a redirect query param if you want to redirect back after login
    // loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access a public route WITH a session cookie (already logged in), redirect to dashboard
  if (isPublicPath && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Otherwise (accessing protected route WITH session OR public route WITHOUT session), allow the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (your public images folder if you have one)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    // Explicitly include root if you want middleware to run there,
    // or define specific protected/public paths if preferred over negative lookahead
    // Example: '/dashboard/:path*', '/profile/:path*', '/login', '/register'
  ],
};