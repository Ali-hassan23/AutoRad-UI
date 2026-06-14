import SystemHealthPanel from "@/components/Admin/SystemHealthPanel";

export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">System Health</h1>
        <p className="text-sm text-muted-foreground">
          API, database, model, and storage status.
        </p>
      </div>
      <SystemHealthPanel />
    </div>
  );
}
