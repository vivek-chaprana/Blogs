import { EditorPublishModalInputType } from "@/components/EditorPublishModal";
import { authOptions } from "@/lib/auth/auth-options";
import generateUniqueSlug from "@/lib/utils/generateUniqueSlug";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { JSONContent } from "@tiptap/core";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const data =
    <EditorPublishModalInputType & { content: JSONContent; title: string }>(
      await req.json()
    ) ?? {};

  if (!data.title) {
    return NextResponse.json(
      { success: false, message: "Missing title." },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { status: false, message: "Unauthorized" },
      { status: 401 }
    );
  const userId = session.user.id;

  const slug = await generateUniqueSlug();

  try {
    await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        slug,
        status: data.status ?? PostStatus.DRAFT,
        description: data.previewDesc,
        coverImage: data.coverImage,
        tags: data.tags
          ? data.tags.split(",").map((tag: string) => tag.trim())
          : [],
        author: {
          connect: {
            id: userId,
          },
        },
        topic: {
          connect: {
            slug: slugify(data.topic, { lower: true, strict: true }),
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      {
        status: false,
        message: getErrorMessage(e),
      },
      { status: 500 }
    );
  }
}
