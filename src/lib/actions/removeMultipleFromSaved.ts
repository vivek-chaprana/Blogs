"use server";

import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";

export default async function removeMultipleFromSaved({
  blogs,
}: {
  blogs: string[];
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedBlogPosts: {
          disconnect: blogs.map((blog) => ({ id: blog })),
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
