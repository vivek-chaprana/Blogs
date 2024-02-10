"use server";

import prisma from "@/prisma";

export default async function followUser(
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
          connect: {
            id: followingId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
