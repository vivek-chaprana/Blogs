import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import prisma from "@/prisma";

export default async function Home() {
  const blogs = await prisma.blogPost.findMany({
    include: {
      author: true,
      topic: true,
    },
  });

  let newBlogs = new Array(10).fill(blogs[0]);

  return (
    <section className="py-10">
      {!!blogs.length &&
        newBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      <Loading />
    </section>
  );
}
