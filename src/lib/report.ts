const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getReport(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/generate/analyze`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Failed to generate report");
  }

  console.log("Report generation response:", res);

  return res.json();
}

export async function updateReport(id: string, report: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/generate/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (!res.ok) {
    throw new Error("Failed to update report");
  }
  return res.json();
}

export async function getReportById(id: string) {
  const res = await fetch(
    `${API_URL}/generate/${id}`,
    { cache: "no-store" }
  );

  console.log("Fetching report with ID:", id, "from URL:", `${API_URL}/generate/${id}`);
  console.log("Response status:", res);

  return res.json();
}
