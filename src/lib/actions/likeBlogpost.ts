"use server";

import prisma from "@/prisma";

export default async function likeBlogpost({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) {
  try {
    await prisma.blogPost.update({
      where: {
        id: blogId,
      },
      data: {
        likedByUsers: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (e) {
    throw e;
  }
}
