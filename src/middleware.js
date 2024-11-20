import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('TokenX')?.value;

  const { pathname } = request.nextUrl;

  const publicRoutes = ['/login', '/register'];
  const protectedRoutes = ['/interests', '/profile'];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    console.log('Redirecting to /login (no token and protected route)');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublicRoute) {
    console.log('Redirecting to /profile (has token and public route)');
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Lanjutkan request
  console.log('Allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', 
};
