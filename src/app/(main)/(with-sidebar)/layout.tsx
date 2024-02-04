import SidebarHomepage from "@/components/SidebarHomepage";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const GettingStarted = dynamic(() => import("@/components/GettingStarted"));

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  if (!user) return <main>Unauthorized</main>;

  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex relative">
      <section className="min-w-3xl max-w-3xl min-h-screen flex-shrink-0">
        {children}
      </section>

      <SidebarHomepage />

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