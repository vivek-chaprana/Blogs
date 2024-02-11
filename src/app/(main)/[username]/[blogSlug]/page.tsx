import BlogRenderer from "@/components/BlogRenderer";
import { fallbackCoverImageUrl, fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import prisma from "@/prisma";
import { Button, Divider, Image } from "@nextui-org/react";
import { PostStatus, User } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsDot } from "react-icons/bs";

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
      likedByUsers: true,
    },
  });

  if (!blog) return notFound();

  return (
    <div>
      <BlogRenderer blog={blog} />
      <div className="min-h-[600px] bg-offWhite my-10">
        <div className="max-w-3xl mx-auto">
          <section className="flex items-center justify-between py-5">
            <div className="flex flex-col gap-4">
              <Image
                width={100}
                height={100}
                src={blog.author.image || fallbackImageUrl}
                alt={blog.author.name || blog.author.username}
                radius="full"
              />
              <h3 className="text-2xl font-semibold">
                Written by&nbsp;
                <Link href={`/${blog.author.username}`}>
                  {blog.author.name}
                </Link>
              </h3>
              <Link href={`/${blog.author.username}/followers`}>
                {blog.author.followedByIDs.length} followers
              </Link>
            </div>

            <Button className="bg-dark-200 text-offWhite">Follow</Button>
          </section>

          <Divider className="my-5" />

          <MoreFromUser user={blog.author} blogId={blog.id} />
        </div>
      </div>

      {/* TODO: Add recommentdations here! */}
    </div>
  );
}

async function MoreFromUser({ user, blogId }: { user: User; blogId: string }) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      blogPost: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
        where: {
          status: PostStatus.PUBLISHED,
          id: {
            not: blogId,
          },
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div>
      <h2 className="font-semibold">More from {user.name || user.username}</h2>

      {foundUser?.blogPost.map((blog) => (
        <div key={blog.id} className="border p-4 w-[45%]">
          <Image
            src={blog.coverImage || fallbackCoverImageUrl}
            alt={blog.title}
            radius="none"
          />
          <Link
            className="font-semibold text-lg"
            href={`/${user.username}/${blog.slug}`}
          >
            {blog.title}
          </Link>

          <div className="flex gap-2 text-sm items-center">
            <p>{blog.readingTime} min read</p>
            <BsDot />
            <p>{getFormattedDate(blog.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
