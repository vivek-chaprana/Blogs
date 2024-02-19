import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import BlogSortOptions from "@/components/sub-components/BlogSortOptions";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

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

  const { blogPost: userBlogs } =
    (await prisma.user.findUnique({
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
    })) ?? {};

  return (
    <>
      <div className="flex justify-end gap-5">
        <BlogSortOptions isOwner={isOwner} />
      </div>
      {!!userBlogs?.length ? (
        <>
          {userBlogs.map((blog) => (
            <BlogCard userId={user?.id} key={blog.id} blog={blog} />
          ))}
          <Loading />
        </>
      ) : (
        <p>No blogs yet!</p>
      )}
    </>
  );
}
