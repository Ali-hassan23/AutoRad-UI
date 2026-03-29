// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

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
              <p className="text-[11px] text-slate-300">Radiology AI workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <a href="/dashboard" className="text-white">
              Dashboard
            </a>
            <a href="/preprocess" className="hover:text-white">
              Generate Reports
            </a>
            <a href="/settings" className="hover:text-white">
              Settings
            </a>
          </nav>
          <a
            href="/auth"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Sign out
          </a>
        </div>
      </header>

      <main className="relative isolate mx-auto max-w-6xl px-6 pb-14 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_42%)]" />

        {/* Welcome */}
        <div className="relative mb-10 space-y-2 text-white">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-200">Overview</p>
          <h2 className="text-3xl font-semibold">Welcome, {user.full_name}</h2>
          <p className="text-sm text-slate-200">
            Manage your workspace, generate reports, and keep an eye on system health.
          </p>
        </div>

        {/* Primary action */}
        <section className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/85 p-8 shadow-xl backdrop-blur">
          <div className="absolute -left-10 -top-14 h-32 w-32 rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Action</p>
              <h3 className="text-xl font-semibold text-slate-900">Generate medical report</h3>
              <p className="max-w-xl text-slate-600">
                Upload an X-ray to create a structured radiology draft. Review with AI assistance before signing off.
              </p>
            </div>

            <Link
              href="/preprocess"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start generation
            </Link>
          </div>
        </section>

        {/* Grid */}
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Personal information */}
          <section className="rounded-2xl border border-white/10 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Profile</p>
                <h3 className="text-xl font-semibold text-slate-900">Personal information</h3>
              </div>

              <Link
                href="/settings"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit details →
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">Full name</dt>
                <dd className="text-slate-900">{user.full_name}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">Email</dt>
                <dd className="text-slate-900">{user.email}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">Role</dt>
                <dd>
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                    {user.role}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">Account status</dt>
                <dd>
                  <span
                    className={`rounded-md px-2 py-1 text-sm font-medium ${
                      user.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">Member since</dt>
                <dd className="text-slate-900">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </section>

          {/* Activity */}
          <section className="rounded-2xl border border-white/10 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Health</p>
                <h3 className="text-xl font-semibold text-slate-900">Activity overview</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Operational
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-slate-600">Reports generated</span>
                <span className="text-2xl font-semibold text-slate-900">0</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-slate-600">Last activity</span>
                <span className="text-sm text-slate-900">—</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  SLA queue time under 20s for 95% of jobs.
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  Guardrails enabled: PHI masking, low-confidence deferral.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
