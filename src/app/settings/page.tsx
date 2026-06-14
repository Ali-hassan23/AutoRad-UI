"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import AdminNavLink from "@/components/Admin/AdminNavLink";

type User = {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  auth_provider: string;
  profile_picture: string | null;
  created_at: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------------- FETCH USER ---------------- */

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          router.push("/auth");
          return null;
        }
        return r.json();
      })
      .then((data: User | null) => {
        if (!data) return;
        setUser(data);
        setFullName(data.full_name ?? "");
        setEmail(data.email ?? "");
      })
      .catch(() => router.push("/auth"));
  }, [router]);

  /* ---------------- SAVE ---------------- */

  async function handleSave() {
    if (!user) return;

    setSaveState("saving");
    setErrorMsg("");

    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ full_name: fullName, email }),
      });

      if (res.ok) {
        const updated: User = await res.json();
        setUser(updated);
        setFullName(updated.full_name ?? "");
        setEmail(updated.email ?? "");
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2500);
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.detail ?? "Failed to save changes");
        setSaveState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSaveState("error");
    }
  }

  const isDirty =
    user &&
    (fullName !== (user.full_name ?? "") || email !== user.email);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-slate-900">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AutoRad</p>
              <p className="text-[11px] text-slate-300">
                Radiology AI workspace
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link href="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <Link href="/preprocess" className="hover:text-white">
              Generate Reports
            </Link>
            {user && (
              <AdminNavLink
                role={user.role}
                className="hover:text-white text-teal-300 font-semibold"
              />
            )}
            <Link href="/settings" className="text-white">
              Settings
            </Link>
          </nav>

          <SignOutButton className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100">
            Sign out
          </SignOutButton>
        </div>
      </header>

      <main className="relative isolate mx-auto max-w-6xl px-6 pb-14 pt-10">
        {/* Title */}
        <div className="relative mb-10 space-y-2 text-white">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-200">
            Account
          </p>
          <h2 className="text-3xl font-semibold">Settings</h2>
          <p className="text-sm text-slate-200">
            Manage your profile and account preferences.
          </p>
        </div>

        {!user ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            Loading…
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Profile */}
            <section className="rounded-2xl border border-white/10 bg-white/90 p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <input
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setSaveState("idle");
                  }}
                  className="w-full border p-2 rounded"
                  placeholder="Full Name"
                />

                <input
                  type="email"
                  value={email}
                  disabled={user.auth_provider === "google"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSaveState("idle");
                  }}
                  className="w-full border p-2 rounded disabled:opacity-50"
                  placeholder="Email"
                />

                {saveState === "error" && (
                  <p className="text-red-500">{errorMsg}</p>
                )}

                {saveState === "saved" && (
                  <p className="text-green-600">Saved successfully</p>
                )}

                <button
                  onClick={handleSave}
                  disabled={!isDirty || saveState === "saving"}
                  className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                >
                  {saveState === "saving" ? "Saving..." : "Save"}
                </button>
              </div>
            </section>

            {/* Account Info */}
            <section className="rounded-2xl border bg-white p-8 shadow">
              <h3 className="text-lg font-semibold mb-4">
                Account Details
              </h3>

              <p>Role: {user.role}</p>
              <p>Status: {user.is_active ? "Active" : "Inactive"}</p>
              <p>Provider: {user.auth_provider}</p>
              <p>
                Joined:{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>

              <SignOutButton className="mt-6 w-full bg-red-500 text-white py-2 rounded">
                Sign out
              </SignOutButton>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
