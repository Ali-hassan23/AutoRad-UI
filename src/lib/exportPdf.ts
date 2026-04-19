import jsPDF from "jspdf";

const COLORS = {
  headerBg: [15, 23, 42] as [number, number, number],
  headerText: [255, 255, 255] as [number, number, number],
  sectionBg: [241, 245, 249] as [number, number, number],
  sectionText: [30, 41, 59] as [number, number, number],
  labelColor: [100, 116, 139] as [number, number, number],
  valueColor: [15, 23, 42] as [number, number, number],
  divider: [203, 213, 225] as [number, number, number],
  impressionBg: [239, 246, 255] as [number, number, number],
  impressionBorder: [59, 130, 246] as [number, number, number],
  watermark: [148, 163, 184] as [number, number, number],
  accent: [37, 99, 235] as [number, number, number],
};

const MARGIN = 14;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Inner padding inside prose boxes (left and right)
const BOX_PAD_LEFT = 8;   // space for accent bar (2) + gap (6)
const BOX_PAD_RIGHT = 8;
const PROSE_TEXT_W = CONTENT_W - BOX_PAD_LEFT - BOX_PAD_RIGHT;

function esc(t: string): string {
  return t.replace(/%/g, "%%");
}

function parseSection(report: string, heading: string): string {
  const pattern = new RegExp(
    `${heading}\\s*\\n[─-]+\\n([\\s\\S]*?)(?=\\n[A-Z][A-Z -]+\\n[─-]+|$)`,
    "i",
  );
  return report.match(pattern)?.[1]?.trim() ?? "";
}

function parseFields(block: string): { label: string; value: string }[] {
  return block
    .split("\n")
    .filter((l) => l.includes(":"))
    .map((l) => {
      const idx = l.indexOf(":");
      return { label: l.slice(0, idx).trim(), value: l.slice(idx + 1).trim() };
    })
    .filter((f) => f.label.length > 0);
}

