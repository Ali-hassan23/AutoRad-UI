// middleware.ts (project root)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Get user role by calling the /auth/me endpoint
 */
async function getUserRole(request: NextRequest): Promise<string | null> {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    
    const response = await fetch(`${backendUrl}/auth/me`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("[MIDDLEWARE] Failed to fetch user role, status:", response.status);
      return null;
    }

    const userData = await response.json();
    console.log("[MIDDLEWARE] User data fetched:", { role: userData.role });
    return userData.role || null;
  } catch (error) {
    console.log("[MIDDLEWARE] Error fetching user role:", error);
    return null;
  }
}

/**
 * Admin-only routes
 */
const adminRoutes = ["/admin"];

/**
 * User-only routes (blocked for admins)
 */
const userOnlyRoutes = ["/dashboard", "/generate", "/preprocess", "/settings", "/history"];

/**
 * All protected routes that require authentication
 */
const protectedRoutes = [...adminRoutes, ...userOnlyRoutes];

/**
 * Routes that should NOT be accessible if already logged in
 */
const authRoutes = ["/auth"];

/**
 * Middleware runs before request reaches route
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[MIDDLEWARE] Processing:", pathname);

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if it's an auth route
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if it's an admin-only route
  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if it's a user-only route
  const isUserOnlyRoute = userOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  /**
   * CASE 1: Protected route accessed
   * Check for authentication token and verify role
   */
  if (isProtectedRoute) {
    console.log("[MIDDLEWARE] Protected route detected:", pathname);
    const cookieHeader = request.headers.get("cookie") || "";
    const hasAccessToken = cookieHeader.includes("access_token=");

    console.log("[MIDDLEWARE] Has access token:", hasAccessToken);

    // No token - redirect to login
    if (!hasAccessToken) {
      console.log("[MIDDLEWARE] No token found, redirecting to /auth");
      const authUrl = new URL("/auth", request.url);
      authUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(authUrl);
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      return response;
    }

    // Get user role from backend
    const userRole = await getUserRole(request);
    console.log("[MIDDLEWARE] User role from backend:", userRole);

    /**
     * CASE 1a: Admin trying to access user-only routes
     * Redirect to /admin
     */
    if (isUserOnlyRoute && userRole === "admin") {
      console.log("[MIDDLEWARE] Admin user trying to access user-only route:", pathname, "redirecting to /admin");
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    /**
     * CASE 1b: Non-admin trying to access admin-only routes
     * Redirect to /dashboard
     */
    if (isAdminRoute && userRole !== "admin") {
      console.log("[MIDDLEWARE] Non-admin user trying to access admin route:", pathname, "redirecting to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log("[MIDDLEWARE] Token valid, role check passed, allowing access");
  }

  /**
   * CASE 2: Auth route accessed while logged in
   * Redirect based on role
   */
  if (isAuthRoute) {
    console.log("[MIDDLEWARE] Auth route detected");
    const cookieHeader = request.headers.get("cookie") || "";
    const hasAccessToken = cookieHeader.includes("access_token=");

    if (hasAccessToken) {
      const userRole = await getUserRole(request);
      const redirectUrl = userRole === "admin" ? "/admin" : "/dashboard";
      console.log("[MIDDLEWARE] Logged-in user on auth page, redirecting to:", redirectUrl);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  /**
   * CASE 3: Allow request to continue
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
    "/history",
    "/history/:path*",
    "/admin",
    "/admin/:path*",
    "/auth",
    "/auth/:path*",
  ],
};