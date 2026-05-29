// middleware.ts (project root)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that REQUIRE authentication
 */
const protectedRoutes = ["/dashboard", "/generate", "/preprocess", "/settings"];

/**
 * Routes that should NOT be accessible if already logged in
 */
const authRoutes = ["/auth"];

/**
 * Middleware runs before request reaches route
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[MIDDLEWARE] Processing:", pathname);

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  /**
   * CASE 1:
   * User tries to access a protected route
   * → Check for access_token cookie
   */
  if (isProtectedRoute) {
    console.log("[MIDDLEWARE] Protected route detected");
    const cookieHeader = request.headers.get("cookie") || "";
    const hasAccessToken = cookieHeader.includes("access_token=");

    console.log("[MIDDLEWARE] Has access token:", hasAccessToken);
    console.log("[MIDDLEWARE] Cookies:", cookieHeader);

    // No access token found - redirect to auth
    if (!hasAccessToken) {
      console.log("[MIDDLEWARE] Redirecting to /auth - no token");
      const authUrl = new URL("/auth", request.url);
      authUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(authUrl);
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      return response;
    }

    console.log("[MIDDLEWARE] Token found, allowing access");
  }

  /**
   * CASE 2:
   * User is already logged in and tries to access /auth
   * → Redirect to dashboard
   */
  if (isAuthRoute) {
    console.log("[MIDDLEWARE] Auth route detected");
    const cookieHeader = request.headers.get("cookie") || "";
    const hasAccessToken = cookieHeader.includes("access_token=");

    console.log("[MIDDLEWARE] Has access token on auth page:", hasAccessToken);

    if (hasAccessToken) {
      console.log("[MIDDLEWARE] Redirecting logged-in user to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  /**
   * CASE 3:
   * Allow request to continue
   */
  console.log("[MIDDLEWARE] Allowing request to continue");
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return response;
}

/**
 * Tell Next.js which paths should trigger middleware
 */
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/generate",
    "/generate/:path*",
    "/preprocess",
    "/preprocess/:path*",
    "/settings",
    "/settings/:path*",
    "/auth",
    "/auth/:path*",
  ],
};