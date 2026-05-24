// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/auth");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-white text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">AutoRad</p>
              <p className="text-[11px] text-muted-foreground">Radiology AI workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="/dashboard" className="text-primary font-semibold">
              Dashboard
            </a>
            <a href="/preprocess" className="hover:text-foreground transition">
              Generate Reports
            </a>
            <a href="/settings" className="hover:text-foreground transition">
              Settings
            </a>
          </nav>
          <a
            href="/auth"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            Sign out
          </a>
        </div>
      </header>

      <main className="relative isolate mx-auto max-w-6xl px-6 pb-14 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.10),transparent_42%)]" />

        {/* Welcome */}
        <div className="relative mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Overview</p>
          <h2 className="text-3xl font-semibold text-foreground">Welcome, {user.full_name}</h2>
          <p className="text-sm text-muted-foreground">
            Manage your workspace, generate reports, and keep an eye on system health.
          </p>
        </div>

        {/* Primary action */}
        <section className="relative mb-10 overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-card to-white/50 p-8 shadow-lg backdrop-blur">
          <div className="absolute -left-10 -top-14 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Action</p>
              <h3 className="text-xl font-semibold text-foreground">Generate medical report</h3>
              <p className="max-w-xl text-muted-foreground">
                Upload an X-ray to create a structured radiology draft. Review with AI assistance before signing off.
              </p>
            </div>

            <Link
              href="/preprocess"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Start generation
            </Link>
          </div>
        </section>

        {/* Grid */}
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Personal information */}
          <section className="rounded-2xl border border-border bg-card/95 p-8 shadow-lg backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Profile</p>
                <h3 className="text-xl font-semibold text-foreground">Personal information</h3>
              </div>

              <Link
                href="/settings"
                className="text-sm font-medium text-primary hover:text-primary/80 transition"
              >
                Edit details →
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">Full name</dt>
                <dd className="text-foreground">{user.full_name}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">Email</dt>
                <dd className="text-foreground">{user.email}</dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">Role</dt>
                <dd>
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
                    {user.role}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">Account status</dt>
                <dd>
                  <span
                    className={`rounded-md px-2 py-1 text-sm font-medium ${
                      user.is_active ? "bg-accent/20 text-accent" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground font-semibold">Member since</dt>
                <dd className="text-foreground">
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
          <section className="rounded-2xl border border-border bg-card/95 p-8 shadow-lg backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Health</p>
                <h3 className="text-xl font-semibold text-foreground">Activity overview</h3>
              </div>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                Operational
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-muted-foreground">Reports generated</span>
                <span className="text-2xl font-semibold text-primary">0</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-muted-foreground">Last activity</span>
                <span className="text-sm text-foreground">—</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-secondary/30 bg-secondary/5 px-4 py-3 text-sm text-foreground">
                  SLA queue time under 20s for 95% of jobs.
                </div>
                <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
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
