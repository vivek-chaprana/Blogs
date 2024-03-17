"use client";
import AllCaughtUp from "@/components/AllCaughtUp";
import BlogCard from "@/components/BlogCard";
import { InfiniteScrollData, fetchBlogs } from "@/lib/actions/pagination";
import useInfiniteScroll from "@/lib/hooks/useInfiniteScroll";
import { FullBlog } from "@/types/prisma";
import { Spinner } from "@nextui-org/react";
import { Prisma } from "@prisma/client";

export default function HomepageBlogs({
  userId,
  initialData,
  condition,
}: {
  initialData: InfiniteScrollData<FullBlog>;
  userId: string;
  condition: Prisma.BlogPostWhereInput;
}) {
  const {
    data: blogs,
    ref,
    hasNextPage,
  } = useInfiniteScroll({
    initialData,
    condition,
    fetchFn: fetchBlogs,
  });

  return (
    <>
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} userId={userId} blog={blog} />
        ))}
      </div>

      {hasNextPage ? (
        <div ref={ref} className="flex items-center justify-center py-10">
          <Spinner color="default" />
        </div>
      ) : (
        <AllCaughtUp />
      )}
    </>
  );
}
