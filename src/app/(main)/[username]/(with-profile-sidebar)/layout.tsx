import ProfileSidebar from "@/components/ProfileSidebar";
import { COMPANY_NAME, fallbackMetadata } from "@/lib/constants";
import prisma from "@/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { username: string };
}>): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      username: params?.username,
    },
    select: {
      name: true,
      username: true,
      bio: true,
    },
  });

  if (!user) return fallbackMetadata;

  return {
    title: (user.name || "@" + user.username) + " | " + COMPANY_NAME,
    description: `The profile of ${
      user.name || "@" + user.username
    } on ${COMPANY_NAME}. ${user.bio}`,
  };
}

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
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex relative border-red-500 ">
      <section className="min-h-screen flex-1">{children}</section>
      <ProfileSidebar user={user} />
    </main>
  );
}
