"use server";

import { sendNotification } from "@/lib/actions/notification";
import prisma from "@/prisma";
import { NotificationType } from "@prisma/client";

export default async function followUser(
  followerId: string,
  followingId: string
) {
  try {
    const follower = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
      select: {
        username: true,
        image: true,
        name: true,
      },
    });

    if (!follower) throw new Error("User not found");

    await prisma.user.update({
      where: {
        id: followerId,
      },
      data: {
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });

    await sendNotification({
      userIds: [followingId],
      message: `${
        follower.name || "@" + follower.username
      } started following you.`,
      link: `/${follower.username}`,
      notificationType: NotificationType.FOLLOW,
      iconUrl: follower.image ?? undefined,
    });
  } catch (error) {
    throw error;
  }
}
