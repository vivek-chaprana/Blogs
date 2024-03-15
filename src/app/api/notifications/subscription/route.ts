import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PushSubscription } from "web-push";

export async function POST(request: NextRequest) {
  const subscription = (await request.json()) as PushSubscription;

  if (!subscription) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid subscription",
      },
      {
        status: 400,
      }
    );
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await prisma.subscription.upsert({
      where: {
        userId,
      },
      update: {
        endpoint: subscription.endpoint,
        auth: subscription.keys.auth,
        p256dh: subscription.keys.p256dh,
      },
      create: {
        endpoint: subscription.endpoint,
        auth: subscription.keys.auth,
        p256dh: subscription.keys.p256dh,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscription saved",
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
