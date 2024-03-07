import Loading from "@/components/Loading";
import NewStoryForm from "@/components/NewStoryForm";
import { authOptions } from "@/lib/auth/auth-options";
import { WEBAPP_URL, fallbackMetadata } from "@/lib/constants";
import prisma from "@/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(params: {
  params: { username: string; blogSlug: string };
}): Promise<Metadata> {
  const blog = await prisma.blogPost.findUnique({
    where: {
      slug: params.params.blogSlug,
      author: {
        username: params.params.username,
      },
    },
    select: {
      title: true,
      description: true,
      author: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });

  if (!blog) return fallbackMetadata;

  return {
    title: "Edit  |" + blog.title,
    description: blog.description || "No description available.",
    authors: [
      {
        name: blog.author.name || "@" + blog.author.username,
        url: `${WEBAPP_URL}/${blog.author.username}`,
      },
    ],
  };
}

export default async function EditBlogPage(params: {
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
      likedByUsers: true,
    },
  });

  if (!blog) return notFound();

  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) redirect("/auth/login");

  if (user.id !== blog.author.id) return notFound();

  return (
    <main className="min-h-screen bg-white ">
      <Suspense fallback={<Loading />}>
        <NewStoryForm user={user} blog={blog} />
      </Suspense>
    </main>
  );
}
