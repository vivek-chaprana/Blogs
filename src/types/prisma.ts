import { Prisma } from "@prisma/client";

const fullBlog = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: { author: true, topic: true },
});

export type FullBlog = Prisma.BlogPostGetPayload<typeof fullBlog>;

const fullBlogWithComments = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: {
    author: true,
    topic: true,
    comments: {
      include: {
        _count: true,
      },
    },
  },
});

export type FullBlogWithComments = Prisma.BlogPostGetPayload<
  typeof fullBlogWithComments
>;

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

const fullComment = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: {
    author: true,
    replies: true,
    blogPost: {
      select: {
        authorId: true,
      },
    },
  },
});

export type FullComment = Prisma.CommentGetPayload<typeof fullComment>;
