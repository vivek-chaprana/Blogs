"use server";

import generateUniqueSlug from "@/lib/utils/generateUniqueSlug";
import prisma from "@/prisma";
import { JSONContent } from "@tiptap/core";
import { getServerSession } from "next-auth";

interface blogPublishParams {
  title: string;
  content: JSONContent;
}

export default async function publishBlog(params: blogPublishParams) {
  const { title, content } = params ?? {};
  if (!title || !content) throw new Error("Missing required fields");

  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  const id = session?.user?.id;

  const slug = await generateUniqueSlug();

  try {
    await prisma.blogPost.create({
      data: {
        title,
        content,
        slug,
        status: "PUBLISHED",
        authorId: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
