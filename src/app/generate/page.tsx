"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportLayout from "@/components/GeneratePageCompnents/ReportLayout";
import { formatReport } from "@/lib/formatReport";

export default function ResultPage() {
  const router = useRouter();
  const [formattedReport, setFormattedReport] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("latest_report");
    if (!raw) {
      router.replace("/generate"); // nothing here, send them back
      return;
    }
    try {
      const report = JSON.parse(raw);
      setFormattedReport(formatReport(report));
    } catch {
      router.replace("/generate");
    }
  }, [router]);

  if (!formattedReport) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 flex items-center justify-center">
        <p className="text-white text-sm">Loading report...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50">
      {/* Nav */}
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
            <a href="/dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="/preprocess" className="hover:text-white">
              Preprocess
            </a>
            <a href="/generate" className="text-white">
              Generate
            </a>
            <a href="/settings" className="hover:text-white">
              Settings
            </a>
          </nav>
          <a
            href="/generate"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Back
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_42%)]" />

        <div className="mx-auto max-w-6xl px-6 pb-14 pt-10">
          <div className="space-y-3 text-white">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-200">
              Workspace
            </p>
            <h1 className="text-3xl font-semibold">
              Report generation session
            </h1>
            <p className="max-w-3xl text-sm text-slate-200">
              Review and refine the AI-drafted report. All edits stay local to
              this secure workspace until you publish.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/85 p-6 shadow-2xl backdrop-blur">
            <ReportLayout initialReport={formattedReport} />
          </div>
        </div>
      </div>
    </div>
  );
}
