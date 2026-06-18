// app/terms/page.tsx
import Link from "next/link";

const LAST_UPDATED = "June 18, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-foreground">

      {/* Header */}
      <header className="border-b border-border bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
              AR
            </div>
            <span className="text-sm font-semibold text-foreground">AutoRad</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-12">

        {/* Hero */}
        <div className="mb-12 space-y-4 border-b border-slate-200 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Clinical Decision Support Tool — Not a Diagnostic Device
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Terms of Use &amp; HIPAA Notice
          </h1>
          <p className="max-w-2xl text-base text-slate-500 leading-relaxed">
            Please read these terms carefully before using AutoRad. By accessing or using this
            platform, you agree to be bound by the conditions described below.
          </p>
          <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Critical disclaimer — pulled to top, high visibility */}
        <div className="mb-10 rounded-2xl border-2 border-red-200 bg-red-50 p-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-red-800 uppercase tracking-wide">
                Important Clinical Disclaimer
              </p>
              <p className="mt-1.5 text-sm text-red-700 leading-relaxed">
                AutoRad is an <strong>AI-assisted drafting tool intended solely to support licensed
                radiologists and physicians</strong> in their clinical workflow. It is <strong>not a
                medical device</strong>, not approved for autonomous diagnosis, and <strong>must never
                be used as a substitute for independent clinical judgment</strong>.
              </p>
              <p className="mt-2 text-sm text-red-700 leading-relaxed">
                All AI-generated report content is a <strong>draft suggestion only</strong>. It may
                be incomplete, inaccurate, or misleading. A qualified, licensed clinician must
                review, verify, and take full responsibility for any report before it is used in
                patient care. AutoRad makes <strong>no representations or warranties</strong> as to
                the accuracy, completeness, or clinical reliability of any generated output.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10">

          {/* 1 */}
          <Section number="1" title="Acceptance of Terms">
            <p>
              By creating an account, logging in, or using any feature of AutoRad
              (the &ldquo;Platform&rdquo;), you (&ldquo;User&rdquo;) confirm that you have read,
              understood, and agree to these Terms of Use and our Privacy &amp; HIPAA Notice. If you
              do not agree, you must immediately discontinue use of the Platform.
            </p>
            <p className="mt-3">
              These terms apply to all users, including radiologists, physicians, residents,
              technologists, and any administrative staff granted access.
            </p>
          </Section>

          {/* 2 */}
          <Section number="2" title="Nature of the Service — Assistive Tool Only">
            <p>
              AutoRad uses machine learning models trained on chest X-ray datasets to generate
              draft radiology reports. The Platform is designed exclusively as a <strong>clinical
              decision support aid</strong> and falls within the scope of tools intended to assist,
              not replace, a licensed clinician&rsquo;s judgment.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <Li>The AI output is a <strong>first-draft suggestion</strong>, not a final or authoritative report.</Li>
              <Li>AutoRad does <strong>not</strong> provide diagnoses, treatment recommendations, or clinical opinions.</Li>
              <Li>The accuracy, sensitivity, and specificity of the AI model are <strong>not guaranteed</strong> for any individual case.</Li>
              <Li>The model may fail to detect findings, generate false findings, or produce clinically inappropriate language.</Li>
              <Li>The final signed report is the sole responsibility of the reviewing licensed clinician.</Li>
            </ul>
          </Section>

          {/* 3 */}
          <Section number="3" title="HIPAA Compliance &amp; Protected Health Information">
            <p>
              AutoRad operates as a <strong>HIPAA-compliant Business Associate</strong> where
              applicable under 45 C.F.R. Parts 160 and 164. The following provisions govern the
              handling of Protected Health Information (&ldquo;PHI&rdquo;):
            </p>
            <SubHeading>3.1 Use and Disclosure of PHI</SubHeading>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <Li>PHI uploaded to AutoRad (including imaging data and patient identifiers) is used solely to provide the AI report drafting service.</Li>
              <Li>PHI is <strong>never sold, rented, or shared</strong> with third parties for marketing or commercial purposes.</Li>
              <Li>PHI may be disclosed only as required by law or as permitted under an executed Business Associate Agreement (&ldquo;BAA&rdquo;).</Li>
            </ul>
            <SubHeading>3.2 Safeguards</SubHeading>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <Li>Data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</Li>
              <Li>Access controls, audit logging, and role-based permissions are enforced.</Li>
              <Li>Uploaded images are processed in isolated compute environments and are not retained beyond the session unless explicitly saved by the user.</Li>
            </ul>
            <SubHeading>3.3 Covered Entity Responsibilities</SubHeading>
            <p className="mt-2 text-sm text-slate-700">
              The healthcare organization deploying AutoRad is the Covered Entity under HIPAA and
              is responsible for ensuring that its use of the Platform complies with applicable
              law, including obtaining patient authorizations where required and executing a BAA
              with Anthropic / AutoRad prior to processing any PHI.
            </p>
            <SubHeading>3.4 Breach Notification</SubHeading>
            <p className="mt-2 text-sm text-slate-700">
              In the event of a breach of unsecured PHI, AutoRad will notify the Covered Entity
              without unreasonable delay and no later than 60 calendar days after discovery, in
              accordance with 45 C.F.R. § 164.410.
            </p>
          </Section>

          {/* 4 */}
          <Section number="4" title="Permitted Users &amp; Access Controls">
            <p>Access to AutoRad is restricted to:</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <Li>Licensed radiologists, physicians, and other clinicians authorised by their institution.</Li>
              <Li>Supervised trainees (residents, fellows) under direct attending oversight.</Li>
              <Li>Authorised administrative staff with a legitimate need defined by the Covered Entity.</Li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">
              Users must not share credentials, allow unauthorised access, or use the Platform
              outside the scope of their professional role.
            </p>
          </Section>

          {/* 5 */}
          <Section number="5" title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, AutoRad, its developers,
              affiliates, and licensors shall not be liable for:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <Li>Any clinical outcome, adverse event, misdiagnosis, or patient harm arising from reliance on AI-generated report content.</Li>
              <Li>Errors, omissions, or inaccuracies in any report draft produced by the Platform.</Li>
              <Li>Loss of data, service interruptions, or failure of the Platform to detect any pathology.</Li>
              <Li>Any indirect, incidental, special, or consequential damages arising from use of the Platform.</Li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">
              The User and the Covered Entity assume full clinical and legal responsibility for all
              final reports signed and issued through or based upon AutoRad output.
            </p>
          </Section>

          {/* 6 */}
          <Section number="6" title="No Warranty">
            <p>
              The Platform is provided <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as
              available&rdquo;</strong> without warranty of any kind, express or implied. AutoRad
              does not warrant that:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <Li>The AI model will perform with any specific level of sensitivity, specificity, or accuracy for any individual study.</Li>
              <Li>The service will be uninterrupted, error-free, or free from security vulnerabilities.</Li>
              <Li>The generated reports will be suitable for any specific clinical purpose.</Li>
            </ul>
          </Section>

          {/* 7 */}
          <Section number="7" title="Data Retention &amp; Deletion">
            <p>
              Uploaded imaging studies and generated reports are retained only as long as necessary
              to provide the service and comply with applicable law. Users and Covered Entities may
              request deletion of PHI by contacting the AutoRad data protection team. Retention
              schedules are defined in the BAA executed between the parties.
            </p>
          </Section>

          {/* 8 */}
          <Section number="8" title="Prohibited Uses">
            <ul className="space-y-2 text-sm text-slate-700">
              <Li>Using AutoRad output as the sole basis for a clinical decision without independent physician review.</Li>
              <Li>Uploading images of patients without appropriate authorisation or outside the scope of a valid BAA.</Li>
              <Li>Attempting to reverse-engineer, extract, or replicate the underlying AI model.</Li>
              <Li>Using the Platform in any jurisdiction where doing so would violate local law or regulation.</Li>
              <Li>Sharing, publishing, or distributing AI-generated draft content as a final authoritative clinical report.</Li>
            </ul>
          </Section>

          {/* 9 */}
          <Section number="9" title="Regulatory Status">
            <p>
              AutoRad is positioned as a <strong>clinical decision support tool</strong> and is not
              currently cleared or approved as a medical device by the U.S. Food and Drug
              Administration (FDA), the Medicines and Healthcare products Regulatory Agency
              (MHRA), or any other regulatory body. Users are responsible for ensuring that their
              use of the Platform is consistent with applicable regulations in their jurisdiction.
            </p>
          </Section>

          {/* 10 */}
          <Section number="10" title="Amendments">
            <p>
              AutoRad reserves the right to update these Terms at any time. Material changes will
              be communicated via the Platform or email at least 14 days before taking effect.
              Continued use after the effective date constitutes acceptance of the revised Terms.
            </p>
          </Section>

          {/* 11 */}
          <Section number="11" title="Governing Law">
            <p>
              These Terms are governed by the laws of the State of Delaware, United States, without
              regard to conflict-of-law principles. Any dispute arising under these Terms shall be
              resolved by binding arbitration in accordance with the rules of the American
              Arbitration Association, except where prohibited by applicable law.
            </p>
          </Section>

        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-slate-200 pt-10 text-center">
          <p className="text-sm text-slate-500 max-w-lg">
            By using AutoRad you confirm you have read and accepted these terms, and that you are
            a licensed healthcare professional using this tool in a supervised clinical context.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
          >
            Back 
          </Link>
        </div>

      </main>
    </div>
  );
}

/* ── Small layout helpers ── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-xs font-bold tabular-nums text-primary/60">{number}.</span>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="pl-5 text-sm text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
      <span>{children}</span>
    </li>
  );
}