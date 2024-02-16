"use server";

import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export async function createComment(blogId: string, comment: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  if (!comment) throw new Error("Comment text is required.");

  try {
    await prisma.comment.create({
      data: {
        authorId: userId,
        blogPostId: blogId,
        text: comment,
      },
    });
  } catch (err) {
    throw new Error("Something went wrong!");
  }
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (err) {
    throw new Error("Something went wrong!");
  }
}
