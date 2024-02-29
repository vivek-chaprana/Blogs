import SidebarHomepage from "@/components/SidebarHomepage";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex justify-center lg:justify-start relative">
      <section className="min-w-3xl max-w-3xl min-h-screen flex-1 px-2 sm:px-5 lg:ps-10 xl:px-0">
        {children}
      </section>

      {user && <SidebarHomepage userId={user.id} />}
    </main>
  );
}
