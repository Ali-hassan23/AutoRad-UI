//src/lib/auth-server.ts
import { cookies } from "next/headers";
import type { User } from "@/lib/auth";

/**
 * Read the authenticated user from the server-side cookie session.
 */
export async function getUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;

    if (!accessToken) return null;

    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

    const res = await fetch(`${backendUrl}/auth/me`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
