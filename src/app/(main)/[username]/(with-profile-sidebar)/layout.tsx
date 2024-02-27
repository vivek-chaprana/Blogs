import ProfileSidebar from "@/components/ProfileSidebar";
import prisma from "@/prisma";
import { notFound } from "next/navigation";

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex relative">
      <section className="min-h-screen flex-1">{children}</section>
      <ProfileSidebar user={user} />
    </main>
  );
}
