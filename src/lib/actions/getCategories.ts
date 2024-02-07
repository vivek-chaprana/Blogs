"use server";
import prisma from "@/prisma";

export default async function getTopics() {
  const categories = await prisma.topic.findMany();
  return categories;
}
