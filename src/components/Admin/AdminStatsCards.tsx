import type { AdminOverview } from "@/lib/admin";

type Props = {
  overview: AdminOverview;
};

export default function AdminStatsCards({ overview }: Props) {
  const cards = [
    {
      label: "Total users",
      value: overview.users.total,
      sub: `${overview.users.active} active · ${overview.users.admins} admins`,
    },
    {
      label: "Studies",
      value: overview.studies.total,
      sub: `${overview.studies.today} today · ${overview.studies.this_week} this week`,
    },
    {
      label: "Reports",
      value: overview.reports.draft + overview.reports.final,
      sub: `${overview.reports.draft} draft · ${overview.reports.final} finalized`,
    },
    {
      label: "Avg processing",
      value: overview.system.avg_processing_time_seconds
        ? `${overview.system.avg_processing_time_seconds}s`
        : "—",
      sub: overview.system.model_loaded ? "Model loaded" : "Model not loaded",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{card.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
