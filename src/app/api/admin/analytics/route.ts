import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();

  const res = await fetch(`${BACKEND_URL}/admin/analytics${qs ? `?${qs}` : ""}`, {
    headers: {
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
