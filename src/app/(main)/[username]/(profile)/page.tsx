import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import prisma from "@/prisma";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const blogs = await prisma.blogPost.findMany({
    include: {
      author: true,
    },
  });

  const newBlogs = new Array(10).fill(blogs[0]);

  return (
    <>
      {newBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}

      <Loading />
    </>
  );
}
