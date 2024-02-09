import BlogRenderer from "@/components/BlogRenderer";
import prisma from "@/prisma";
import { notFound } from "next/navigation";

export default async function Blog(params: {
  params: { username: string; blogSlug: string };
}) {
  const blog = await prisma.blogPost.findUnique({
    where: {
      slug: params.params.blogSlug,
      author: {
        username: params.params.username,
      },
    },
    include: {
      author: true,
      topic: true,
    },
  });

  if (!blog) return notFound();

  return (
    <div>
      <BlogRenderer blog={blog} />
      <div className="min-h-[600px]"></div>

      {/* TODO: Add recommentdations here! */}
    </div>
  );
}
