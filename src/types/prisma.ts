import { Prisma } from "@prisma/client";

const fullBlog = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: { author: true, topic: true },
});

export type FullBlog = Prisma.BlogPostGetPayload<typeof fullBlog>;

const userWithSavedIds = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    savedBlogPosts: {
      select: {
        id: true,
      },
    },
  },
});

export type UserWithSavedIds = Prisma.UserGetPayload<typeof userWithSavedIds>;
