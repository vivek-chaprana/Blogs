import BlogsHomepage from "@/components/BlogsHomepage";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const GettingStarted = dynamic(() => import("@/components/GettingStarted"));

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  if (!user) return <main>Unauthorized</main>;

  return (
    <main className="max-w-4xl mx-auto min-h-screen border border-black">
      <BlogsHomepage />
      {user && !user.hasCompletedOnboarding && (
        <GettingStarted
          shouldOpen={true}
          image={user?.image}
          name={user?.name}
        />
      )}
    </main>
  );
}
