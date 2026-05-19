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
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Nav */}
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
            <a href="/dashboard" className="transition-smooth hover:text-blue-600">
              Dashboard
            </a>
            <a href="/preprocess" className="transition-smooth hover:text-blue-600">
              Preprocess
            </a>
            <a href="/generate" className="text-blue-600 font-semibold">
              Generate
            </a>
            <a href="/settings" className="transition-smooth hover:text-blue-600">
              Settings
            </a>
          </nav>
          <a
            href="/generate"
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-smooth"
          >
            Back
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.10),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.10),transparent_42%)]" />

        <div className="mx-auto max-w-6xl px-6 pb-14 pt-10">
          <div className="space-y-3 text-gray-900 animate-slide-in-left">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">
              Workspace
            </p>
            <h1 className="text-3xl font-semibold">
              Report generation session
            </h1>
            <p className="max-w-3xl text-sm text-gray-600">
              Review and refine the AI-drafted report. All edits stay local to
              this secure workspace until you publish.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg backdrop-blur transition-smooth animate-scale-in">
            <ReportLayout initialReport={formattedReport} />
          </div>
        </div>
      </div>
    </div>
  );
}
