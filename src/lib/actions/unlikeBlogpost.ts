"use server";

import prisma from "@/prisma";

export default async function unlikeBlogpost({
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
          disconnect: {
            id: userId,
          },
        },
      },
    });
  } catch (e) {
    throw e;
  }
}
