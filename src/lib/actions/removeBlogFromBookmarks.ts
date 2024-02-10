"use server";

import prisma from "@/prisma";

export default async function removeBlogFromBookmarks({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedBlogPosts: {
          disconnect: {
            id: blogId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
