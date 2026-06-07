import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ studyId: string }> }
) {
  const { studyId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${backendUrl}/studies/${studyId}/heatmap`, {
    headers: { Cookie: `access_token=${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ detail: "Not found" }, { status: res.status });
  }

  const blob = await res.arrayBuffer();

  return new NextResponse(blob, {
    headers: { "Content-Type": "image/png" },
  });
}
