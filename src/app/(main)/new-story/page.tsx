import NewStoryForm from "@/components/NewStoryForm";
import { getServerSession } from "next-auth";

export default async function NewStory() {
  const { user } = (await getServerSession()) ?? {};

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white ">
      <NewStoryForm user={user} />
    </main>
  );
}
