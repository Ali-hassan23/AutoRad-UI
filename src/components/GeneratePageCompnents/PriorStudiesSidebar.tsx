import Link from "next/link";
import type { PriorStudySummary } from "@/lib/studies";

type Props = {
  mrn: string;
  currentStudyId: string;
  priors: PriorStudySummary[];
  basePath: "/history" | "/generate";
};

export default function PriorStudiesSidebar({
  mrn,
  currentStudyId,
  priors,
  basePath,
}: Props) {
  if (priors.length === 0) {
    return (
      <aside className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Prior studies</p>
        <p className="mt-2">No earlier reports for MRN {mrn}.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">Prior studies</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">MRN {mrn}</p>
      <ul className="mt-4 space-y-3">
        {priors.map((p) => (
          <li key={p.study_id}>
            <Link
              href={`${basePath}/${p.study_id}`}
              className={`block rounded-lg border px-3 py-2 text-sm transition hover:border-primary/40 hover:bg-white ${
                p.study_id === currentStudyId
                  ? "border-primary bg-white"
                  : "border-slate-200"
              }`}
            >
              <span className="font-medium text-slate-900">{p.display_id}</span>
              <span className="mt-1 block text-xs text-slate-500">
                {new Date(p.created_at).toLocaleDateString()}
              </span>
              {p.impression_snippet && (
                <span className="mt-1 block text-xs text-slate-600 line-clamp-2">
                  {p.impression_snippet}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
