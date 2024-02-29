import NewStoryForm from "@/components/NewStoryForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
