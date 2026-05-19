// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

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
              <p className="text-[11px] text-gray-600">Radiology AI workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
            <a href="/dashboard" className="text-blue-600 font-semibold">
              Dashboard
            </a>
            <a href="/preprocess" className="transition-smooth hover:text-blue-600">
              Generate Reports
            </a>
            <a href="/settings" className="transition-smooth hover:text-blue-600">
              Settings
            </a>
          </nav>
          <a
            href="/auth"
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-smooth"
          >
            Sign out
          </a>
        </div>
      </header>

      <main className="relative isolate mx-auto max-w-6xl px-6 pb-14 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.10),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.10),transparent_42%)]" />

        {/* Welcome */}
        <div className="relative mb-10 space-y-2 text-gray-900 animate-slide-in-left">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Overview</p>
          <h2 className="text-3xl font-semibold">Welcome, {user.full_name}</h2>
          <p className="text-sm text-gray-600">
            Manage your workspace, generate reports, and keep an eye on system health.
          </p>
        </div>

        {/* Primary action */}
        <section className="relative mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl backdrop-blur transition-smooth hover-lift animate-scale-in">
          <div className="absolute -left-10 -top-14 h-32 w-32 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Action</p>
              <h3 className="text-xl font-semibold text-gray-900">Generate medical report</h3>
              <p className="max-w-xl text-gray-600">
                Upload an X-ray to create a structured radiology draft. Review with AI assistance before signing off.
              </p>
            </div>

            <Link
              href="/preprocess"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-smooth hover:bg-blue-700 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start generation
            </Link>
          </div>
        </section>

        {/* Grid */}
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Personal information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-smooth hover-lift animate-slide-in-left">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Profile</p>
                <h3 className="text-xl font-semibold text-gray-900">Personal information</h3>
              </div>

              <Link
                href="/settings"
                className="text-sm font-medium text-blue-600 transition-smooth hover:text-blue-700"
              >
                Edit details →
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Full name</dt>
                <dd className="text-gray-900">{user.full_name}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Email</dt>
                <dd className="text-gray-900">{user.email}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Role</dt>
                <dd>
                  <span className="badge-info">
                    {user.role}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Account status</dt>
                <dd>
                  <span
                    className={user.is_active ? "badge-success" : "badge-error"}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold">Member since</dt>
                <dd className="text-gray-900">
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
          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-smooth hover-lift animate-slide-in-left">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Health</p>
                <h3 className="text-xl font-semibold text-gray-900">Activity overview</h3>
              </div>
              <span className="badge-success">
                Operational
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-smooth">
                <span className="text-gray-600">Reports generated</span>
                <span className="text-2xl font-semibold text-blue-600">0</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-smooth">
                <span className="text-gray-600">Last activity</span>
                <span className="text-sm text-gray-900">—</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  SLA queue time under 20s for 95% of jobs.
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
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
