"use client";

import { useEffect, useState } from "react";
import { getAdminHealth, type AdminHealth } from "@/lib/admin";

export default function SystemHealthPanel() {
  const [health, setHealth] = useState<AdminHealth | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminHealth()
      .then(setHealth)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load health"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Checking system health...</p>;
  }

  if (error || !health) {
    return <p className="text-sm text-red-600">{error || "Health check failed"}</p>;
  }

  const checks = [
    { label: "API", ok: health.api_status === "ok", detail: health.api_status },
    { label: "Database", ok: health.database === "ok", detail: health.database },
    {
      label: "ML Model",
      ok: health.model_loaded,
      detail: health.model_loaded ? "Loaded" : "Not loaded",
    },
    {
      label: "Upload directory",
      ok: health.upload_dir_writable,
      detail: health.upload_dir_writable ? "Writable" : "Not writable",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {checks.map((check) => (
        <div
          key={check.label}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{check.label}</p>
            <p className="text-xs text-muted-foreground">{check.detail}</p>
          </div>
          <span
            className={`inline-flex h-3 w-3 rounded-full ${
              check.ok ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
