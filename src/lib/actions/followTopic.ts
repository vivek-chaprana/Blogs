"use server";

import prisma from "@/prisma";

export default async function followTopic(userId: string, topicId: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followingTopics: {
          connect: {
            id: topicId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
