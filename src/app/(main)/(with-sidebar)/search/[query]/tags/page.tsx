import BlogCard from "@/components/BlogCard";
import { authOptions } from "@/lib/auth/auth-options";
import generateCaseVariations from "@/lib/utils/generateCaseVariations";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function PostsSearch({
  params,
}: {
  params: { query: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const blogs = await prisma.blogPost.findMany({
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

  if (!blogs.length)
    return <div className="text-center text-xl my-10 ">No posts found</div>;

  return (
    <div className="py-5">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} userId={user?.id} />
      ))}
    </div>
  );
}
