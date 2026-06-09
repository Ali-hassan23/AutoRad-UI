import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";

export default async function GeneratePage() {
  const user = await getUser();

  if (!user) redirect("/auth");

  redirect("/preprocess");
}
