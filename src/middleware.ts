import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Check if user is authenticated by looking for a session cookie
  const session = request.cookies.get('appwrite-session');
  const isAuthenticated = !!session;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  const rootPath = '/';
  
  // Protected routes that require authentication
  const protectedPaths = ['/dashboard'];
  
  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && protectedPaths.some(route => path === route || path.startsWith(`${route}/`))) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';  // Redirect to login instead of root
    return NextResponse.redirect(url);
  }
  
  // If user is authenticated and trying to access login/register
  if (isAuthenticated && publicRoutes.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
  
  // Continue with the request for all other paths including root '/'
  return NextResponse.next();
}