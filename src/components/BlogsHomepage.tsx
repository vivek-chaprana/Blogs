import BlogCard from "@/components/BlogCard";
import prisma from "@/prisma";
import { Spinner } from "@nextui-org/react";

export default async function BlogsHomepage() {
  const blogs = await prisma.blogPost.findMany({
    include: {
      author: true,
    },
  });

  let newBlogs = new Array(10).fill(blogs[0]);

  return (
    <section className="py-10">
      {!!blogs.length &&
        newBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}

      {/* Spinner */}
      <div className="flex gap-4 items-center justify-center my-5">
        <Spinner color="default" />
      </div>
    </section>
  );
}
