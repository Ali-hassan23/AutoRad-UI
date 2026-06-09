import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader?.includes("access_token=")) {
    return NextResponse.json(
      { detail: "Not authenticated. Please log in again." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const res = await fetch(`${BACKEND_URL}/studies/analyze`, {
      method: "POST",
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Studies analyze proxy error:", error);
    return NextResponse.json(
      { detail: "Failed to reach report service" },
      { status: 500 }
    );
  }
}
