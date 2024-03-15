import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { notificationId: string } }
) {
  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: params.notificationId,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: notification,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
