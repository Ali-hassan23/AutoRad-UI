type ReportLike = {
  refined_report?: string;
  raw_report?: string;
  is_xray?: boolean;
  is_chest_xray?: boolean;
  gate_confidence?: string;
  processing_time_seconds?: number | string;
  filename?: string;
  gate_reason?: string;
};

export function formatReport(report: unknown): string {
  if (typeof report === "string") return report;

  const data =
    typeof report === "object" && report !== null
      ? (report as ReportLike)
      : {};

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
Patient Name        :
MRN / Patient ID    :
Date of Birth       :
Age                 :
Gender              :
Referring Physician :
Ward / OPD          :

STUDY INFORMATION
───────────────────────────────────
Modality            : ${modality}
Body Part           : ${bodyPart}
Filename            : ${data.filename || "Unknown"}
Clinical Indication :
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
