import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import SystemInfo from "@/components/UploadPageComponents/SystemInfo";
import UploadPanel from "@/components/UploadPageComponents/UploadPanel";
import Image from "next/image";

export default async function GeneratePage() {
  const user = await getUser();

  if (!user) redirect("/auth");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-white text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center">
              <Image src={'/logo.png'} alt="AutoRad Logo" width={36} height={36} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">AutoRad</p>
              <p className="text-[11px] text-muted-foreground">Radiology AI workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="/dashboard" className="hover:text-foreground transition">Dashboard</a>
            <a href="/preprocess" className="text-primary font-semibold">Generate Reports</a>
            <a href="/settings" className="hover:text-foreground transition">Settings</a>
          </nav>
          <a
            href="/dashboard"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            Back to home
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.10),transparent_42%)]" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-14 pt-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-secondary/20 bg-card/95 p-6 shadow-lg backdrop-blur">
            <SystemInfo />
          </div>
          <div className="rounded-2xl border border-secondary/20 bg-card/95 p-6 shadow-lg backdrop-blur">
            <UploadPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
