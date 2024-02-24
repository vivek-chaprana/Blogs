import BlogRenderer from "@/components/BlogRenderer";
import SquareBlogCard from "@/components/SquareBlogCard";
import FollowButton from "@/components/sub-components/FollowButton";
import UnfollowButton from "@/components/sub-components/UnfollowButton";
import { authOptions } from "@/lib/auth/auth-options";
import { fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { FullBlog } from "@/types/prisma";
import { Divider, Image } from "@nextui-org/react";
import { PostStatus, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      comments: {
        include: {
          _count: true,
        },
      },
    },
  });

  if (!blog) return notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  return (
    <div>
      <BlogRenderer blog={blog} />

      {/* Recommendations */}
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
            {userId &&
              (blog.author.followedByIDs.includes(userId) ? (
                <UnfollowButton
                  variant="solid"
                  color="danger"
                  followerId={userId}
                  followingId={blog.author.id}
                />
              ) : (
                <FollowButton
                  className="bg-dark-200 text-offWhite"
                  followerId={userId}
                  followingId={blog.author.id}
                />
              ))}
          </section>

          <MoreFromUser user={blog.author} blogId={blog.id} userId={userId} />

          <MoreFromTopic blog={blog} userId={userId} />

          <Recommended userId={userId} />
        </div>
      </div>

      {/* TODO: Add recommentdations here! */}
    </div>
  );
}

async function MoreFromUser({
  user,
  blogId,
  userId,
}: {
  user: User;
  blogId: string;
  userId?: string;
}) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
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
        include: {
          topic: true,
          author: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    !!foundUser?.blogPost.length && (
      <>
        <Divider className="my-10" />
        <div>
          <h2 className="font-semibold">
            More from {user.name || "@" + user.username}
          </h2>

          <div className="grid grid-cols-2 gap-5 ">
            {foundUser?.blogPost.map((blog) => (
              <SquareBlogCard key={blog.id} blog={blog} userId={userId} />
            ))}
          </div>
        </div>
      </>
    )
  );
}

async function MoreFromTopic({
  blog,
  userId,
}: {
  blog: FullBlog;
  userId?: string;
}) {
  const moreBlogs = await prisma.blogPost.findMany({
    where: {
      topic: {
        id: blog.topic.id,
      },
      status: PostStatus.PUBLISHED,
      id: {
        not: blog.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    include: {
      author: true,
      topic: true,
    },
  });

  return (
    !!moreBlogs.length && (
      <>
        <Divider className="my-10" />
        <div>
          <h2 className="font-semibold lowercase first-letter:uppercase ">
            More from topic {blog.topic.name}
          </h2>

          <div className="grid grid-cols-2 gap-5">
            {moreBlogs.map((blog) => (
              <SquareBlogCard key={blog.id} blog={blog} userId={userId} />
            ))}
          </div>
        </div>
      </>
    )
  );
}

async function Recommended({ userId }: { userId?: string }) {
  const recommended = await prisma.blogPost.findMany({
    where: {
      status: PostStatus.PUBLISHED,
    },
    orderBy: {
      likedByUsers: {
        _count: "desc",
      },
    },
    take: 6,
    include: {
      author: true,
      topic: true,
    },
  });
  return (
    !!recommended.length && (
      <>
        <Divider className="my-10" />
        <div>
          <h2 className="font-semibold lowercase first-letter:uppercase ">
            Recommended from us{" "}
          </h2>

          <div className="grid grid-cols-2 gap-5">
            {recommended.map((blog) => (
              <SquareBlogCard key={blog.id} blog={blog} userId={userId} />
            ))}
          </div>
        </div>
      </>
    )
  );
}
