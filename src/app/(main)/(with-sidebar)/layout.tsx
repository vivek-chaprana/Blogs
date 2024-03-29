import SidebarClientWrapper from "@/components/SidebarClientWrapper";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const GettingStarted = dynamic(() => import("@/components/GettingStarted"));
const LandingPage = dynamic(() => import("@/components/LandingPage"));
const SidebarHomepage = dynamic(() => import("@/components/SidebarHomepage"));

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  if (!user) return <LandingPage />;

  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex justify-center lg:justify-start relative">
      <section className="min-w-3xl max-w-3xl min-h-screen flex-1 px-2 sm:px-5 lg:ps-10 xl:px-0">
        {children}
      </section>

      {user && (
        <SidebarClientWrapper>
          <SidebarHomepage userId={user.id} />
        </SidebarClientWrapper>
      )}

      {user && !user.hasCompletedOnboarding && (
        <GettingStarted
          shouldOpen={true}
          image={user.image}
          name={user.name}
          userId={user.id}
        />
      )}
    </main>
  );
}
