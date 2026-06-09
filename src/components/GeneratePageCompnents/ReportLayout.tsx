"use client";

import { useState } from "react";
import ReportEditor from "./ReportEditor";
import ChatbotPanel from "./ChatbotPanel";
import { exportReportPDF } from "@/lib/exportPdf";
import { updateStudyReport } from "@/lib/studies";

type Props = {
  initialReport: string;
  studyId: string;
};

export default function ReportLayout({ initialReport, studyId }: Props) {
  const [report, setReport] = useState(initialReport);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [exportState, setExportState] = useState<"idle" | "exporting">("idle");

  async function handleSave() {
    setSaveState("saving");
    try {
      await updateStudyReport(studyId, report);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 2000);
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.12em] text-blue-700">Editor</p>
          <h2 className="text-xl font-semibold text-slate-900">Refine and export</h2>
          <p className="text-sm text-slate-600">
            Use the assistant for wording changes, then save and export when ready.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saveState === "saving"}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            {saveState === "saving"
              ? "Saving..."
              : saveState === "saved"
                ? "Saved"
                : saveState === "error"
                  ? "Save failed"
                  : "Save report"}
          </button>
          <button
            type="button"
            disabled={exportState === "exporting"}
            onClick={async () => {
              setExportState("exporting");
              try {
                await exportReportPDF(report, { studyId });
              } finally {
                setExportState("idle");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            {exportState === "exporting" ? "Exporting..." : "Export as PDF"}
          </button>
        </div>
      </div>

      {/* Two-panel workspace — fixed height so panels don't collapse */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" style={{ height: "calc(100vh - 280px)", minHeight: "560px" }}>
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm overflow-hidden flex flex-col">
          <ReportEditor report={report} onChange={setReport} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm overflow-hidden flex flex-col">
          <ChatbotPanel report={report} onUpdate={setReport} />
        </div>
      </div>
    </div>
  );
}