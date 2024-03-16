"use client";
import { IS_SERVER } from "@/lib/constants";
import requestNotificationPermissions from "@/lib/utils/requestNotificationPermissions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function SubscribeToNotificationModal({
  shouldOpen,
}: {
  shouldOpen: boolean;
}) {
  const { onOpenChange, isOpen } = useDisclosure();
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (IS_SERVER) return;
    setPermission(Notification.permission);
  }, []);

  if (permission === "granted") return null;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={shouldOpen && !isOpen}
      closeButton
      size="lg"
    >
      <ModalContent>
        <ModalHeader className={permission === "denied" ? "text-red-600" : ""}>
          {permission === "denied"
            ? "You're Missing Out! 📰"
            : "Subscribe to Notifications 🔔"}
        </ModalHeader>
        <ModalBody>
          {permission === "denied" ? (
            <>
              <p className="font-medium">
                Enabling push notifications ensures you never miss a beat.
              </p>
              <p>
                From breaking news to exciting announcements, you'll be among
                the first to know when something new happens.
              </p>
              <p className="hidden md:block">
                To enable push notifications, visit site settings and enable
                notifications.
              </p>
              <p className="md:hidden">
                To enable push notifications, open app info in your device
                settings and enable notifications.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium ">
                Stay in the loop and never miss a beat!
              </p>

              <p className="text-sm">
                Enable push notifications to get real-time updates on everything
                you care about. From new posts and comments to mentions and
                follows, you'll be the first to know.
              </p>
            </>
          )}
        </ModalBody>
        {permission !== "denied" && (
          <ModalFooter>
            <Button
              onClick={async () => {
                await requestNotificationPermissions();
                onOpenChange();
              }}
              className="bg-dark-200 text-gray-100 w-fit"
            >
              Subscribe to notifications
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
