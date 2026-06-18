import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";
import StudyWorkspace from "@/components/GeneratePageCompnents/StudyWorkspace";

type Props = {
  params: Promise<{ studyId: string }>;
};

export default async function HistoryStudyPage({ params }: Props) {
  const user = await getUser();
  if (!user) redirect("/auth");
  
  // Redirect admins to /admin
  if (user.role === "admin") redirect("/admin");

  const { studyId } = await params;

  return <StudyWorkspace studyId={studyId} mode="history" />;
}
