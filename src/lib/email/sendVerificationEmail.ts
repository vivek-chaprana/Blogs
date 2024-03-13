import { VerificationEmailTemplate } from "@/components/email-templates";
import hashToken from "@/lib/auth/hashToken";
import prisma from "@/prisma";
import { randomBytes } from "crypto";
import { sendEmail } from ".";
import { WEBAPP_URL } from "../constants";

export default async function sendVerificationEmail({
  email,
}: {
  email: string;
}) {
  const token = randomBytes(32).toString("hex");
  const hashedToken = hashToken(token);

  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        lastEmailSent: new Date(),
      },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 days
      },
    });

    const callbackUrl = `${WEBAPP_URL}/auth/verify?success=true&email=${email}`;
    const url = `${WEBAPP_URL}/api/auth/callback/email?callbackUrl=${encodeURIComponent(
      callbackUrl
    )}&token=${token}&email=${email}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify your email address",
        html: VerificationEmailTemplate({ username: user.username, url }),
      });
    } catch (err) {
      throw new Error(`Error sending email to ${email}: ${err}`);
    }
  } catch (err) {
    throw new Error(`Something went wrong: ${err}`);
  }
}
