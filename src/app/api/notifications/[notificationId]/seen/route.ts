import { markNotificationAsSeen } from "@/lib/actions/notification";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { notificationId } }: { params: { notificationId: string } }
) {
  if (!notificationId)
    return NextResponse.json({ success: false }, { status: 200 });

  try {
    await markNotificationAsSeen(notificationId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
