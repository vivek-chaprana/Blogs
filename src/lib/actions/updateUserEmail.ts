"use server";

import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";
import { sendVerificationEmail } from "../email";

export default async function updateUserEmail({ email }: { email: string }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized!");

  if (!email) throw new Error("Email is required");

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        emailVerified: null,
        isVerified: false,
      },
    });

    await sendVerificationEmail({ email });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
