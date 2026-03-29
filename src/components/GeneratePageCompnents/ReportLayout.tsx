"use client";

import { useState } from "react";
import ReportEditor from "./ReportEditor";
import ChatbotPanel from "./ChatbotPanel";
import { exportReportPDF } from "@/lib/exportPdf";

type Props = {
  initialReport: string;
};

export default function ReportLayout({ initialReport }: Props) {
  const [report, setReport] = useState(initialReport);

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.12em] text-blue-700">Editor</p>
          <h2 className="text-xl font-semibold text-slate-900">Refine and export</h2>
          <p className="text-sm text-slate-600">
            Use the assistant for wording changes, then export when ready.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportReportPDF(report)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Export as PDF
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