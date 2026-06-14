import AdminStatsCards from "@/components/Admin/AdminStatsCards";
import AnalyticsPageClient from "@/components/Admin/AnalyticsPageClient";
import { getAdminOverviewServer } from "@/lib/admin-server";

export default async function AdminOverviewPage() {
  let overview = null;
  let error = null;

  try {
    overview = await getAdminOverviewServer();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load overview";
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          System-wide metrics and recent activity trends.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {overview && <AdminStatsCards overview={overview} />}

      <div>
        <h2 className="mb-4 text-lg font-semibold">Analytics (7 days)</h2>
        <AnalyticsPageClient />
      </div>
    </div>
  );
}
