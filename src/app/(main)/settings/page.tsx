import DeleteAccountModal from "@/components/DeleteAccountModal";
import EmailModal from "@/components/EmailModal";
import PasswordModal from "@/components/PasswordModal";
import ProfileModal from "@/components/ProfileModal";
import UsernameModal from "@/components/UsernameModal";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return null;

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!profile) return null;

  return (
    <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 flex relative">
      <section className="min-w-3xl max-w-3xl min-h-screen flex-shrink-0">
        <h1 className="text-4xl font-bold py-10"> Settings</h1>

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