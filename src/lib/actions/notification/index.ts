"use server";

import { sendBatchPushNotifications } from "@/lib/actions/push-notifications";
import prisma from "@/prisma";
import { NotificationType } from "@prisma/client";

export async function sendNotification({
  userIds,
  message,
  link,
  iconUrl,
  imageUrl,
  notificationType,
}: {
  userIds: string[];
  message: string;
  link: string;
  iconUrl?: string;
  imageUrl?: string;
  notificationType: NotificationType;
}) {
  try {
    if (!userIds.length) return;

    const createdAfter = new Date();
    await prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        message,
        link,
        type: notificationType,
        icon: iconUrl,
        image: imageUrl,
      })),
    });

    const createdNotifications = await prisma.notification.findMany({
      where: {
        timestamp: {
          gte: createdAfter,
        },
      },
      select: {
        id: true,
        userId: true,
      },
    });

    await sendBatchPushNotifications(createdNotifications);
  } catch (e) {
    throw e;
  }
}

export async function getNotifications(userId: string, take?: number) {
  try {
    return await prisma.notification.findMany({
      where: {
        userId,
        seen: false,
      },
      orderBy: {
        timestamp: "desc",
      },
      take,
    });
  } catch (e) {
    throw e;
  }
}

export async function markNotificationAsSeen(id: string) {
  try {
    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        seen: true,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function markAllNotificationsAsSeen(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId,
        seen: false,
      },
      data: {
        seen: true,
      },
    });
  } catch (e) {
    throw e;
  }
}
