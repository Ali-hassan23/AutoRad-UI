// app/api/auth/[...auth]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

/**
 * Handle POST requests (login, register, logout, refresh)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> }
) {
  const { auth } = await params;
  const path = auth.join("/");
  
  try {
    const contentType = request.headers.get("content-type") || "";
const cookieHeader = request.headers.get("cookie");

let body: string | undefined;

if (
  contentType.includes("application/json") ||
  contentType.includes("application/x-www-form-urlencoded")
) {
  body = await request.text();
}

    const response = await fetch(`${BACKEND_URL}/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      ...(body && { body }),
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));
    
    const nextResponse = NextResponse.json(data, { 
      status: response.status 
    });
    
    // ✅ Fix: correctly forward multiple Set-Cookie headers
    const setCookieHeaders = response.headers.getSetCookie?.() 
      ?? [response.headers.get("set-cookie")].filter(Boolean) as string[];

    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append("set-cookie", cookie);
    });

    if (path === "logout") {
      nextResponse.cookies.set("access_token", "", {
        path: "/",
        maxAge: 0,
      });
      nextResponse.cookies.set("refresh_token", "", {
        path: "/",
        maxAge: 0,
      });
    }
    
    return nextResponse;
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { 
        detail: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests (me, check auth, etc.)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> }
) {
  const { auth } = await params;
  const path = auth.join("/");
  
  try {
    // Forward cookies from client to backend
    const cookieHeader = request.headers.get("cookie");
    
    const response = await fetch(`${BACKEND_URL}/auth/${path}`, {
      method: "GET",
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));
    
    return NextResponse.json(data, { 
      status: response.status 
    });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { 
        detail: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * Handle PUT requests (update profile, etc.)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> }
) {
  const { auth } = await params;
  const path = auth.join("/");
  
  try {
    const cookieHeader = request.headers.get("cookie");
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/auth/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));
    
    return NextResponse.json(data, { 
      status: response.status 
    });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { 
        detail: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

/**
 * Handle DELETE requests (delete account, etc.)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ auth: string[] }> }
) {
  const { auth } = await params;
  const path = auth.join("/");
  
  try {
    const cookieHeader = request.headers.get("cookie");
    
    const response = await fetch(`${BACKEND_URL}/auth/${path}`, {
      method: "DELETE",
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));
    
    return NextResponse.json(data, { 
      status: response.status 
    });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { 
        detail: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
