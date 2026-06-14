"use client";

import { predictXray } from "@/lib/preprocess";
import { createStudyAndAnalyze, type PatientMetadata } from "@/lib/studies";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PatientDetailsSection, {
  canGenerateReport,
  emptyPatient,
} from "./PatientDetailsSection";

type Result = {
  is_xray: boolean;
  is_chest_xray: boolean;
  confidence: number;
  reason: string;
  message: string;
};

export default function UploadPanel() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [patient, setPatient] = useState<PatientMetadata>(emptyPatient);
  const [patientExpanded, setPatientExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");

  const readyToValidate = canGenerateReport(file, patientExpanded, patient);

  async function handlePredict() {
    if (!file || !readyToValidate) return;

    try {
      setState("loading");
      setError(null);

      const res: Result = await predictXray(file);

      if (res.is_chest_xray) {
        setResult(res);
        setState("valid");
      } else {
        setResult(res);
        setState("invalid");
      }
    } catch (e) {
      console.error(e);
      setState("invalid");
      setError("Validation failed. Please try again.");
    }
  }

  async function handleProceed() {
    if (!file || !readyToValidate) return;
    setState("loading");
    setError(null);

    try {
      const res = await createStudyAndAnalyze(file, {
        ...patient,
        mrn: patient.mrn.trim(),
      });
      router.push(`/generate/${res.study_id}`);
    } catch (e) {
      console.error(e);
      setState("invalid");
      setError(e instanceof Error ? e.message : "Report generation failed.");
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setError(null);
    setState("idle");
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">

        <h2 className="text-xl font-semibold text-gray-900">
          Upload Scan (PNG/JPG)
        </h2>

        <PatientDetailsSection
          value={patient}
          onChange={setPatient}
          expanded={patientExpanded}
          onExpandedChange={setPatientExpanded}
        />

        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setResult(null);
            setState("idle");
            setError(null);
          }}
          className="mt-6 block w-full cursor-pointer rounded-lg border border-gray-300 p-3 text-sm
          file:mr-4 file:rounded-md file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-700"
        />

        {!patientExpanded && state === "idle" && (
          <p className="mt-3 text-xs text-amber-700">
            Expand Patient details and enter MRN before validating or generating.
          </p>
        )}

        {state === "valid" && result && (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm space-y-1">
            <p className="font-medium text-green-700">{result.message}</p>
            <p><b>Confidence:</b> {result.confidence}</p>
            <p><b>Reason:</b> {result.reason}</p>
          </div>
        )}

        {state === "invalid" && result && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 space-y-1">
            <p className="font-medium">{result.message}</p>
            <p><b>Reason:</b> {result.reason}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {state === "invalid" && !result && !error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            Validation failed. Please try again.
          </div>
        )}

        {state === "idle" && (
          <button
            onClick={handlePredict}
            disabled={!readyToValidate}
            className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Validate image
          </button>
        )}

        {state === "loading" && (
          <button
            disabled
            className="mt-6 w-full rounded-xl bg-gray-400 px-4 py-3 text-white"
          >
            Processing...
          </button>
        )}

        {state === "valid" && (
          <button
            onClick={handleProceed}
            disabled={!readyToValidate}
            className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Generate report
          </button>
        )}

        {state === "invalid" && (
          <button
            onClick={reset}
            className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-700"
          >
            Re-upload
          </button>
        )}
      </div>
    </section>
  );
}
