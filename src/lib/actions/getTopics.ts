"use server";

import prisma from "@/prisma";

export default async function getTopics() {
  try {
    return await prisma.topic.findMany();
  } catch (e) {
    throw e;
  }
}
