"use server";
import prisma from "@/prisma";

export default async function getSubscription({ userId }: { userId: string }) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  return subscription;
}
