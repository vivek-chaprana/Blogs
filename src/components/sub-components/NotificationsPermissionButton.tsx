"use client";
import sendPushNotification from "@/lib/actions/push-notifications/sendPushNotification";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function NotificationsPermissionButton({
  userId,
}: {
  userId: string;
}) {
  async function requestPermissions() {
    const status = await Notification.requestPermission();

    if (status !== "granted") toast.error("Notification permission denied");
    else toast.success("Notification permission granted");
  }

  const sendNotification = async () => {
    try {
      await sendPushNotification({
        userId,
        notificationId: "65e20c4ce9fe52100fe94795",
      });
    } catch (error) {
      console.error("Error sending push notification: ", error);
    }
  };

  return (
    <>
      <Button onClick={requestPermissions} variant="light">
        Request Notification Permission
      </Button>
      <Button onClick={sendNotification}>Send Notification</Button>
    </>
  );
}
