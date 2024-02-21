"use server";

import prisma from "@/prisma";

export default async function unfollowTopic(userId: string, topicId: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followingTopics: {
          disconnect: {
            id: topicId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