export function exportReportPDF(report: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const now = new Date();
  let y = 0;

  const checkPageBreak = (needed: number) => {
    if (y + needed > 272) {
      doc.addPage();
      y = 16;
      drawWatermark();
    }
  };

  const drawWatermark = () => {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.watermark);
    doc.text("Assisted by AutoRad AI", PAGE_W - MARGIN, 289, { align: "right" });
    doc.setDrawColor(...COLORS.divider);
    doc.line(MARGIN, 285, PAGE_W - MARGIN, 285);
  };

  // ── Header ───────────────────────────────────────────────────────────────
  doc.setFillColor(...COLORS.headerBg);
  doc.rect(0, 0, PAGE_W, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.headerText);
  doc.text("RADIOLOGY REPORT", MARGIN, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("Department of Radiology | Radiology Information System", MARGIN, 17);
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  doc.text(`${dateStr} ${timeStr}`, PAGE_W - MARGIN, 11, { align: "right" });
  doc.setFillColor(37, 99, 235);
  doc.roundedRect(PAGE_W - MARGIN - 22, 18, 22, 7, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("FINAL", PAGE_W - MARGIN - 11, 23, { align: "center" });
  y = 35;
  drawWatermark();

  // ── Section header ───────────────────────────────────────────────────────
  const drawSectionHeader = (title: string) => {
    checkPageBreak(12);
    doc.setFillColor(...COLORS.sectionBg);
    doc.rect(MARGIN, y, CONTENT_W, 7, "F");
    doc.setDrawColor(...COLORS.accent);
    doc.rect(MARGIN, y, 2, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.sectionText);
    doc.text(title, MARGIN + 5, y + 4.8);
    y += 10;
  };

  // ── Field grid ───────────────────────────────────────────────────────────
  const drawFieldGrid = (fields: { label: string; value: string }[], cols = 2) => {
    const colW = CONTENT_W / cols;
    const textW = colW - 6; // right gutter per column
    let col = 0;
    let rowStartY = y;

    fields.forEach((f, i) => {
      if (col === 0) {
        checkPageBreak(14);
        rowStartY = y;
      }
      const x = MARGIN + col * colW + 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...COLORS.labelColor);
      doc.text(esc(f.label), x, rowStartY + 3.5, { maxWidth: textW });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...(f.value ? COLORS.valueColor : COLORS.labelColor));
      // Split value and show only first line to keep row height fixed
      const valLines = doc.splitTextToSize(esc(f.value || "—"), textW);
      doc.text(valLines[0] ?? "—", x, rowStartY + 8.5);

      col++;
      if (col >= cols || i === fields.length - 1) {
        col = 0;
        y = rowStartY + 13;
        if (i < fields.length - 1) {
          doc.setDrawColor(...COLORS.divider);
          doc.line(MARGIN, y - 1, PAGE_W - MARGIN, y - 1);
        }
      }
    });
    y += 3;
  };

  // ── Prose block ──────────────────────────────────────────────────────────
  const drawProseBlock = (text: string, highlight = false) => {
    if (!text || text === "—") { y += 2; return; }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);

    // CRITICAL: split using the exact text width that fits inside box padding
    const lines: string[] = doc.splitTextToSize(esc(text), PROSE_TEXT_W);

    const lineH = 5.5;
    const padTop = 7;
    const padBot = 7;
    const textX = MARGIN + BOX_PAD_LEFT; // left edge of text
    const maxRight = MARGIN + CONTENT_W - BOX_PAD_RIGHT; // right boundary (never crossed)

    let i = 0;
    while (i < lines.length) {
      const pageRemaining = 272 - y;
      const maxLines = Math.max(1, Math.floor((pageRemaining - padTop - padBot) / lineH));
      const chunk = lines.slice(i, i + maxLines);
      const boxH = chunk.length * lineH + padTop + padBot;

      // Box background + border
      if (highlight) {
        doc.setFillColor(...COLORS.impressionBg);
        doc.setDrawColor(...COLORS.impressionBorder);
      } else {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(...COLORS.divider);
      }
      doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2, 2, "FD");

      // Accent bar (highlight only)
      if (highlight) {
        doc.setFillColor(...COLORS.impressionBorder);
        doc.rect(MARGIN, y, 2, boxH, "F");
      }

      // Render each line individually — NO array pass to doc.text()
      // This guarantees text never exceeds maxRight
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...COLORS.valueColor);
      chunk.forEach((line, li) => {
        doc.text(
          line,
          textX,
          y + padTop + li * lineH,
          { maxWidth: PROSE_TEXT_W }, // hard clamp — clips any edge case
        );
      });

      i += chunk.length;
      y += boxH + 4;

      if (i < lines.length) {
        doc.addPage();
        y = 16;
        drawWatermark();
      }
    }
  };

  // ── Parse ────────────────────────────────────────────────────────────────
  const patientFields  = parseFields(parseSection(report, "PATIENT INFORMATION"));
  const studyFields    = parseFields(parseSection(report, "STUDY INFORMATION"));
  const findingsBlock  = parseSection(report, "FINDINGS");
  const impressionBlock = parseSection(report, "IMPRESSION");
  const gateBlock      = parseSection(report, "GATE ASSESSMENT");
  const signoffFields  = parseFields(parseSection(report, "SIGN-OFF"));

  // ── Render ───────────────────────────────────────────────────────────────
  drawSectionHeader("PATIENT INFORMATION");
  drawFieldGrid(patientFields, 2);

  drawSectionHeader("STUDY INFORMATION");
  drawFieldGrid(studyFields, 2);

  drawSectionHeader("FINDINGS");
  drawProseBlock(findingsBlock);

  drawSectionHeader("IMPRESSION");
  drawProseBlock(impressionBlock, true);

  drawSectionHeader("AI GATE ASSESSMENT");
  drawProseBlock(gateBlock);

  drawSectionHeader("SIGN-OFF");
  drawFieldGrid(signoffFields, 2);

  checkPageBreak(20);
  doc.setDrawColor(...COLORS.divider);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 5;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.labelColor);
  doc.text(
    "This report was generated with AI assistance (AutoRad AI) and reviewed by a qualified radiologist. For clinical use only.",
    MARGIN, y,
    { maxWidth: CONTENT_W },
  );

  doc.save(`radiology_report_${now.toISOString().slice(0, 10)}.pdf`);
}