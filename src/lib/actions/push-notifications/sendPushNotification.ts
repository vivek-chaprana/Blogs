"use server";

import { ADMIN_EMAIL, apiKeys } from "@/lib/constants";
import prisma from "@/prisma";
import webPush from "web-push";

export default async function sendPushNotification({
  userId,
  notificationId,
}: {
  userId: string;
  notificationId: string;
}) {
  try {
    webPush.setVapidDetails(
      `mailto:${ADMIN_EMAIL}`,
      apiKeys.publicKey,
      apiKeys.privateKey
    );

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) throw new Error("Subscription not found");

    webPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.auth,
          p256dh: subscription.p256dh,
        },
      },
      notificationId
    );
  } catch (error) {
    throw error;
  }
}
