"use server";

import prisma from "@/prisma";
import { NotificationType } from "@prisma/client";
import { sendPushNotification } from "../push-notifications";

export async function sendNotification({
  userIds,
  message,
  link,
  notificationType,
  imageUrl,
}: {
  userIds: string[];
  message: string;
  link: string;
  notificationType: NotificationType;
  imageUrl?: string;
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

    createdNotifications.forEach(async (notification) => {
      await sendPushNotification({
        userId: notification.userId,
        notificationId: notification.id,
      });
    });
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
