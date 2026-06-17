// src/app/api/users/me/permanent/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function DELETE(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const body = await request.json().catch(() => ({}));

  const res = await fetch(`${BACKEND_URL}/users/me/permanent`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    body: JSON.stringify(body),
  });

  // 204 has no body — attempting .json() would throw
  if (res.status === 204) {
    const response = new NextResponse(null, { status: 204 });

    // Forward the Set-Cookie header from FastAPI so the browser clears
    // the session cookie (the backend calls response.delete_cookie())
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  }

  // For error responses (400, 401, etc.) forward the JSON body as-is
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}