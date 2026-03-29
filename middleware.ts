// middleware.ts (project root)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that REQUIRE authentication
 */
const protectedRoutes = [
  "/dashboard",
  "/generate",
  "/settings",
];

/**
 * Routes that should NOT be accessible if already logged in
 */
const authRoutes = [
  "/login",
];

/**
 * Middleware runs before request reaches route
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  /**
   * CASE 1:
   * User is NOT logged in and tries to access protected page
   * → Redirect to login with return URL
   */
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * CASE 2:
   * User IS logged in but tries to access login page again
   * → Send them to dashboard
   */
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /**
   * CASE 3:
   * Allow request to continue
   */
  return NextResponse.next();
}

/**
 * Tell Next.js which paths should trigger middleware
 * We exclude static assets and API routes for performance.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)",
  ],
};