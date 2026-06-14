import { redirect } from "next/navigation";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import SignOutButton from "@/components/auth/SignOutButton";
import { getUser } from "@/lib/auth-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/auth?redirect=/admin");
  if (user.role !== "admin") redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50 text-foreground">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-teal-600 font-semibold">
              Administration
            </p>
            <p className="text-sm text-muted-foreground">
              Signed in as {user.full_name || user.email}
            </p>
          </div>
          <SignOutButton className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
            Sign out
          </SignOutButton>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
