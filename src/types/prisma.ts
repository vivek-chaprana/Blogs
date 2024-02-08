import { Prisma } from "@prisma/client";

const fullBlog = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: { author: true, topic: true },
});

export type FullBlog = Prisma.BlogPostGetPayload<typeof fullBlog>;
