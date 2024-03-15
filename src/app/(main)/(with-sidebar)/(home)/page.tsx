import HomepageBlogs from "@/components/HomepageBlogs";
import { fetchBlogs } from "@/lib/actions/pagination";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus, Prisma } from "@prisma/client";
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

  let condition: Prisma.BlogPostWhereInput = {
    status: PostStatus.PUBLISHED,
  };

  if (!searchParams?.feed || !searchParams?.topic)
    condition = {
      status: PostStatus.PUBLISHED,
      authorId: {
        not: currentUser.id,
      },
    };

  if (searchParams?.feed === "following")
    condition = {
      status: PostStatus.PUBLISHED,
      authorId: {
        in: foundUser.followingIDs,
      },
    };

  if (searchParams?.topic)
    condition = {
      status: PostStatus.PUBLISHED,
      topic: {
        slug: searchParams.topic as string,
      },
    };

  const fetchedData = await fetchBlogs({
    take: 3,
    where: condition,
    lastCursor: null,
  });

  return !!fetchedData.data.length ? (
    // The key prop is used to force a re-render of the component, which is necessary. Can use router.refresh() or revalidate to achieve the same effect. Search Params doesn't cause re-render, so the key prop is necessary. Might have a better solution.
    <div key={Math.random()}>
      <HomepageBlogs
        condition={condition}
        initialData={fetchedData}
        userId={currentUser.id}
      />
    </div>
  ) : (
    <div className="text-center text-lg py-10">No blogs yet!</div>
  );
}
