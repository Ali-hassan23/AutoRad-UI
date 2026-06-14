import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studyId: string }> }
) {
  const { studyId } = await params;
  const cookieHeader = request.headers.get("cookie");

  const res = await fetch(`${BACKEND_URL}/admin/studies/${studyId}/heatmap`, {
    headers: {
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  }

  const blob = await res.arrayBuffer();
  return new NextResponse(blob, {
    status: res.status,
    headers: { "Content-Type": "image/png" },
  });
}
