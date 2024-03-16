import { IS_SERVER } from "@/lib/constants";
import toast from "react-hot-toast";

export default async function requestNotificationPermissions() {
  if (IS_SERVER) return;

  if (!("Notification" in window))
    return toast.error("Notifications not supported in this browser");

  const status = await Notification.requestPermission();

  if (status !== "granted") toast.error("Notification permission denied");
  else toast.success("Notification permission granted");
}
