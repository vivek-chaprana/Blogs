"use server";
import prisma from "@/prisma";

export default async function unfollowUser(
  followerId: string,
  followingId: string
) {
  try {
    await prisma.user.update({
      where: {
        id: followerId,
      },
      data: {
        following: {
          disconnect: {
            id: followingId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
