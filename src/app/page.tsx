"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  { label: "HIPAA-ready", detail: "Data encrypted in transit & at rest." },
  { label: "Doctor-led", detail: "Every report reviewed and signed by a clinician." },
  { label: "Structured output", detail: "Consistent Findings & Impression sections, every time." },
];

const features = [
  {
    title: "Chest X-ray verification",
    copy: "Before anything runs, AutoRad confirms the upload is a chest X-ray. Non-chest or unrecognised scans are flagged immediately — keeping the pipeline clean.",
  },
  {
    title: "AI report generation",
    copy: "Once verified, the model analyses the scan and produces a structured draft covering Findings, Impression, and Recommendations — ready for clinician review in seconds.",
  },
  {
    title: "Chatbot-assisted editing",
    copy: "Not happy with a section? Ask the built-in assistant to rephrase, expand, or correct specific parts of the report in plain language. Changes are previewed before applying.",
  },
  {
    title: "Export & save",
    copy: "Finalised reports export to PDF with one click. Studies and edited reports are saved to history so you can revisit, compare with prior scans, or share with colleagues.",
  },
];

const steps = [
  "Upload a chest X-ray. AutoRad verifies it is a valid chest scan before proceeding.",
  "The AI model analyses the image and drafts a structured radiology report.",
  "Review, edit with the assistant, then save or export as PDF — ready for sign-off.",
];

const metrics = [
  { value: "< 10 sec", label: "From upload to draft report" },
  { value: "100%", label: "Reports reviewed by a licensed clinician before use" },
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
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-secondary/20 bg-white/95 p-6 shadow-xl backdrop-blur">
      <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Patient</p>
          <p className="text-lg font-semibold text-foreground">Jane Doe • 48</p>
        </div>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          Auto-ready
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {["Findings", "Impression", "Recommendations"].map((heading, idx) => (
          <div
            key={heading}
            className="rounded-2xl border border-border bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {heading}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-11/12 rounded-full bg-muted" />
              <div className="h-2.5 w-10/12 rounded-full bg-muted" />
              <div className="h-2.5 w-9/12 rounded-full bg-muted" />
              {idx === 1 && <div className="h-2.5 w-8/12 rounded-full bg-secondary/20" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-md">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-primary-foreground/70">Quality check</p>
          <p className="text-sm font-semibold">No critical conflicts detected</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-1 text-sm font-semibold">
          <CheckIcon />
          Verified
        </div>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-sky-50 to-white text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.10),transparent_40%)]" />

        <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="AutoRad" width={44} height={44} className="rounded-lg bg-primary p-2" />
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-primary font-semibold">AutoRad</p>
                <p className="text-xs text-muted-foreground">Radiology AI copilot</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
              <a href="#product" className="hover:text-foreground transition" style={{ scrollBehavior: "smooth" }}
                onClick={(e) => { e.preventDefault(); document.getElementById("product")?.scrollIntoView({ behavior: "smooth" }); }}>
                Product
              </a>
              <a href="#workflow" className="hover:text-foreground transition"
                onClick={(e) => { e.preventDefault(); document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" }); }}>
                Workflow
              </a>
              <a href="#metrics" className="hover:text-foreground transition"
                onClick={(e) => { e.preventDefault(); document.getElementById("metrics")?.scrollIntoView({ behavior: "smooth" }); }}>
                Outcomes
              </a>
              <a href="#cta" className="hover:text-foreground transition"
                onClick={(e) => { e.preventDefault(); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }}>
                Get started
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/auth"
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20 transition hover:ring-primary/40 md:block"
              >
                Sign in
              </Link>
              <Link href="/auth">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-14 lg:grid-cols-2 lg:pt-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary ring-1 ring-secondary/20">
              <span className="h-2 w-2 rounded-full bg-accent" />
              AI-drafted reports, refined by you
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl text-foreground">
              Your expertise. AI-assisted efficiency.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              AutoRad drafts structured chest X-ray reports for clinician review. From scan to structured draft — reviewed and signed by you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth">
                <Button size="lg" className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 shadow-md">
                  Generate my first report
                </Button>
              </Link>
              <a
                href="#workflow"
                onClick={(e) => { e.preventDefault(); document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-primary ring-1 ring-primary/20 hover:bg-primary/5 transition cursor-pointer"
              >
                See how it works
              </a>
            </div>

            <div className="grid gap-4 rounded-2xl bg-gradient-to-br from-secondary/5 to-accent/5 p-4 ring-1 ring-border sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.12em] text-primary font-semibold">{item.label}</p>
                  <p className="text-sm text-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-14 bottom-4 h-28 w-28 rounded-full bg-secondary/20 blur-3xl" />
            <ReportMock />
          </div>
        </section>
      </div>

      <section id="product" className="mx-auto max-w-6xl space-y-8 px-6 py-16">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Built for radiology teams</p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Everything in one workflow</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              From scan validation to signed PDF — AutoRad handles each step while keeping the clinician in full control.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <p className="text-sm font-medium text-muted-foreground">HIPAA-ready • Clinician sign-off required</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-secondary/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  <CheckIcon />
                  Feature
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Workflow</p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">From upload to signed report</h2>
            <p className="max-w-2xl text-muted-foreground">
              A guided flow that keeps clinicians in the loop while AI does the heavy lifting.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div
                key={step}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {idx + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metrics" className="mx-auto max-w-6xl space-y-10 px-6 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">By the numbers</p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Built for clinical reality</h2>
          <p className="max-w-2xl text-muted-foreground">
            Designed around the actual constraints of a radiology department — speed, reliability, and clinician oversight.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md hover:border-secondary/30 transition"
            >
              <p className="text-3xl font-semibold text-primary">{metric.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="bg-gradient-to-r from-primary to-secondary py-14 shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 text-primary-foreground md:flex-row md:items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">Start now</p>
            <h3 className="text-2xl font-semibold">Ready to see AutoRad in action?</h3>
            <p className="max-w-2xl text-primary-foreground/90">
              Create an account, upload your first scan, and have a structured draft ready for review in seconds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button className="rounded-full bg-primary-foreground px-5 py-3 text-primary hover:bg-primary-foreground/90 font-semibold">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground inline-flex items-center justify-center font-semibold">AR</div>
            <div>
              <p className="text-sm font-semibold text-foreground">AutoRad</p>
              <p className="text-xs text-muted-foreground">AI for accelerated radiology</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
            <Link href="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
            <Link href="/settings" className="hover:text-foreground transition">Settings</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}