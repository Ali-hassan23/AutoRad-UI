import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  // Redirect to auth if not authenticated
  if (!user) redirect("/auth");
  
  // Redirect admins to /admin
  if (user.role === "admin") redirect("/admin");

  return children;
}
