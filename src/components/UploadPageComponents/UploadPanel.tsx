"use client";

import { predictXray } from "@/lib/preprocess";
import { getReport } from "@/lib/report";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Result = {
  is_chest_xray: boolean;
  view_type?: string;
  orientation?: string;
  body_part?: string;
  notes?: string;
};

export default function UploadPanel() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [state, setState] = useState<
    "idle" | "loading" | "valid" | "invalid"
  >("idle");

  async function handlePredict() {
    if (!file) return;

    try {
      setState("loading");

      const res = await predictXray(file);

      if (res.is_chest_xray) {
        setResult(res);
        setState("valid");
      } else {
        setResult(null);
        setState("invalid");
      }
    } catch (e) {
      console.error(e);
      setState("invalid");
    }
  }

async function handleProceed() {
  if (!file) return;

  setState("loading");

  const res = await getReport(file);

  router.push(`/generate/${res.report_id}`);
}

  function reset() {
    setFile(null);
    setResult(null);
    setState("idle");
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">

        <h2 className="text-xl font-semibold text-gray-900">
          Upload Scan (PNG/JPG)
        </h2>

        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-6 block w-full cursor-pointer rounded-lg border border-gray-300 p-3 text-sm
          file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />

        {state === "valid" && result && (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm">
            <p><b>Body Part:</b> {result.body_part}</p>
            <p><b>View:</b> {result.view_type}</p>
            <p><b>Orientation:</b> {result.orientation}</p>
            <p><b>Notes:</b> {result.notes}</p>
          </div>
        )}

        {state === "invalid" && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            Not a valid chest X-ray. Please upload another scan.
          </div>
        )}

        {state === "idle" && (
          <button
            onClick={handlePredict}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            Generate Report
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
            className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 text-white hover:bg-green-700"
          >
            Proceed Further
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