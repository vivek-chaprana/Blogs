import NewStoryForm from "@/components/NewStoryForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "New Story | " + COMPANY_NAME,
  description:
    "Write and publish your story on " +
    COMPANY_NAME +
    " . Share your thoughts and ideas with the world.",
};

export default async function NewStory() {
  const { user } = (await getServerSession()) ?? {};

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen bg-white ">
      <NewStoryForm user={user} />
    </main>
  );
}
