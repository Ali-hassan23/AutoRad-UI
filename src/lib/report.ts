/**
 * @deprecated Use @/lib/studies for report persistence.
 * Kept for backward compatibility during transition.
 */
import { createStudyAndAnalyze, getStudy, updateStudyReport } from "@/lib/studies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getReport(file: File) {
  return createStudyAndAnalyze(file, { mrn: "UNKNOWN" });
}

export async function updateReport(id: string, report: Record<string, unknown>) {
  const content =
    typeof report.edited_content === "string"
      ? report.edited_content
      : JSON.stringify(report);
  return updateStudyReport(id, content);
}

export async function getReportById(id: string) {
  return getStudy(id);
}

export { createStudyAndAnalyze, getStudy, updateStudyReport, API_URL };
