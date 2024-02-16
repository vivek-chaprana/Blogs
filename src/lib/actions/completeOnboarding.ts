"use server";

import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function completeOnboarding(params: {
  name?: string;
  bio?: string;
  profileImage?: any;
  topics: string[];
}) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const { name, bio, profileImage } = params ?? {};

  if (!email) throw new Error("User not found");

  try {
    await prisma.user.update({
      where: { email },
      data: {
        name,
        bio,
        image: profileImage,
        hasCompletedOnboarding: true,
        followingTopics: {
          connect: [...params.topics.map((topic) => ({ id: topic }))],
        },
      },
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
