import Link from "next/link";
import { adminStudyHeatmapUrl, adminStudyImageUrl } from "@/lib/admin";
import { getAdminStudyServer } from "@/lib/admin-server";

type Props = {
  params: Promise<{ studyId: string }>;
};

export default async function AdminStudyDetailPage({ params }: Props) {
  const { studyId } = await params;

  let study = null;
  let error = null;

  try {
    study = await getAdminStudyServer(studyId);
  } catch (e) {
    error = e instanceof Error ? e.message : "Study not found";
  }

  if (error || !study) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">{error || "Study not found"}</p>
        <Link href="/admin/studies" className="text-primary text-sm hover:underline">
          Back to studies
        </Link>
      </div>
    );
  }

  const reportText =
    study.edited_content || study.refined_report || study.raw_report || "";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/studies"
            className="text-xs text-primary hover:underline"
          >
            ← Back to studies
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">{study.display_id}</h1>
          <p className="text-sm text-muted-foreground">
            Owner: {study.owner_name || study.owner_email} ({study.owner_email})
          </p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {study.status}
        </span>
      </div>

      <div className="grid gap-4 rounded-xl border border-border bg-card p-5 text-sm md:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-muted-foreground">MRN</p>
          <p className="font-medium">{study.mrn}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Patient</p>
          <p className="font-medium">{study.patient_name || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Created</p>
          <p>{new Date(study.created_at).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Processing time</p>
          <p>
            {study.processing_time_seconds
              ? `${study.processing_time_seconds}s`
              : "—"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-3 text-sm font-semibold">Original X-ray</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={adminStudyImageUrl(studyId)}
            alt="Study X-ray"
            className="max-h-96 w-full rounded-lg object-contain bg-black/5"
          />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-3 text-sm font-semibold">Grad-CAM heatmap</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={adminStudyHeatmapUrl(studyId)}
            alt="Heatmap"
            className="max-h-96 w-full rounded-lg object-contain bg-black/5"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="mb-3 text-sm font-semibold">Report ({study.report_status})</p>
        <pre className="whitespace-pre-wrap text-sm text-foreground">{reportText}</pre>
      </div>
    </div>
  );
}
