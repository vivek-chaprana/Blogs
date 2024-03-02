import MarkAllNotificationsAsSeenButton from "@/components/sub-components/MarkAllNotificationsAsSeenButton";
import ParamsTabs from "@/components/sub-components/ParamsTabs";
import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME } from "@/lib/constants";
import prisma from "@/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notifications | " + COMPANY_NAME,
  description:
    "Catch up on the latest notifications from your network and the people you follow.",
};

export default async function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) redirect("/auth/login");

  const notificationsCount = await prisma.notification.count({
    where: {
      userId: user.id,
      seen: false,
    },
  });

  return (
    <main className="">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-dark-400 font-bold mt-5">
        Notifications
      </h1>
      <p className="text-sm text-gray-600 my-5">
        Catch up on the latest notifications from your network and the people
        you follow.
      </p>

      <div className="flex flex-wrap gap-2 xs:gap-5  text-sm border-b pt-10 pb-1 mb-3">
        <ParamsTabs
          base="/notifications"
          links={[
            {
              name: "All",
              params: "/",
            },
            {
              name: "Unseen",
              params: "unseen",
            },
            {
              name: "Responses",
              params: "responses",
            },
            {
              name: "Posts",
              params: "posts",
            },
            {
              name: "Follows",
              params: "follows",
            },
            {
              name: "System",
              params: "system",
            },
          ]}
        />

        {!!notificationsCount && (
          <MarkAllNotificationsAsSeenButton
            userId={user.id}
            variant="light"
            color="success"
            className="ms-auto text-green-600"
          />
        )}
      </div>

      <div>{children}</div>
    </main>
  );
}
