import NotificationCard from "@/components/NotificationCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { Notification, NotificationType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Notifications({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect("/auth/login");

  const notifications = await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  function filterNotifications(notification: Notification) {
    const filter = searchParams?.filter;

    if (!filter) return true;

    if (filter === "unseen") return !notification.seen;

    if (filter === "responses")
      return (
        notification.type === NotificationType.COMMENT ||
        notification.type === NotificationType.REPLY
      );

    if (filter === "follows")
      return notification.type === NotificationType.FOLLOW;

    if (filter === "posts")
      return (
        notification.type === NotificationType.FOLLOWER_POST ||
        notification.type === NotificationType.TOPIC_POST
      );

    if (filter === "system")
      return (
        notification.type === NotificationType.SYSTEM ||
        notification.type === NotificationType.ANNOUNCEMENT
      );
  }

  if (!notifications.length)
    return <div className="py-5 text-center">You&apos;re all caught up.</div>;

  return (
    <div className="flex flex-col gap-2 ">
      {notifications.filter(filterNotifications).map((notification) => (
        <NotificationCard key={notification.id} notificaiton={notification} />
      ))}
    </div>
  );
}
