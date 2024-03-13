"use server";

import { ResetPasswordEmail } from "@/components/email-templates";
import { SALT_ROUNDS, WEBAPP_URL } from "@/lib/constants";
import { sendEmail } from "@/lib/email";
import prisma from "@/prisma";
import { hash } from "bcrypt";
import { randomBytes } from "crypto";

export default async function sendPasswordResetEmail({
  email,
}: {
  email: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User not found!");

  if (!user.email || !user.isVerified) throw new Error("Email not verified!");

  const token = randomBytes(32).toString("hex");
  const hashedToken = await hash(token, SALT_ROUNDS);

  if (
    user?.lastResetRequest &&
    user.lastResetRequest > new Date(Date.now() - 1000 * 60 * 60 * 24)
  )
    throw new Error("Email already sent!");

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastResetRequest: new Date(),
      },
    });

    await prisma.resetToken.create({
      data: {
        identifier: user.email,
        token: hashedToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const url = `${WEBAPP_URL}/auth/reset-password/${token}/${user.email}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: ResetPasswordEmail({
        name: user.name || undefined,
        username: user.username,
        email: user.email,
        url,
      }),
    });
  } catch (err) {
    throw err;
  }
}
