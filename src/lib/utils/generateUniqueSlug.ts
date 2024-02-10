import prisma from "@/prisma";
import { customAlphabet } from "nanoid";
import slugify from "slugify";

const generateRandomSlug = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8
);

async function isSlugUnique(slug: string, userId: string) {
  const existingDocument = await prisma.blogPost.findFirst({
    where: {
      slug,
      authorId: userId,
    },
  });

  return !existingDocument;
}

export default async function generateUniqueSlug(
  title: string,
  userId: string
) {
  let slug = slugify(title, { lower: true, strict: true });

  while (!(await isSlugUnique(slug, userId))) {
    slug = `${slug}-${generateRandomSlug()}`;
  }

  return slug;
}
