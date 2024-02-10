import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  if (!currentUser) return null;

  const foundUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      followingIDs: true,
    },
  });

  if (!foundUser) return null;

  const blogs = await prisma.blogPost.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      authorId: {
        in: foundUser.followingIDs,
      },
    },
    include: {
      author: true,
      topic: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-10">
      {!!blogs.length &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      <Loading />
    </section>
  );
}
