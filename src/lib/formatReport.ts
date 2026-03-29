export function formatReport(report: any) {

  return `
STUDY
------
Modality: ${report.study.modality}
View: ${report.study.view}
Body Part: ${report.study.body_part}
Resolution: ${report.study.image_resolution}

FINDINGS
--------
${report.findings.map((f: string) => `• ${f}`).join("\n")}

IMPRESSION
----------
${report.impression}

RECOMMENDATIONS
---------------
${report.recommendations.map((r: string) => `• ${r}`).join("\n")}

Generated At: ${report.created_at}
`;
}