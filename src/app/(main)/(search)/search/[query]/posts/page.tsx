import Await from "@/components/Await";
import BlogCard from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/skeleton";
import { authOptions } from "@/lib/auth/auth-options";
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
      title: {
        contains: params.query,
        mode: "insensitive",
      },
      status: PostStatus.PUBLISHED,
    },
    take: 10,
    include: {
      author: true,
      topic: true,
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
