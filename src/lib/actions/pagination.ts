"use server";
import prisma from "@/prisma";
import { FullBlog } from "@/types/prisma";
import { Prisma } from "@prisma/client";

export interface InfiniteScrollData<T> {
  data: T[];
  metadata: {
    lastCursor: string | null;
    hasNextPage: boolean;
  };
}

export async function fetchBlogs({
  take,
  lastCursor,
  where,
}: {
  take: number;
  lastCursor: string | null;
  where?: Prisma.BlogPostWhereInput;
}): Promise<InfiniteScrollData<FullBlog>> {
  try {
    let result = await prisma.blogPost.findMany({
      where,
      take: take || 10,
      ...(lastCursor && {
        skip: 1, // Skip cursor itself
        cursor: {
          id: lastCursor,
        },
      }),
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (result.length === 0)
      return {
        data: [],
        metadata: {
          lastCursor: null,
          hasNextPage: false,
        },
      };

    const lastBlogPostInResults = result[result.length - 1];
    const cursor = lastBlogPostInResults.id;

    const nextPage = await prisma.blogPost.findMany({
      where,
      take: take,
      cursor: {
        id: cursor,
      },
      skip: 1,
      select: {
        _count: true,
      },
    });

    return {
      data: result,
      metadata: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };
  } catch (err) {
    throw err;
  }
}
