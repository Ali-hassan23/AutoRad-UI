import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";
import HistoryListClient from "@/components/History/HistoryListClient";
import AdminNavLink from "@/components/Admin/AdminNavLink";

export default async function HistoryPage() {
  const user = await getUser();
  if (!user) redirect("/auth");
  
  // Redirect admins to /admin
  if (user.role === "admin") redirect("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-white text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">AutoRad</p>
              <p className="text-[11px] text-muted-foreground">Report history</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <Link href="/dashboard" className="hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="/preprocess" className="hover:text-foreground transition">
              Preprocess
            </Link>
            <Link href="/history" className="text-primary font-semibold">
              History
            </Link>
            <AdminNavLink
              role={user.role}
              className="hover:text-foreground transition text-teal-700 font-semibold"
            />
            <Link href="/settings" className="hover:text-foreground transition">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 space-y-2">
          <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
            Your reports
          </p>
          <h1 className="text-3xl font-semibold">Report history</h1>
          <p className="text-sm text-muted-foreground">
            All studies you have generated. Filter by MRN to find a patient.
          </p>
        </div>

        <HistoryListClient />
      </main>
    </div>
  );
}
