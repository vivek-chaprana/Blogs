import { authOptions } from "@/lib/auth/auth-options";
import generateUniqueSlug from "@/lib/utils/generateUniqueSlug";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, body, status } = (await req.json()) ?? {};

  if (!title || !body)
    return NextResponse.json(
      { success: false, message: "Missing title or body" },
      { status: 400 }
    );

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
        title,
        slug,
        content: body,
        status: status ?? PostStatus.DRAFT,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      {
        status: false,
        message:
          typeof e === "string"
            ? e
            : e instanceof Error
            ? e.message
            : "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
