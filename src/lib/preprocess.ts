const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictXray(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/preprocess/validate-only`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Validation failed");
  }

  return res.json();
}