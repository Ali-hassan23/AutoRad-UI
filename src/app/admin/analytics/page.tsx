import AnalyticsPageClient from "@/components/Admin/AnalyticsPageClient";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Usage trends and event breakdowns.
        </p>
      </div>
      <AnalyticsPageClient />
    </div>
  );
}
