//src/app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    headers: { ...(cookieHeader && { Cookie: cookieHeader }) },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const body = await request.json();

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
