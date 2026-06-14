import AuditLogTable from "@/components/Admin/AuditLogTable";

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Audit Log</h1>
        <p className="text-sm text-muted-foreground">
          Governance trail of logins, admin actions, and resource access.
        </p>
      </div>
      <AuditLogTable />
    </div>
  );
}
