import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const mrn = new URL(request.url).searchParams.get("mrn");

  if (!mrn?.trim()) {
    return NextResponse.json({ found: false });
  }

  const res = await fetch(
    `${BACKEND_URL}/studies/lookup-patient?mrn=${encodeURIComponent(mrn.trim())}`,
    {
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => ({ found: false }));
  return NextResponse.json(data, { status: res.status });
}
