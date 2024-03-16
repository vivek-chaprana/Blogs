"use client";
import { IS_SERVER } from "@/lib/constants";
import requestNotificationPermissions from "@/lib/utils/requestNotificationPermissions";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubscribeToNotificationSidebar() {
  const [permission, setPermission] = useState("default");
  const router = useRouter();
  useEffect(() => {
    if (IS_SERVER) return;
    setPermission(Notification.permission);
    if (permission === "granted") router.refresh();
  }, []);

  return (
    <div className="rounded-md bg-green-200 text-black p-5 flex flex-col gap-4">
      <h3
        className={`font-semibold ${
          permission === "denied"
            ? "text-red-600"
            : permission === "granted"
            ? "text-green-800"
            : ""
        }`}
      >
        {permission === "denied"
          ? "You're Missing Out! 📰"
          : permission === "granted"
          ? "You're In the Loop! 🎉"
          : "Subscribe to Notifications 🔔"}
      </h3>

      <div className="flex flex-col">
        <p>
          {permission === "denied"
            ? "You're missing out on the latest updates and stories."
            : permission === "granted"
            ? "Keep an eye out for those notification pings – they're your gateway to the latest news, updates, and conversations happening right here in our vibrant community.            "
            : "Enable push notifications to get real-time updates on everything you care about."}
        </p>
      </div>
      {permission === "denied" && (
        <>
          <p className="hidden md:block">
            To enable push notifications, visit site settings and enable
            notifications.
          </p>
          <p className="md:hidden">
            To enable push notifications, open app info in your device settings
            and enable notifications.
          </p>
        </>
      )}
      {permission === "default" && (
        <Button
          size="sm"
          className="rounded-full bg-gray-900 text-gray-50 w-fit mx-auto"
          onClick={requestNotificationPermissions}
        >
          Subscribe
        </Button>
      )}
    </div>
  );
}
