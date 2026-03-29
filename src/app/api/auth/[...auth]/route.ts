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
    // Get request body
    const contentType = request.headers.get("content-type") || "";
    let body: string;
    
    if (contentType.includes("application/x-www-form-urlencoded")) {
      body = await request.text();
    } else {
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
    }

    // Forward request to FastAPI backend
    const response = await fetch(`${BACKEND_URL}/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: body,
      credentials: "include",
    });

    // Get response data
    const data = await response.json().catch(() => ({}));
    
    // Create Next.js response with same status code
    const nextResponse = NextResponse.json(data, { 
      status: response.status 
    });
    
    // Forward Set-Cookie headers from backend to client
    // This is CRITICAL for cookie-based auth
    const setCookieHeaders = response.headers.get("set-cookie");
    if (setCookieHeaders) {
      nextResponse.headers.set("set-cookie", setCookieHeaders);
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