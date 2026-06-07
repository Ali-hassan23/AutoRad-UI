"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { listStudies, type StudyListItem } from "@/lib/studies";

export default function HistoryListClient() {
  const [items, setItems] = useState<StudyListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [mrnFilter, setMrnFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listStudies({
        limit: 100,
        mrn: mrnFilter.trim() || undefined,
      });
      setItems(data.items);
      setTotal(data.total);
    } catch {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  }, [mrnFilter]);

  useEffect(() => {
    const t = window.setTimeout(load, mrnFilter ? 300 : 0);
    return () => window.clearTimeout(t);
  }, [load, mrnFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Filter by MRN..."
          value={mrnFilter}
          onChange={(e) => setMrnFilter(e.target.value)}
          className="max-w-xs rounded-lg border border-border px-3 py-2 text-sm"
        />
        <p className="text-sm text-muted-foreground">{total} report(s)</p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No reports yet.{" "}
          <Link href="/preprocess" className="text-primary font-medium hover:underline">
            Generate your first report
          </Link>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">MRN</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Impression</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.study_id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{row.display_id}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{row.mrn}</td>
                  <td className="px-4 py-3">{row.patient_name || "—"}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                    {row.impression_snippet || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/history/${row.study_id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
