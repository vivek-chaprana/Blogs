"use client";

import { markNotificationAsSeen } from "@/lib/actions/notification";
import { fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Image, cn } from "@nextui-org/react";
import { Notification } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function NotificationCard({
  notificaiton,
}: {
  notificaiton: Notification;
}) {
  const router = useRouter();

  const handleClick = async () => {
    if (!notificaiton.seen) await markNotificationAsSeen(notificaiton.id);
    router.push(notificaiton.link);
    router.refresh();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-2 py-5 xs:p-5 border-b last:border-b-0 cursor-pointer rounded-lg rounded-s-none",
        notificaiton.seen
          ? "bg-gray-100"
          : "bg-white border-s-2 border-s-green-500"
      )}
    >
      <Image
        src={notificaiton.image || fallbackImageUrl}
        alt="Notification"
        width={40}
        height={40}
        radius="full"
        className="min-h-[30px] min-w-[30px]"
      />
      <div className="flex flex-col gap-1">
        <span className="font-medium">{notificaiton.message}</span>
        <span className="text-sm">
          {getFormattedDate(notificaiton.timestamp)}
        </span>
      </div>
    </div>
  );
}
