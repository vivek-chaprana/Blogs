"use server";

import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function deleteBlog(id: string) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) throw new Error("Unauthorized");

  try {
    await prisma.blogPost.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function changeStatus(id: string, status: PostStatus) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) throw new Error("Unauthorized");

  try {
    await prisma.blogPost.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (e) {
    throw e;
  }
}
