"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";
import prisma from "@/prisma";
import { SALT_ROUNDS } from "../constants";
import { compare, hash } from "bcrypt";

export default async function updatePassword(
  oldPassword: string,
  newPassword: string
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) throw new Error("You must be signed in to update your password");

  if (!oldPassword || !newPassword) throw new Error("Missing required fields");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      hashedPassword: true,
    },
  });

  if (!user) throw new Error("User not found");

  if (!user.hashedPassword)
    throw new Error("User does not have a password set");

  const isValid = await compare(oldPassword, user.hashedPassword);
  if (!isValid) throw new Error("Incorrect password.");

  const isSamePassword = await compare(newPassword, user.hashedPassword);
  if (isSamePassword)
    throw new Error("New password cannot be the same as old password.");

  const newHashedPassword = await hash(newPassword, SALT_ROUNDS);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong, please try again later.");
  }
}
