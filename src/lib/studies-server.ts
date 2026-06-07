import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export async function getStudiesSummary(): Promise<{
  total: number;
  lastActivity: string | null;
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return { total: 0, lastActivity: null };

    const res = await fetch(`${backendUrl}/studies?limit=1`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: "no-store",
    });

    if (!res.ok) return { total: 0, lastActivity: null };

    const data = await res.json();
    const last = data.items?.[0]?.created_at;
    return {
      total: data.total ?? 0,
      lastActivity: last
        ? new Date(last).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null,
    };
  } catch {
    return { total: 0, lastActivity: null };
  }
}
