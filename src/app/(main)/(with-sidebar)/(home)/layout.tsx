import HomePageTabs from "@/components/HomePageTabs";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  if (!currentUser) redirect("/auth/login");

  const foundUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      followingIDs: true,
      followingTopics: true,
    },
  });

  if (!foundUser) return notFound();

  return (
    <section>
      <HomePageTabs topics={foundUser.followingTopics} />
      {children}
    </section>
  );
}
