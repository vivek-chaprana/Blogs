"use client";
import AllCaughtUp from "@/components/AllCaughtUp";
import BlogCard from "@/components/BlogCard";
import { InfiniteScrollData, fetchBlogs } from "@/lib/actions/pagination";
import { FullBlog } from "@/types/prisma";
import { Spinner } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

export default function HomepageBlogs({
  userId,
  initialData,
  condition,
}: {
  initialData: InfiniteScrollData<FullBlog>;
  userId: string;
  condition: Prisma.BlogPostWhereInput;
}) {
  const [blogs, setBlogs] = useState<FullBlog[]>(initialData.data);
  const [metadata, setMetadata] = useState(initialData.metadata);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) loadMoreBlogs();
  }, [inView]);

  async function loadMoreBlogs() {
    try {
      const newBlogs = await fetchBlogs({
        take: 3,
        lastCursor: metadata.lastCursor,
        where: condition,
      });

      !!newBlogs.data.length && setBlogs((prev) => [...prev, ...newBlogs.data]);
      setMetadata(newBlogs.metadata);
    } catch (error) {
      toast.error("Failed to load more blogs");
    }
  }

  return (
    <>
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} userId={userId} blog={blog} />
        ))}
      </div>

      {metadata.hasNextPage ? (
        <div ref={ref} className="flex items-center justify-center py-10">
          <Spinner color="default" />
        </div>
      ) : (
        <AllCaughtUp />
      )}
    </>
  );
}
