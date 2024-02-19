import BlogCard from "@/components/BlogCard";
import HomePageTabs from "@/components/HomePageTabs";
import Loading from "@/components/Loading";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { FullBlog } from "@/types/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  if (!currentUser) return null;

  const foundUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      followingIDs: true,
      followingTopics: true,
    },
  });

  if (!foundUser) return null;

  let blogs: FullBlog[] = [];

  if (!searchParams?.feed || !searchParams?.topic)
    blogs = await prisma.blogPost.findMany({
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        status: PostStatus.PUBLISHED,
      },
      take: 10,
    });

  if (searchParams?.feed === "following")
    blogs = await prisma.blogPost.findMany({
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
      take: 10,
    });

  if (searchParams?.topic)
    blogs = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        topic: {
          slug: searchParams.topic as string,
        },
      },
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

  return (
    <section className="py-10">
      <HomePageTabs topics={foundUser.followingTopics} />
      {!!blogs.length ? (
        blogs.map((blog) => (
          <BlogCard userId={currentUser.id} key={blog.id} blog={blog} />
        ))
      ) : (
        <div className="text-center text-lg font-light py-10">
          No blogs found
        </div>
      )}
      <Loading />
    </section>
  );
}
