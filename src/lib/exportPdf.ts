import jsPDF from "jspdf";

export function exportReportPDF(report: string) {

  const doc = new jsPDF();

  const lines = doc.splitTextToSize(report, 180);

  doc.text(lines, 10, 10);

  doc.save("radiology_report.pdf");
}