"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportLayout from "@/components/GeneratePageCompnents/ReportLayout";
import PriorStudiesSidebar from "@/components/GeneratePageCompnents/PriorStudiesSidebar";
import { formatReport, studyDetailToReportInput } from "@/lib/formatReport";
import { getStudy } from "@/lib/studies";
import HeatmapViewer from "@/components/GeneratePageCompnents/HeatmapViewer";

type Props = {
  studyId: string;
  mode: "generate" | "history";
};

export default function StudyWorkspace({ studyId, mode }: Props) {
  const router = useRouter();
  const [formattedReport, setFormattedReport] = useState<string | null>(null);
  const [displayId, setDisplayId] = useState<string>("");
  const [mrn, setMrn] = useState("");
  const [priors, setPriors] = useState<
    Awaited<ReturnType<typeof getStudy>>["prior_studies"]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const detail = await getStudy(studyId);
        if (cancelled) return;

        setDisplayId(detail.display_id);
        setMrn(detail.patient.mrn);
        setPriors(detail.prior_studies);
        if (detail.report.edited_content) {
          setFormattedReport(detail.report.edited_content);
        } else {
          setFormattedReport(formatReport(studyDetailToReportInput(detail)));
        }
      } catch {
        if (!cancelled) {
          setError("Could not load this report.");
          router.replace(mode === "history" ? "/history" : "/preprocess");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [studyId, router, mode]);

  const basePath = mode === "history" ? "/history" : "/generate";
  const activeNav = mode === "history" ? "history" : "generate";

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!formattedReport) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 flex items-center justify-center">
        <p className="text-white text-sm">Loading report...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-white">
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">AutoRad</p>
              <p className="text-[11px] text-muted-foreground">
                {displayId || "Radiology AI workspace"}
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="/dashboard" className="hover:text-foreground transition">
              Dashboard
            </a>
            <a href="/preprocess" className="hover:text-foreground transition">
              Preprocess
            </a>
            <a
              href="/history"
              className={activeNav === "history" ? "text-primary font-semibold" : "hover:text-foreground transition"}
            >
              History
            </a>
            <a
              href={studyId ? `/generate/${studyId}` : "/preprocess"}
              className={activeNav === "generate" ? "text-primary font-semibold" : "hover:text-foreground transition"}
            >
              Generate
            </a>
            <a href="/settings" className="hover:text-foreground transition">
              Settings
            </a>
          </nav>
          <a
            href={mode === "history" ? "/history" : "/preprocess"}
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            {mode === "history" ? "Back to history" : "New study"}
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.10),transparent_42%)]" />

        <div className="mx-auto max-w-6xl px-6 pb-14 pt-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">
              {mode === "history" ? "Report history" : "Workspace"}
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              {displayId}
            </h1>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Review and refine the AI-drafted report. Save changes to keep them in your history.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="rounded-3xl border border-secondary/20 bg-card/95 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6">
                <HeatmapViewer studyId={studyId} />
              </div>
              <ReportLayout
                studyId={studyId}
                initialReport={formattedReport}
              />
            </div>
            <PriorStudiesSidebar
              mrn={mrn}
              currentStudyId={studyId}
              priors={priors}
              basePath={basePath}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
