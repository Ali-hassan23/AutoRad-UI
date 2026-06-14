import { cookies } from "next/headers";
import type { AdminOverview, AdminStudyDetail } from "@/lib/admin";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

async function adminServerFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${backendUrl}/admin${path}`, {
    headers: { Cookie: `access_token=${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = err.detail;
    throw new Error(typeof detail === "string" ? detail : "Request failed");
  }

  return res.json();
}

export function getAdminOverviewServer() {
  return adminServerFetch<AdminOverview>("/overview");
}

export function getAdminStudyServer(studyId: string) {
  return adminServerFetch<AdminStudyDetail>(`/studies/${studyId}`);
}
