import { Prisma } from "@prisma/client";

const blogWithAuthor = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: { author: true },
});

export type BlogWithAuthor = Prisma.BlogPostGetPayload<typeof blogWithAuthor>;
