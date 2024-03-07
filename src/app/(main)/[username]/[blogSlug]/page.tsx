import Await from "@/components/Await";
import BlogRenderer from "@/components/BlogRenderer";
import SquareBlogCard from "@/components/SquareBlogCard";
import { SquareBlogCardSkeleton } from "@/components/skeleton";
import { authOptions } from "@/lib/auth/auth-options";
import {
  WEBAPP_URL,
  fallbackImageUrl,
  fallbackMetadata,
} from "@/lib/constants";
import prisma from "@/prisma";
import { FullBlog } from "@/types/prisma";
import { Divider, Image } from "@nextui-org/react";
import { PostStatus, User } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
const SignUpBanner = dynamic(() => import("@/components/SignUpBanner"));
const FollowButton = dynamic(
  () => import("@/components/sub-components/FollowButton")
);
const UnfollowButton = dynamic(
  () => import("@/components/sub-components/UnfollowButton")
);

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
    title: blog.title,
    description: blog.description || "No description available.",
    authors: [
      {
        name: blog.author.name || "@" + blog.author.username,
        url: `${WEBAPP_URL}/${blog.author.username}`,
      },
    ],
  };
}

export default async function Blog(params: {
  params: { username: string; blogSlug: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

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

  if (blog?.authorId !== userId && blog?.status !== PostStatus.PUBLISHED)
    return notFound();

  return (
    <div>
      <BlogRenderer blog={blog} />

      {!userId && <SignUpBanner />}

      {/* Recommendations */}
      <div className="min-h-[600px] p-2 md:p-0 bg-offWhite my-10">
        <div className="max-w-3xl mx-auto">
          <section className="flex  items-center justify-between py-5">
            <div className="flex flex-col gap-4">
              <Image
                width={100}
                height={100}
                src={blog.author.image || fallbackImageUrl}
                alt={blog.author.name || blog.author.username}
                radius="full"
              />
              <h3 className="text-lg sm:text-2xl font-semibold">
                Written by&nbsp;
                <Link href={`/${blog.author.username}`}>
                  {blog.author.name}
                </Link>
              </h3>
              <Link
                className="text-sm sm:text-base"
                href={`/${blog.author.username}/followers`}
              >
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
    </div>
  );
}

function MoreFromUser({
  user,
  blogId,
  userId,
}: {
  user: User;
  blogId: string;
  userId?: string;
}) {
  const promise = prisma.user.findUnique({
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
    <Suspense
      fallback={
        <FallbackUI title={`More from ${user.name || "@" + user.username}`} />
      }
    >
      <Await promise={promise}>
        {(foundUser) => (
          <>
            {!!foundUser?.blogPost.length && (
              <>
                <Divider className="my-10" />
                <div>
                  <h2 className="font-semibold mb-3 sm:mb-0">
                    More from {user.name || "@" + user.username}
                  </h2>

                  <div className="grid grid-cols-2 gap-5 ">
                    {foundUser?.blogPost.map((blog) => (
                      <SquareBlogCard
                        key={blog.id}
                        blog={blog}
                        userId={userId}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

function MoreFromTopic({ blog, userId }: { blog: FullBlog; userId?: string }) {
  const promise = prisma.blogPost.findMany({
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
    <Suspense
      fallback={<FallbackUI title={`More from topic ${blog.topic.name}`} />}
    >
      <Await promise={promise}>
        {(moreBlogs) => (
          <>
            {!!moreBlogs.length && (
              <>
                <Divider className="my-10" />
                <div>
                  <h2 className="font-semibold mb-3 sm:mb-0 lowercase first-letter:uppercase ">
                    More from topic {blog.topic.name}
                  </h2>

                  <div className="grid grid-cols-2 gap-5">
                    {moreBlogs.map((blog) => (
                      <SquareBlogCard
                        key={blog.id}
                        blog={blog}
                        userId={userId}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

function Recommended({ userId }: { userId?: string }) {
  const promise = prisma.blogPost.findMany({
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
    <Suspense fallback={<FallbackUI title={`Recommended from us `} />}>
      <Await promise={promise}>
        {(recommended) => (
          <>
            {!!recommended.length && (
              <>
                <Divider className="my-10" />
                <div>
                  <h2 className="font-semibold mb-3 sm:mb-0 lowercase first-letter:uppercase ">
                    Recommended from us{" "}
                  </h2>

                  <div className="grid grid-cols-2 gap-5">
                    {recommended.map((blog) => (
                      <SquareBlogCard
                        key={blog.id}
                        blog={blog}
                        userId={userId}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

const FallbackUI = ({ title }: { title: string }) => {
  return (
    <>
      <Divider className="my-10" />
      <div>
        <h2 className="font-semibold mb-3 sm:mb-0 first-letter:uppercase ">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {new Array(2).fill(0).map((_, i) => (
            <SquareBlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
};
