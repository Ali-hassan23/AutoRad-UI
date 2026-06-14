import UsersTable from "@/components/Admin/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage accounts, roles, and activation status.
        </p>
      </div>
      <UsersTable />
    </div>
  );
}
