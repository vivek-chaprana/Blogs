import { EditorPublishModalInputType } from "@/components/EditorPublishModal";
import { sendNotification } from "@/lib/actions/notification";
import { authOptions } from "@/lib/auth/auth-options";
import generateUniqueSlug from "@/lib/utils/generateUniqueSlug";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import mySlugify from "@/lib/utils/mySlugify";
import prisma from "@/prisma";
import { NotificationType, PostStatus } from "@prisma/client";
import { JSONContent } from "@tiptap/core";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = <
      EditorPublishModalInputType & {
        content: JSONContent;
        title: string;
        readingTime: number;
      }
    >await req.json() ?? {};

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

  const slug = await generateUniqueSlug(data.title, userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        followedByIDs: true,
        image: true,
        name: true,
      },
    });

    if (!user)
      return NextResponse.json(
        { status: false, message: "User not found." },
        { status: 404 }
      );

    const topic = await prisma.topic.findUnique({
      where: {
        slug: mySlugify(data.topic),
      },
      select: {
        id: true,
        userIDs: true,
        name: true,
      },
    });

    if (!topic)
      return NextResponse.json(
        { status: false, message: "Topic not found." },
        { status: 404 }
      );

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
        readingTime: data.readingTime,
        author: {
          connect: {
            id: userId,
          },
        },
        topic: {
          connect: {
            id: topic.id,
          },
        },
      },
    });

    if (data.status !== PostStatus.PUBLISHED)
      return NextResponse.json({ success: true });

    // Sending notification to followers
    await sendNotification({
      userIds: user.followedByIDs,
      link: `/${user.username}/${slug}`,
      message: `${user.name || "@" + user.username} published a new blog.`,
      notificationType: NotificationType.FOLLOWER_POST,
      iconUrl: user.image || undefined,
      imageUrl: data.coverImage,
    });

    // Sending notification to topic followers
    await sendNotification({
      userIds: topic.userIDs.filter((id) => id !== userId),
      link: `/${user.username}/${slug}`,
      message: `A new blog was published in ${topic.name}.`,
      notificationType: NotificationType.TOPIC_POST,
      iconUrl: user.image ?? undefined,
      imageUrl: data.coverImage,
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

export async function PUT(req: NextRequest) {
  const data = <
      EditorPublishModalInputType & {
        content: JSONContent;
        title: string;
        readingTime: number;
        blogId: string;
      }
    >await req.json() ?? {};

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

  const slug = await generateUniqueSlug(data.title, userId);

  try {
    await prisma.blogPost.update({
      where: {
        id: data.blogId,
      },
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
        readingTime: data.readingTime,
        topic: {
          connect: {
            slug: mySlugify(data.topic),
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
