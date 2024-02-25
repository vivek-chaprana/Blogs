import BlogCard from "@/components/BlogCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function PostsSearch({
  params,
}: {
  params: { query: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const blogs = await prisma.blogPost.findMany({
    where: {
      title: {
        contains: params.query,
        mode: "insensitive",
      },
    },
    take: 10,
    include: {
      author: true,
      topic: true,
    },
  });

  if (!blogs.length)
    return <div className="text-center text-xl my-10">No posts found</div>;

  return (
    <div className="py-5">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} userId={user?.id} />
      ))}
    </div>
  );
}
