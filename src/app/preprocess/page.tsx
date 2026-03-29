import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import SystemInfo from "@/components/UploadPageComponents/SystemInfo";
import UploadPanel from "@/components/UploadPageComponents/UploadPanel";
import Image from "next/image";

export default async function GeneratePage() {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className=" text-slate-900 inline-flex items-center justify-center ">
              <Image src={'/logo.png'} alt="AutoRad Logo" width={36} height={36} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AutoRad</p>
              <p className="text-[11px] text-slate-300">Radiology AI workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <a href="/dashboard" className="hover:text-white">Dashboard</a>
            <a href="/preprocess" className="text-white">Generate Reports</a>
            <a href="/settings" className="hover:text-white">Settings</a>
          </nav>
          <a
            href="/dashboard"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Back to home
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_42%)]" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-14 pt-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-white/85 p-6 shadow-xl backdrop-blur">
            <SystemInfo />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/90 p-6 shadow-xl backdrop-blur">
            <UploadPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
