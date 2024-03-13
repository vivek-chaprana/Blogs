"use server";

import { SALT_ROUNDS } from "@/lib/constants";
import prisma from "@/prisma";
import { compare, hash } from "bcrypt";

export default async function resetPassword({
  newPassword,
  confirmPassword,
  email,
}: {
  newPassword: string;
  confirmPassword: string;
  email: string;
}) {
  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match!");

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found!");
  if (!user.email || !user.isVerified) throw new Error("Email not verified!");
  if (user.provider !== "email" || !user.hashedPassword)
    throw new Error("Reset passowrd isn't available for OAuth providers.");

  const isSamePassword = await compare(newPassword, user.hashedPassword);
  if (isSamePassword)
    throw new Error("New password cannot be the same as old password.");

  const hashedPassword = await hash(newPassword, SALT_ROUNDS);

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
        lastResetRequest: null,
      },
    });

    await prisma.resetToken.deleteMany({ where: { identifier: email } });
  } catch (err) {
    throw err;
  }
}
