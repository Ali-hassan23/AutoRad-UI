"use client";

import { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/Admin/AnalyticsCharts";
import { getAdminAnalytics, type AdminAnalytics } from "@/lib/admin";

type Range = "7d" | "30d" | "90d";

export default function AnalyticsPageClient() {
  const [range, setRange] = useState<Range>("7d");
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdminAnalytics(range)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load analytics"))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {(["7d", "30d", "90d"] as Range[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              range === r
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            }`}
          >
            {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading analytics...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {data && !loading && <AnalyticsCharts data={data} />}
    </div>
  );
}
