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
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-lg backdrop-blur transition-smooth hover-lift">
      <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">Patient</p>
          <p className="text-lg font-semibold text-gray-900">Jane Doe • 48</p>
        </div>
        <span className="badge-success">
          Auto-ready
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {["Findings", "Impression", "Recommendations"].map((heading, idx) => (
          <div
            key={heading}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-smooth hover:shadow-md"
            style={{
              animation: `slideInLeft 0.5s ease-in-out ${idx * 0.1}s both`,
            }}
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {heading}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-11/12 rounded-full bg-gray-300 animate-pulse-soft" />
              <div className="h-2.5 w-10/12 rounded-full bg-gray-300 animate-pulse-soft" />
              <div className="h-2.5 w-9/12 rounded-full bg-gray-300 animate-pulse-soft" />
              {idx === 1 && <div className="h-2.5 w-8/12 rounded-full bg-blue-200" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white shadow-md transition-smooth hover:shadow-lg animate-pulse-soft">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-white/80">Quality check</p>
          <p className="text-sm font-semibold">No critical conflicts detected</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/20 px-3 py-1 text-sm font-semibold">
          <CheckIcon />
          Verified
        </div>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 animate-fade-in">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.10),transparent_40%)]" />
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur transition-smooth">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="AutoRad" width={44} height={44} className="rounded-lg bg-blue-600 p-2" />
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-gray-900 font-semibold">AutoRad</p>
                <p className="text-xs text-gray-600">Radiology AI copilot</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
              <Link href="#product" className="transition-smooth hover:text-blue-600">Product</Link>
              <Link href="#workflow" className="transition-smooth hover:text-blue-600">Workflow</Link>
              <Link href="#metrics" className="transition-smooth hover:text-blue-600">Outcomes</Link>
              <Link href="#cta" className="transition-smooth hover:text-blue-600">Pricing</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/auth"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 transition-smooth hover:ring-blue-500 hover:text-blue-600 md:block"
              >
                Sign in
              </Link>
              <Link href="/auth">
                <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-smooth">
                  Start trial
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 lg:grid-cols-2 lg:pt-20">
          <div className="space-y-6 text-gray-900 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 ring-1 ring-blue-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Clinician-ready drafts in seconds
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl text-gray-900">
              AI-generated chest X-ray reports with human-grade clarity.
            </h1>
            <p className="max-w-xl text-base text-gray-600 sm:text-lg">
              AutoRad accelerates radiology throughput with auditable, structured reports. Keep clinicians in control while the AI handles the heavy lifting.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth">
                <Button size="lg" className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-smooth hover-lift">
                  Generate my first report
                </Button>
              </Link>
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:ring-blue-500 hover:bg-blue-50 transition-smooth"
              >
                View sample workflow
              </Link>
            </div>

            <div className="grid gap-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 ring-1 ring-blue-200 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.12em] text-blue-700 font-semibold">{item.label}</p>
                  <p className="text-sm text-gray-800">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-in-top">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-400/30 blur-3xl" />
            <div className="absolute -right-14 bottom-4 h-28 w-28 rounded-full bg-indigo-400/30 blur-3xl" />
            <ReportMock />
          </div>
        </section>
      </div>

      <section id="product" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Built for radiology teams</p>
            <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">Precision where it matters</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              We combine computer vision with a clinician-first experience so teams can trust every impression that leaves the workstation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-sm font-medium text-gray-700">SOC2 in progress • On-prem ready</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-smooth hover-lift"
              style={{
                animation: `slideInTop 0.5s ease-in-out ${idx * 0.1}s both`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 transition-all group-hover:opacity-100" />
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  <CheckIcon />
                  Feature
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Workflow</p>
            <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">From upload to signed report</h2>
            <p className="max-w-2xl text-gray-600">
              A guided flow that keeps clinicians in the loop while AI does the heavy lifting.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div
                key={step}
                className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-smooth hover-lift"
                style={{
                  animation: `slideInTop 0.5s ease-in-out ${idx * 0.15}s both`,
                }}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metrics" className="mx-auto max-w-6xl space-y-10 px-6 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-600 font-semibold">Measured impact</p>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">Outcomes you can report on</h2>
          <p className="max-w-2xl text-gray-600">
            Purpose-built dashboards keep leadership in the loop with adoption and quality metrics.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-smooth hover-lift"
              style={{
                animation: `slideInTop 0.5s ease-in-out ${idx * 0.15}s both`,
              }}
            >
              <p className="text-3xl font-semibold text-blue-600">{metric.value}</p>
              <p className="mt-2 text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="bg-gradient-to-r from-blue-600 to-indigo-600 py-14 transition-smooth animate-fade-in">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 text-white md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-white/80">Start now</p>
            <h3 className="text-2xl font-semibold">Ready to see AutoRad in action?</h3>
            <p className="max-w-2xl text-white/90">
              Spin up a secure sandbox, generate your first report, and invite colleagues to review.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button className="rounded-full bg-white px-5 py-3 text-blue-600 hover:bg-gray-100 transition-smooth font-semibold">
                Create account
              </Button>
            </Link>
            <Link
              href="/auth"
              className="rounded-full px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/40 transition-smooth hover:ring-white/80 hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white inline-flex items-center justify-center font-semibold">AR</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">AutoRad</p>
              <p className="text-xs text-gray-500">AI for accelerated radiology</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <Link href="/generate" className="transition-smooth hover:text-blue-600">Product</Link>
            <Link href="/dashboard" className="transition-smooth hover:text-blue-600">Dashboard</Link>
            <Link href="/settings" className="transition-smooth hover:text-blue-600">Settings</Link>
            <Link href="/auth" className="transition-smooth hover:text-blue-600">Support</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
