"use server";

import ReportEmailTemplate from "@/components/email-templates/ReportEmailTemplate";
import { ADMIN_EMAIL } from "../constants";
import { sendEmail } from "../email";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";

export default async function sendReport(
  blogId: string,
  data: { reason: string; other?: string }
) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) throw new Error("Unauthorized");

  if (!data.reason) throw new Error("Reason is required");
  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Reported Blog: ${blogId}`,
      html: await ReportEmailTemplate({
        reportedBy: user.username,
        blogId,
        ...data,
      }),
    });
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
}
