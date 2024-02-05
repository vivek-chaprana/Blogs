"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";
import prisma from "@/prisma";

export default async function deleteUserAccount() {
  const session = await getServerSession(authOptions);
  const usedId = session?.user?.id;

  if (!usedId) throw new Error("Unauthorized access");

  const user = await prisma.user.findUnique({
    where: { id: usedId },
  });

  if (!user) throw new Error("User not found");

  try {
    await prisma.user.delete({
      where: { id: usedId },
    });
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}
