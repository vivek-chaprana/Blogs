"use server";

import prisma from "@/prisma";
import { NotificationType } from "@prisma/client";

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

    await prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        message,
        link,
        type: notificationType,
        image: imageUrl,
      })),
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
