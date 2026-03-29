export default function GenerateIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50 text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-slate-900">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">AutoRad</p>
              <p className="text-[11px] text-slate-300">Radiology AI workspace</p>
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
            href="/dashboard"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
          >
            Back
          </a>
        </div>
      </header>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_42%)]" />

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">
          <div className="space-y-3 text-white">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-200">Generate</p>
            <h1 className="text-3xl font-semibold">Start a new report workflow</h1>
            <p className="max-w-3xl text-sm text-slate-200">
              Upload studies, let AutoRad draft the report, and refine it with the assistant before exporting.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/85 p-6 shadow-xl backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-900">1) Preprocess scan</h3>
              <p className="mt-2 text-sm text-slate-600">
                Clean, validate, and send your X-ray to the pipeline. We check orientation and de-identify headers.
              </p>
              <a
                href="/preprocess"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Go to preprocess
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/85 p-6 shadow-xl backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-900">2) Edit & export</h3>
              <p className="mt-2 text-sm text-slate-600">
                Once a draft is ready, open it in the workspace, collaborate with the AI assistant, and export a PDF.
              </p>
              <a
                href="/dashboard"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                View drafts
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
