"use client";

type Props = {
  report: string;
  onChange: (value: string) => void;
};

export default function ReportEditor({ report, onChange }: Props) {
  const wordCount = report?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const charCount = report?.length ?? 0;

  return (
    <div className="flex h-full w-full flex-col gap-3 min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 shrink-0">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-blue-700">Draft</p>
          <h2 className="text-xl font-semibold text-slate-900">Radiology report</h2>
          <p className="text-sm text-slate-500">
            Findings and impressions are editable below.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {wordCount} words
          </span>
          <span className="text-[11px] text-slate-400">{charCount} chars</span>
        </div>
      </div>

      {/* Editor — grows to fill remaining space */}
      <textarea
        value={report}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        className="min-h-0 flex-1 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 shadow-inner outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 font-mono"
        placeholder="Your radiology report will appear here..."
      />
    </div>
  );
}