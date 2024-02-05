"use server";

import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth-options";

type UpdateUserInfoProps = {
  username?: string;
  password?: string;
  profileImage?: string | null;
  coverImage?: string | null;
  name?: string;
  bio?: string;
};

export default async function updateUserInfo(props: UpdateUserInfoProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized!");

  const { username, profileImage, coverImage, name, bio } = props ?? {};

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        name,
        bio,
        image: profileImage,
        coverImage,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong!");
  }
}
