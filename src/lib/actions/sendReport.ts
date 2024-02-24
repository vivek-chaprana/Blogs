"use server";

import {
  ReportBlogEmailTemplate,
  ReportCommentEmailTemplate,
} from "@/components/email-templates/ReportEmailTemplates";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";
import { ADMIN_EMAIL } from "../constants";
import { sendEmail } from "../email";

export default async function sendReport(
  reported: "blog" | "comment",
  id: string,
  data: {
    reason: string;
    other?: string;
  }
) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) throw new Error("Unauthorized");

  if (!data.reason) throw new Error("Reason is required");

  const html =
    reported === "blog"
      ? await ReportBlogEmailTemplate({
          reportedBy: user.username,
          blogId: id,
          ...data,
        })
      : reported === "comment"
      ? await ReportCommentEmailTemplate({
          reportedBy: user.username,
          commentId: id,
          ...data,
        })
      : null;

  if (!html) throw new Error("Invalid report type");

  try {
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Reported ${reported}: ${id}`,
      html,
    });
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
}
