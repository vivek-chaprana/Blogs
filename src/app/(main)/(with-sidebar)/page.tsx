import BlogCard from "@/components/BlogCard";
import HomePageTabs from "@/components/HomePageTabs";
import Loading from "@/components/Loading";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { FullBlog } from "@/types/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  if (!currentUser) redirect("/auth/login");

  const foundUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      followingIDs: true,
      followingTopics: true,
    },
  });

  if (!foundUser) return notFound();

  let blogs: FullBlog[] = [];

  if (!searchParams?.feed || !searchParams?.topic)
    blogs = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        authorId: {
          not: currentUser.id,
        },
      },
      take: 10,
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  if (searchParams?.feed === "following")
    blogs = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        authorId: {
          in: foundUser.followingIDs,
        },
      },
      take: 10,
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  if (searchParams?.topic)
    blogs = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        topic: {
          slug: searchParams.topic as string,
        },
      },
      take: 10,
      include: {
        author: true,
        topic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <section className="">
      <HomePageTabs topics={foundUser.followingTopics} />
      {!!blogs.length ? (
        blogs.map((blog) => (
          <BlogCard userId={currentUser.id} key={blog.id} blog={blog} />
        ))
      ) : (
        <div className="text-center text-lg py-10">No blogs yet!</div>
      )}
      <Loading />
    </section>
  );
}
