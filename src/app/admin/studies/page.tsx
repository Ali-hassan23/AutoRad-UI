import AdminStudiesTable from "@/components/Admin/AdminStudiesTable";

export default function AdminStudiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Studies</h1>
        <p className="text-sm text-muted-foreground">
          Global list of all studies across users.
        </p>
      </div>
      <AdminStudiesTable />
    </div>
  );
}
