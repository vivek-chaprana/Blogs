import Await from "@/components/Await";
import BlogCard from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/skeleton";
import BlogSortOptions from "@/components/sub-components/BlogSortOptions";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  const isOwner = params.username === user?.username;

  const searchParamsStatus = Array.isArray(searchParams.status)
    ? searchParams.status[0]
    : searchParams.status;

  const promise = prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      blogPost: {
        where: {
          status: !isOwner
            ? PostStatus.PUBLISHED
            : (searchParamsStatus?.toUpperCase() as PostStatus) ?? undefined,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          topic: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex justify-end gap-5">
        <BlogSortOptions isOwner={isOwner} />
      </div>
      <Suspense
        fallback={new Array(3).fill(0).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      >
        <Await promise={promise}>
          {(user) =>
            !!user?.blogPost?.length ? (
              <>
                {user?.blogPost.map((blog) => (
                  <BlogCard userId={user?.id} key={blog.id} blog={blog} />
                ))}
              </>
            ) : (
              <div className="text-center py-5 ">No blogs yet!</div>
            )
          }
        </Await>
      </Suspense>
    </>
  );
}
