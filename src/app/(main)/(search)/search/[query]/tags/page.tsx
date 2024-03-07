import Await from "@/components/Await";
import BlogCard from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/skeleton";
import { authOptions } from "@/lib/auth/auth-options";
import generateCaseVariations from "@/lib/utils/generateCaseVariations";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function PostsSearch({
  params,
}: {
  params: { query: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const promise = prisma.blogPost.findMany({
    where: {
      tags: {
        hasSome: generateCaseVariations(params.query),
      },
      status: PostStatus.PUBLISHED,
    },
    include: {
      topic: true,
      author: true,
    },
  });

  return (
    <div className="py-5">
      <Suspense
        fallback={new Array(5).fill(0).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      >
        <Await promise={promise}>
          {(blogs) => (
            <>
              {!!blogs.length ? (
                blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} userId={user?.id} />
                ))
              ) : (
                <div className="text-center text-xl my-5 ">No posts found</div>
              )}
            </>
          )}
        </Await>
      </Suspense>

      {}
    </div>
  );
}
