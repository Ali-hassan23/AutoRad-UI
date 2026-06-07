import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";
import StudyWorkspace from "@/components/GeneratePageCompnents/StudyWorkspace";

type Props = {
  params: Promise<{ studyId: string }>;
};

export default async function GenerateStudyPage({ params }: Props) {
  const user = await getUser();
  if (!user) redirect("/auth");

  const { studyId } = await params;

  return <StudyWorkspace studyId={studyId} mode="generate" />;
}
