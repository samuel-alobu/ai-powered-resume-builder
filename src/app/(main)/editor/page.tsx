import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
  searchParams: Promise<{ resumeId: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

export default function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include:
      })
    : null;
  return <ResumeEditor />;
}
