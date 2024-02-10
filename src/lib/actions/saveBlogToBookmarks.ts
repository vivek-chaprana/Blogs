"use server";

import prisma from "@/prisma";

export default async function saveBlogToBookmarks({
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
          connect: {
            id: blogId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
