import DeleteAccountModal from "@/components/DeleteAccountModal";
import EmailModal from "@/components/EmailModal";
import PasswordModal from "@/components/PasswordModal";
import ProfileModal from "@/components/ProfileModal";
import UsernameModal from "@/components/UsernameModal";
import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME } from "@/lib/constants";
import prisma from "@/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings | " + COMPANY_NAME,
  description:
    "Manage your account, profile, and settings on " + COMPANY_NAME + ".",
};

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/auth/login");

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!profile) return notFound();

  return (
    <main className="max-w-4xl mx-auto min-h-screen my-10 gap-10 flex relative">
      <section className="w-full min-h-screen flex-shrink-0">
        <h1 className="text-4xl font-bold pt-0  xs:py-5 md:py-10 ps-2 sm:ps-4">
          {" "}
          Settings
        </h1>

        <div>
          <EmailModal email={user?.email} />
          <UsernameModal username={user?.username} />
          <ProfileModal profile={profile} />
          <PasswordModal />
          <DeleteAccountModal />
        </div>
      </section>
    </main>
  );
}
