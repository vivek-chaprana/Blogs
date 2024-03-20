import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

import { NotificationType } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { notificationId: string } }
) {
  const notificationTitleMap: Record<NotificationType, string> = {
    [NotificationType.FOLLOW]: "You've got a new follower!",
    [NotificationType.COMMENT]: "New comment on your post",
    [NotificationType.REPLY]: "Someone replied to your comment",
    [NotificationType.FOLLOWER_POST]: "New post from someone you follow",
    [NotificationType.TOPIC_POST]: "New post in a topic you follow",
    [NotificationType.SYSTEM]: "System update!",
    [NotificationType.ANNOUNCEMENT]: "Check out this announcement!",
  };

  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: params.notificationId,
      },
    });

    if (!notification)
      return NextResponse.json(
        { success: false, message: "Notification not found." },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: {
          ...notification,
          title: notificationTitleMap[notification.type],
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
