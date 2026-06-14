import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

function proxyGet(path: string, request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();

  return fetch(`${BACKEND_URL}/admin${path}${qs ? `?${qs}` : ""}`, {
    headers: {
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    cache: "no-store",
  });
}

export async function GET(request: NextRequest) {
  const res = await proxyGet("/overview", request);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
