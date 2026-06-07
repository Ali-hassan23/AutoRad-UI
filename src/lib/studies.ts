/** Same-origin proxy so httpOnly cookies from login are sent (not cross-port to :8000) */
const API_BASE = "/api/studies";

const fetchOpts: RequestInit = {
  credentials: "include",
};

export type PatientMetadata = {
  mrn: string;
  patient_name?: string;
  date_of_birth?: string;
  age?: string;
  gender?: string;
  referring_physician?: string;
  ward_opd?: string;
  clinical_indication?: string;
};

export type StudyAnalysisResponse = {
  study_id: string;
  display_id: string;
  filename?: string;
  patient: PatientMetadata;
  is_xray: boolean;
  is_chest_xray: boolean;
  gate_confidence: string;
  gate_reason: string;
  raw_report: string;
  refined_report: string;
  heatmap_base64: string;
  processing_time_seconds: number;
};

export type StudyListItem = {
  study_id: string;
  display_id: string;
  mrn: string;
  patient_name?: string;
  filename?: string;
  status: string;
  impression_snippet?: string;
  created_at: string;
};

export type StudyListResponse = {
  items: StudyListItem[];
  total: number;
};

export type PriorStudySummary = {
  study_id: string;
  display_id: string;
  created_at: string;
  impression_snippet?: string;
};

export type StudyDetailResponse = {
  study_id: string;
  display_id: string;
  filename?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  patient: PatientMetadata;
  is_xray?: boolean;
  is_chest_xray?: boolean;
  gate_confidence?: string;
  gate_reason?: string;
  processing_time_seconds?: number;
  report: {
    id: string;
    raw_report: string;
    refined_report: string;
    edited_content?: string;
    status: string;
  };
  prior_studies: PriorStudySummary[];
};

export async function createStudyAndAnalyze(
  file: File,
  patient: PatientMetadata
): Promise<StudyAnalysisResponse> {
  const form = new FormData();
  form.append("file", file);
  form.append("mrn", patient.mrn);
  if (patient.patient_name) form.append("patient_name", patient.patient_name);
  if (patient.date_of_birth) form.append("date_of_birth", patient.date_of_birth);
  if (patient.age) form.append("age", patient.age);
  if (patient.gender) form.append("gender", patient.gender);
  if (patient.referring_physician)
    form.append("referring_physician", patient.referring_physician);
  if (patient.ward_opd) form.append("ward_opd", patient.ward_opd);
  if (patient.clinical_indication)
    form.append("clinical_indication", patient.clinical_indication);

  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    body: form,
    ...fetchOpts,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to generate report" }));
    const detail = err.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail[0]?.msg ?? "Failed to generate report"
          : res.status === 401
            ? "Not authenticated. Please log in again."
            : "Failed to generate report";
    throw new Error(message);
  }

  return res.json();
}

export async function listStudies(params?: {
  skip?: number;
  limit?: number;
  mrn?: string;
}): Promise<StudyListResponse> {
  const search = new URLSearchParams();
  if (params?.skip != null) search.set("skip", String(params.skip));
  if (params?.limit != null) search.set("limit", String(params.limit));
  if (params?.mrn) search.set("mrn", params.mrn);

  const qs = search.toString();
  const res = await fetch(`${API_BASE}${qs ? `?${qs}` : ""}`, {
    ...fetchOpts,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load studies");
  }

  return res.json();
}

export async function getStudy(studyId: string): Promise<StudyDetailResponse> {
  const res = await fetch(`${API_BASE}/${studyId}`, {
    ...fetchOpts,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Study not found");
  }

  return res.json();
}

export async function updateStudyReport(
  studyId: string,
  editedContent: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/${studyId}/report`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ edited_content: editedContent }),
    ...fetchOpts,
  });

  if (!res.ok) {
    throw new Error("Failed to save report");
  }
}

/** Proxied through Next.js so cookies work for img tags */
export function studyImageUrl(studyId: string): string {
  return `/api/studies/${studyId}/image`;
}

export function studyHeatmapUrl(studyId: string): string {
  return `/api/studies/${studyId}/heatmap`;
}
