import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";
import GenerateWorkspace from "@/components/GeneratePageCompnents/GenerateWorkspace";

export default async function GeneratePage() {
  const user = await getUser();

  if (!user) redirect("/auth");

  return <GenerateWorkspace />;
}
