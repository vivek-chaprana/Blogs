import prisma from "@/prisma";
import { customAlphabet } from "nanoid";

const generateRandomSlug = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8
);

async function isSlugUnique(slug: string) {
  const existingDocument = await prisma.blogPost.findUnique({
    where: { slug },
  });

  return !existingDocument;
}

export default async function generateUniqueSlug() {
  let slug = generateRandomSlug();

  while (!(await isSlugUnique(slug))) {
    slug = generateRandomSlug();
  }

  return slug;
}
