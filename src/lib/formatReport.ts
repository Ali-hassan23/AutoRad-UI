export function formatReport(report: any): string {
  if (typeof report === "string") return report;

  const refined = report.refined_report || report.raw_report || "";

  const findingsMatch = refined.match(/FINDINGS:\s*([\s\S]*?)(?=IMPRESSION:|$)/i);
  const impressionMatch = refined.match(/IMPRESSION:\s*([\s\S]*?)$/i);

  const findings = findingsMatch?.[1]?.trim() || report.raw_report || "No findings available.";
  const impression = impressionMatch?.[1]?.trim() || "See findings above.";

  const modality = report.is_xray ? "X-Ray" : "Unknown";
  const bodyPart = report.is_chest_xray ? "Chest" : "Unknown";
  const confidence = report.gate_confidence
    ? report.gate_confidence.charAt(0).toUpperCase() + report.gate_confidence.slice(1)
    : "N/A";
  const processingTime = report.processing_time_seconds
    ? `${Number(report.processing_time_seconds).toFixed(2)}s`
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
Filename            : ${report.filename || "Unknown"}
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
${report.gate_reason || "N/A"}

SIGN-OFF
───────────────────────────────────
Radiologist         :
Designation         :
Signature           :
Date of Report      :
`.trim();
}