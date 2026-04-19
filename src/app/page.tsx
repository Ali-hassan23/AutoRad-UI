import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  { label: "HIPAA-ready", detail: "Data stays encrypted in transit & at rest." },
  { label: "2.3x faster", detail: "Turnaround time versus manual dictation." },
  { label: "Structured", detail: "Consistent sections for Findings & Impression." },
];

const features = [
  {
    title: "Diagnostic-grade pipelines",
    copy: "State-of-the-art models tuned for thoracic findings with guardrails for uncertainty.",
  },
  {
    title: "Clinician-first review",
    copy: "Editable drafts, smart highlights, and citation notes for rapid sign-off.",
  },
  {
    title: "Enterprise controls",
    copy: "SSO, audit trails, and environment isolation to meet security reviews.",
  },
  {
    title: "Seamless integrations",
    copy: "HL7/FHIR-ready endpoints plus email notifications when reports are ready.",
  },
];

const steps = [
  "Upload a DICOM or PNG chest X‑ray securely.",
  "AutoRad detects key patterns and drafts a structured report.",
  "You review, edit, and export to your RIS/PACS instantly.",
];

const metrics = [
  { value: "98%", label: "Clinical acceptance after first draft" },
  { value: "11 min", label: "Avg. time saved per report" },
  { value: "24/7", label: "Inference availability with autoscaling" },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M5 12l4 4L19 7" />
    </svg>
  );
}

function ReportMock() {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur">
      <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-600">Patient</p>
          <p className="text-lg font-semibold text-slate-900">Jane Doe • 48</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Auto-ready
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {["Findings", "Impression", "Recommendations"].map((heading, idx) => (
          <div
            key={heading}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {heading}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-11/12 rounded-full bg-slate-100" />
              <div className="h-2.5 w-10/12 rounded-full bg-slate-100" />
              <div className="h-2.5 w-9/12 rounded-full bg-slate-100" />
              {idx === 1 && <div className="h-2.5 w-8/12 rounded-full bg-blue-100" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-md">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-white/70">Quality check</p>
          <p className="text-sm font-semibold">No critical conflicts detected</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1 text-sm font-semibold">
          <CheckIcon />
          Verified
        </div>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-white text-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.20),transparent_40%)]" />
        <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="AutoRad" width={44} height={44} className="rounded-lg bg-white p-2" />
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-slate-200">AutoRad</p>
                <p className="text-xs text-slate-400">Radiology AI copilot</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
              <Link href="#product" className="hover:text-white">Product</Link>
              <Link href="#workflow" className="hover:text-white">Workflow</Link>
              <Link href="#metrics" className="hover:text-white">Outcomes</Link>
              <Link href="#cta" className="hover:text-white">Pricing</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/auth"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/15 transition hover:ring-white/40 md:block"
              >
                Sign in
              </Link>
              <Link href="/auth">
                <Button className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                  Start trial
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 lg:grid-cols-2 lg:pt-20">
          <div className="space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Clinician-ready drafts in seconds
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              AI-generated chest X-ray reports with human-grade clarity.
            </h1>
            <p className="max-w-xl text-base text-slate-200 sm:text-lg">
              AutoRad accelerates radiology throughput with auditable, structured reports. Keep clinicians in control while the AI handles the heavy lifting.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth">
                <Button size="lg" className="rounded-full bg-blue-500 px-6 py-3 text-base font-semibold text-white hover:bg-blue-600">
                  Generate my first report
                </Button>
              </Link>
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:ring-white/40"
              >
                View sample workflow
              </Link>
            </div>

            <div className="grid gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-300">{item.label}</p>
                  <p className="text-sm text-white">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/40 blur-3xl" />
            <div className="absolute -right-14 bottom-4 h-28 w-28 rounded-full bg-cyan-400/40 blur-3xl" />
            <ReportMock />
          </div>
        </section>
      </div>

      <section id="product" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Built for radiology teams</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Precision where it matters</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              We combine computer vision with a clinician-first experience so teams can trust every impression that leaves the workstation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-sm font-medium text-slate-700">SOC2 in progress • On-prem ready</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                  <CheckIcon />
                  Feature
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Workflow</p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">From upload to signed report</h2>
            <p className="max-w-2xl text-slate-600">
              A guided flow that keeps clinicians in the loop while AI does the heavy lifting.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div
                key={step}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metrics" className="mx-auto max-w-6xl space-y-10 px-6 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-700">Measured impact</p>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Outcomes you can report on</h2>
          <p className="max-w-2xl text-slate-600">
            Purpose-built dashboards keep leadership in the loop with adoption and quality metrics.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-semibold text-slate-900">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="bg-gradient-to-r from-blue-600 to-indigo-600 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 text-white md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-white/70">Start now</p>
            <h3 className="text-2xl font-semibold">Ready to see AutoRad in action?</h3>
            <p className="max-w-2xl text-white/80">
              Spin up a secure sandbox, generate your first report, and invite colleagues to review.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button className="rounded-full bg-white px-5 py-3 text-slate-900 hover:bg-slate-100">
                Create account
              </Button>
            </Link>
            <Link
              href="/auth"
              className="rounded-full px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white inline-flex items-center justify-center font-semibold">AR</div>
            <div>
              <p className="text-sm font-semibold text-slate-900">AutoRad</p>
              <p className="text-xs text-slate-500">AI for accelerated radiology</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <Link href="/generate" className="hover:text-slate-900">Product</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
            <Link href="/settings" className="hover:text-slate-900">Settings</Link>
            <Link href="/auth" className="hover:text-slate-900">Support</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
