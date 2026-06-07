import type { PatientMetadata } from "@/lib/studies";

export type PatientLookupResult = {
  found: boolean;
  patient?: PatientMetadata;
  last_display_id?: string;
};

const DEMOGRAPHIC_FIELDS: (keyof PatientMetadata)[] = [
  "patient_name",
  "date_of_birth",
  "age",
  "gender",
];

function norm(value: string | undefined | null): string {
  return (value ?? "").trim().toLowerCase();
}

export async function lookupPatientByMrn(
  mrn: string
): Promise<PatientLookupResult> {
  const trimmed = mrn.trim();
  if (!trimmed) return { found: false };

  const res = await fetch(
    `/api/studies/lookup-patient?mrn=${encodeURIComponent(trimmed)}`,
    { credentials: "include", cache: "no-store" }
  );

  if (!res.ok) return { found: false };
  return res.json();
}

/** Fields that differ from the last saved record for this MRN */
export function getDemographicMismatches(
  current: PatientMetadata,
  baseline: PatientMetadata
): string[] {
  const labels: Record<string, string> = {
    patient_name: "Patient name",
    date_of_birth: "Date of birth",
    age: "Age",
    gender: "Gender",
  };

  const mismatches: string[] = [];
  for (const field of DEMOGRAPHIC_FIELDS) {
    const base = norm(baseline[field]);
    const cur = norm(current[field]);
    if (base && cur && base !== cur) {
      mismatches.push(
        `${labels[field]}: on file "${baseline[field]}", entered "${current[field]}"`
      );
    }
  }
  return mismatches;
}
