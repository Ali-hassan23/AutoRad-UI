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
type DeleteState = "idle" | "confirming" | "deleting" | "error";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteState, setDeleteState] = useState<DeleteState>("idle");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

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
        body: JSON.stringify({ full_name: fullName }),
      });

      if (res.ok) {
        const updated: User = await res.json();
        setUser(updated);
        setFullName(updated.full_name ?? "");
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

  const isDirty = user && fullName !== (user.full_name ?? "");

  /* ---------------- DELETE ACCOUNT ---------------- */

  async function handleDeleteAccount() {
    if (!user) return;

    setDeleteState("deleting");
    setDeleteErrorMsg("");

    try {
      const res = await fetch("/api/users/me/permanent", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          password: user.auth_provider === "local" ? deletePassword : undefined,
        }),
      });

      if (res.ok || res.status === 204) {
        setDeleteState("idle");
        setDeletePassword("");
        router.push("/auth");
      } else {
        const err = await res.json().catch(() => ({}));
        setDeleteErrorMsg(err.detail ?? "Failed to delete account");
        setDeleteState("error");
      }
    } catch {
      setDeleteErrorMsg("Network error. Please try again.");
      setDeleteState("error");
    }
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">
                AutoRad
              </p>
              <p className="text-[11px] text-muted-foreground">
                Radiology AI workspace
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <Link href="/dashboard" className="hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="/preprocess" className="hover:text-foreground transition">
              Generate Reports
            </Link>
            <Link href="/history" className="hover:text-foreground transition">
              History
            </Link>
            {user && (
              <AdminNavLink
                role={user.role}
                className="hover:text-foreground transition text-teal-700 font-semibold"
              />
            )}
            <Link href="/settings" className="text-primary font-semibold">
              Settings
            </Link>
          </nav>
          <SignOutButton className="cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition">
            Sign out
          </SignOutButton>
        </div>
      </header>

      <main className="relative isolate px-6 pb-14 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.10),transparent_42%)]" />

          {/* Title */}
          <div className="relative mb-10 space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              Account
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your profile and account preferences.
            </p>
          </div>

          {!user ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              Loading…
            </div>
          ) : (
            // FIX 2: Wrapped the grid, Danger Zone, and modal in a Fragment so
            // they are valid siblings inside the ternary's truthy branch
            <>
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Personal Information */}
                <section className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-8 shadow-lg backdrop-blur">
                  <div className="absolute -right-10 top-0 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                  <div className="relative">
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                        Profile
                      </p>
                      <h3 className="text-xl font-semibold text-foreground mt-1">
                        Personal Information
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold block mb-2">
                          Full Name
                        </label>
                        <input
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setSaveState("idle");
                          }}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold block mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground opacity-60 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Email address cannot be changed
                        </p>
                      </div>

                      {saveState === "error" && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
                          <p className="text-sm text-destructive">{errorMsg}</p>
                        </div>
                      )}

                      {saveState === "saved" && (
                        <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3">
                          <p className="text-sm text-accent">✓ Changes saved successfully</p>
                        </div>
                      )}

                      <button
                        onClick={handleSave}
                        disabled={!isDirty || saveState === "saving"}
                        className="w-full mt-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {saveState === "saving" ? "Saving changes..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Account Details */}
                <section className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-8 shadow-lg backdrop-blur">
                  <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-secondary/10 blur-2xl" />
                  <div className="relative">
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                        Account
                      </p>
                      <h3 className="text-xl font-semibold text-foreground mt-1">
                        Details
                      </h3>
                    </div>

                    <dl className="space-y-5">
                      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">
                          Role
                        </dt>
                        <dd className="text-foreground mt-1">
                          <span className="rounded-md bg-primary/15 px-3 py-1 text-sm font-medium text-primary inline-block">
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1).toLowerCase()}
                          </span>
                        </dd>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">
                          Status
                        </dt>
                        <dd className="text-foreground mt-1">
                          <span
                            className={`rounded-md px-3 py-1 text-sm font-medium inline-block ${
                              user.is_active
                                ? "bg-accent/20 text-accent"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </dd>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">
                          Provider
                        </dt>
                        <dd className="text-foreground mt-1">
                          {user.auth_provider.charAt(0).toUpperCase() +
                            user.auth_provider.slice(1).toLowerCase()}
                        </dd>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                        <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">
                          Member Since
                        </dt>
                        <dd className="text-foreground mt-1">
                          {new Date(user.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </dd>
                      </div>
                    </dl>

                    <SignOutButton className="w-full mt-6 px-4 py-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 font-semibold hover:bg-destructive/20 transition focus:outline-none focus:ring-2 focus:ring-destructive/50">
                      Sign out
                    </SignOutButton>
                  </div>
                </section>
              </div>

              {/* Danger Zone */}
              <section className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-8 shadow-lg backdrop-blur mt-8">
                <div className="absolute -right-10 top-0 h-20 w-20 rounded-full bg-destructive/10 blur-2xl" />
                <div className="relative">
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.14em] text-destructive font-semibold">
                      Danger Zone
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mt-1">
                      Delete Account
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setDeleteState("confirming");
                      setDeleteErrorMsg("");
                      setDeletePassword("");
                    }}
                    className="px-6 py-3 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 font-semibold hover:bg-destructive/30 transition focus:outline-none focus:ring-2 focus:ring-destructive/50"
                  >
                    Delete Account Permanently
                  </button>
                </div>
              </section>

              {/* Delete Confirmation Modal */}
              {deleteState !== "idle" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                          Delete Account?
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          This will permanently delete your account and all associated studies. This action cannot be reversed.
                        </p>
                      </div>

                      {user?.auth_provider === "local" && (
                        <div>
                          <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold block mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => {
                              setDeletePassword(e.target.value);
                              setDeleteErrorMsg("");
                            }}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:border-destructive transition"
                            placeholder="Enter your password"
                            disabled={deleteState === "deleting"}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            Password confirmation is required for security
                          </p>
                        </div>
                      )}

                      {deleteErrorMsg && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
                          <p className="text-sm text-destructive">{deleteErrorMsg}</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setDeleteState("idle");
                            setDeletePassword("");
                            setDeleteErrorMsg("");
                          }}
                          disabled={deleteState === "deleting"}
                          className="flex-1 px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground font-semibold hover:bg-muted/50 disabled:opacity-50 transition focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          disabled={
                            deleteState === "deleting" ||
                            (user?.auth_provider === "local" && !deletePassword)
                          }
                          className="flex-1 px-4 py-3 rounded-lg bg-destructive text-primary-foreground font-semibold hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-destructive/50"
                        >
                          {deleteState === "deleting"
                            ? "Deleting..."
                            : "Delete Permanently"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}