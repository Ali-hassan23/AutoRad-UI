"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
          router.push("/login");
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
      .catch(() => router.push("/login"));
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

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  const isDirty =
    user &&
    (fullName !== (user.full_name ?? "") || email !== user.email);

  return (
    <div className="min-h-screen bg-white text-gray-900 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur transition-smooth">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-gray-900">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AutoRad</p>
              <p className="text-[11px] text-gray-600">
                Radiology AI workspace
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
            <Link href="/dashboard" className="transition-smooth hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/preprocess" className="transition-smooth hover:text-blue-600">
              Generate Reports
            </Link>
            <Link href="/settings" className="text-blue-600 font-semibold">
              Settings
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-smooth"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="relative isolate mx-auto max-w-6xl px-6 pb-14 pt-10">
        {/* Title */}
        <div className="relative mb-10 space-y-2 text-gray-900 animate-slide-in-left">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">
            Account
          </p>
          <h2 className="text-3xl font-semibold">Settings</h2>
          <p className="text-sm text-gray-600">
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
            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-smooth hover-lift animate-slide-in-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <input
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setSaveState("idle");
                  }}
                  className="form-input"
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
                  className="form-input"
                  placeholder="Email"
                />

                {saveState === "error" && (
                  <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
                )}

                {saveState === "saved" && (
                  <p className="text-emerald-600 text-sm font-medium">Saved successfully</p>
                )}

                <button
                  onClick={handleSave}
                  disabled={!isDirty || saveState === "saving"}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveState === "saving" ? "Saving..." : "Save"}
                </button>
              </div>
            </section>

            {/* Account Info */}
            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-smooth hover-lift animate-slide-in-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Details
              </h3>

              <dl className="space-y-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Role</dt>
                  <dd className="text-gray-900">{user.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Status</dt>
                  <dd className={user.is_active ? "text-emerald-700" : "text-red-700"}>{user.is_active ? "Active" : "Inactive"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Provider</dt>
                  <dd className="text-gray-900">{user.auth_provider}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Joined</dt>
                  <dd className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</dd>
                </div>
              </dl>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-semibold transition-smooth hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign out
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
