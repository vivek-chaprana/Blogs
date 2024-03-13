"use server";
import { sendVerificationEmail } from "@/lib/email";
import prisma from "@/prisma";

export default async function resendVerificationEmail({
  email,
}: {
  email: string;
}) {
  if (!email) throw new Error("Email is required");

  const { lastEmailSent, emailVerified, id } =
    (await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        lastEmailSent: true,
        emailVerified: true,
      },
    })) ?? {};

  if (emailVerified) return { success: false, error: "Email already verified" };

  if (!lastEmailSent) {
    await sendVerificationEmail({ email });
    return { success: true, lastEmailSent: new Date() };
  }

  if (lastEmailSent > new Date(new Date().getTime() - 1000 * 60 * 5)) {
    return { success: false, error: "Email already sent", lastEmailSent };
  }

  await sendVerificationEmail({ email });
  return { success: true, lastEmailSent: new Date() };
}
