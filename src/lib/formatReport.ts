import type { PatientMetadata } from "@/lib/studies";

type ReportLike = {
  display_id?: string;
  refined_report?: string;
  raw_report?: string;
  is_xray?: boolean;
  is_chest_xray?: boolean;
  gate_confidence?: string;
  processing_time_seconds?: number | string;
  filename?: string;
  gate_reason?: string;
  patient?: PatientMetadata;
};

function pad(value: string | undefined | null, width = 20): string {
  const v = value?.trim() || "";
  return v;
}

export function formatReport(report: unknown): string {
  if (typeof report === "string") return report;

  const data =
    typeof report === "object" && report !== null
      ? (report as ReportLike)
      : {};

  const patient = data.patient;
  const refined = data.refined_report || data.raw_report || "";

  const findingsMatch = refined.match(/FINDINGS:\s*([\s\S]*?)(?=IMPRESSION:|$)/i);
  const impressionMatch = refined.match(/IMPRESSION:\s*([\s\S]*?)$/i);

  const findings = findingsMatch?.[1]?.trim() || data.raw_report || "No findings available.";
  const impression = impressionMatch?.[1]?.trim() || "See findings above.";

  const modality = data.is_xray ? "X-Ray" : "Unknown";
  const bodyPart = data.is_chest_xray ? "Chest" : "Unknown";
  const confidence = data.gate_confidence
    ? data.gate_confidence.charAt(0).toUpperCase() + data.gate_confidence.slice(1)
    : "N/A";
  const processingTime = data.processing_time_seconds
    ? `${Number(data.processing_time_seconds).toFixed(2)}s`
    : "N/A";

  return `
PATIENT INFORMATION
───────────────────────────────────
Patient Name        : ${pad(patient?.patient_name)}
MRN / Patient ID    : ${pad(patient?.mrn)}
Date of Birth       : ${pad(patient?.date_of_birth)}
Age                 : ${pad(patient?.age)}
Gender              : ${pad(patient?.gender)}
Referring Physician : ${pad(patient?.referring_physician)}
Ward / OPD          : ${pad(patient?.ward_opd)}

STUDY INFORMATION
───────────────────────────────────
Modality            : ${modality}
Body Part           : ${bodyPart}
Filename            : ${data.filename || "Unknown"}
Clinical Indication : ${pad(patient?.clinical_indication)}
Technique           :
Comparison Study    :
Gate Confidence     : ${confidence}
Processing Time     : ${processingTime}

FINDINGS
───────────────────────────────────
${findings}

IMPRESSION
───────────────────────────────────
${impression}

GATE ASSESSMENT
───────────────────────────────────
${data.gate_reason || "N/A"}

SIGN-OFF
───────────────────────────────────
Radiologist         :
Designation         :
Signature           :
Date of Report      :
`.trim();
}

/** Build formatReport input from study detail API response */
export function studyDetailToReportInput(detail: {
  display_id: string;
  filename?: string;
  patient: PatientMetadata;
  is_xray?: boolean;
  is_chest_xray?: boolean;
  gate_confidence?: string;
  gate_reason?: string;
  processing_time_seconds?: number;
  report: {
    edited_content?: string;
    refined_report: string;
    raw_report: string;
  };
}): ReportLike {
  const edited = detail.report.edited_content;
  if (edited) {
    return {
      display_id: detail.display_id,
      patient: detail.patient,
      refined_report: edited,
      raw_report: detail.report.raw_report,
      is_xray: detail.is_xray,
      is_chest_xray: detail.is_chest_xray,
      gate_confidence: detail.gate_confidence,
      gate_reason: detail.gate_reason,
      processing_time_seconds: detail.processing_time_seconds,
      filename: detail.filename,
    };
  }

  return {
    display_id: detail.display_id,
    patient: detail.patient,
    refined_report: detail.report.refined_report,
    raw_report: detail.report.raw_report,
    is_xray: detail.is_xray,
    is_chest_xray: detail.is_chest_xray,
    gate_confidence: detail.gate_confidence,
    gate_reason: detail.gate_reason,
    processing_time_seconds: detail.processing_time_seconds,
    filename: detail.filename,
  };
}
