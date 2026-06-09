"use client";

import { useCallback, useEffect, useState } from "react";
import type { PatientMetadata } from "@/lib/studies";
import {
  getDemographicMismatches,
  lookupPatientByMrn,
  type PatientLookupResult,
} from "@/lib/patientLookup";

export const emptyPatient: PatientMetadata = {
  mrn: "",
  patient_name: "",
  date_of_birth: "",
  age: "",
  gender: "",
  referring_physician: "",
  ward_opd: "",
  clinical_indication: "",
};

type Props = {
  value: PatientMetadata;
  onChange: (value: PatientMetadata) => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

export default function PatientDetailsSection({
  value,
  onChange,
  expanded,
  onExpandedChange,
}: Props) {
  const [baseline, setBaseline] = useState<PatientMetadata | null>(null);
  const [lookupInfo, setLookupInfo] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [mismatches, setMismatches] = useState<string[]>([]);

  const set = (field: keyof PatientMetadata, v: string) => {
    onChange({ ...value, [field]: v });
  };

  const applyLookup = useCallback(
    (result: PatientLookupResult) => {
      if (!result.found || !result.patient) {
        setBaseline(null);
        setLookupInfo(null);
        setMismatches([]);
        return;
      }

      const prefilled: PatientMetadata = {
        ...result.patient,
        mrn: value.mrn.trim(),
        clinical_indication: "",
      };
      setBaseline(result.patient);
      onChange(prefilled);
      setLookupInfo(
        `Existing patient found (last report: ${result.last_display_id ?? "—"}). Demographics prefilled; update clinical indication for this study.`
      );
      setMismatches([]);
    },
    [onChange, value.mrn]
  );

  const handleMrnLookup = useCallback(async () => {
    const mrn = value.mrn.trim();
    if (!mrn) {
      setBaseline(null);
      setLookupInfo(null);
      setMismatches([]);
      return;
    }

    setLookupLoading(true);
    try {
      const result = await lookupPatientByMrn(mrn);
      applyLookup(result);
    } catch {
      setLookupInfo(null);
    } finally {
      setLookupLoading(false);
    }
  }, [value.mrn, applyLookup]);

  useEffect(() => {
    if (baseline) {
      setMismatches(getDemographicMismatches(value, baseline));
    } else {
      setMismatches([]);
    }
  }, [value, baseline]);

  return (
    <div className="mt-6 rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={() => onExpandedChange(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900"
      >
        <span>Patient details {expanded ? "" : "(required before generating)"}</span>
        <span className="text-gray-500">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-gray-200 px-4 py-4">
          <div>
            <label className="block text-xs font-medium text-gray-700">
              MRN / Patient ID <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={value.mrn}
              onChange={(e) => {
                set("mrn", e.target.value);
                setBaseline(null);
                setLookupInfo(null);
                setMismatches([]);
              }}
              onBlur={handleMrnLookup}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. MRN-10234 — Press out of field to load existing patient"
            />
            {lookupLoading && (
              <p className="mt-1 text-xs text-gray-500">Looking up patient...</p>
            )}
            {lookupInfo && !lookupLoading && (
              <p className="mt-1 text-xs text-green-700">{lookupInfo}</p>
            )}
            {!lookupInfo && !lookupLoading && value.mrn.trim() && (
              <p className="mt-1 text-xs text-gray-500">
                New MRN — enter patient details below.
              </p>
            )}
          </div>

          {mismatches.length > 0 && (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <p className="font-medium">Demographics differ from prior record for this MRN:</p>
              <ul className="mt-1 list-inside list-disc">
                {mismatches.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="mt-1">
                Confirm this is the correct patient, or fix the MRN if entered by mistake.
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700">Patient name</label>
            <input
              type="text"
              value={value.patient_name || ""}
              onChange={(e) => set("patient_name", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">Date of birth</label>
              <input
                type="text"
                value={value.date_of_birth || ""}
                onChange={(e) => set("date_of_birth", e.target.value)}
                placeholder="YYYY-MM-DD"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">Age</label>
              <input
                type="text"
                value={value.age || ""}
                onChange={(e) => set("age", e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Gender</label>
            <select
              value={value.gender || ""}
              onChange={(e) => set("gender", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Referring physician</label>
            <input
              type="text"
              value={value.referring_physician || ""}
              onChange={(e) => set("referring_physician", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Ward / OPD</label>
            <input
              type="text"
              value={value.ward_opd || ""}
              onChange={(e) => set("ward_opd", e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Clinical indication</label>
            <textarea
              value={value.clinical_indication || ""}
              onChange={(e) => set("clinical_indication", e.target.value)}
              rows={2}
              placeholder="Reason for this study (new each visit)"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function canGenerateReport(
  file: File | null,
  patientExpanded: boolean,
  patient: PatientMetadata
): boolean {
  return Boolean(file && patientExpanded && patient.mrn.trim().length > 0);
}
