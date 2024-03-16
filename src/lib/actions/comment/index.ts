"use server";

import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { NotificationType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { sendNotification } from "../notification";

export async function createComment(blogId: string, comment: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  if (!comment) throw new Error("Comment text is required.");

  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: {
        id: blogId,
      },
      select: {
        authorId: true,
        slug: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!blogPost) throw new Error("Blog post not found.");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found.");

    await prisma.comment.create({
      data: {
        authorId: userId,
        blogPostId: blogId,
        text: comment,
      },
    });

    await sendNotification({
      userIds: [blogPost.authorId].filter((id) => id !== userId),
      message: (user.name || "@" + user.username) + " commented on your post.",
      link: `/${blogPost.author.username}/${blogPost.slug}`,
      notificationType: NotificationType.COMMENT,
      iconUrl: user.image ?? undefined,
    });
  } catch (err) {
    throw new Error("Something went wrong!");
  }
}

export async function replyToComment(parentCommentId: string, comment: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  if (!comment) throw new Error("Comment text is required.");

  try {
    const parentComment = await prisma.comment.findUnique({
      where: {
        id: parentCommentId,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        blogPost: {
          select: {
            slug: true,
          },
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        image: true,
        name: true,
        username: true,
      },
    });

    if (!user) throw new Error("User not found");
    if (!parentComment) throw new Error("Parent comment not found");

    await prisma.comment.create({
      data: {
        authorId: userId,
        text: comment,
        blogPostId: parentComment.blogPostId,
        parentCommentId: parentCommentId,
      },
    });

    await sendNotification({
      userIds: [parentComment.authorId].filter((id) => id !== userId),
      message: `${user.name || "@" + user?.username} replied to your comment.`,
      link: `/${parentComment.author.username}/${parentComment.blogPost.slug}`,
      notificationType: NotificationType.REPLY,
      iconUrl: user.image ?? undefined,
    });
  } catch (err) {
    throw err;
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

export async function getCommentReplies(commentId: string) {
  return await prisma.comment.findMany({
    where: {
      parentCommentId: commentId,
    },
    include: {
      author: true,
      blogPost: {
        select: {
          authorId: true,
        },
      },
      replies: {
        include: {
          author: true,
          blogPost: {
            select: {
              authorId: true,
            },
          },
          parentComment: {
            include: {
              author: true,
            },
          },
          replies: {
            include: {
              _count: true,
            },
          },
        },
      },
    },
  });
}
