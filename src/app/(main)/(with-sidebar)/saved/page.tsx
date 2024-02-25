import ManageSaved from "@/components/ManageSaved";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function List({
  searchParams,
}: {
  searchParams: { manage: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Unauthorized</div>;

  const { savedBlogPosts } =
    (await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        savedBlogPosts: {
          include: {
            author: true,
            topic: true,
          },
        },
      },
    })) ?? {};

  return (
    <div className="py-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl xs:text-3xl sm:text-4xl font-bold">
          Your library
        </h1>
        {!searchParams?.manage && !!savedBlogPosts?.length && (
          <Link href={{ pathname: "/saved", query: { manage: "true" } }}>
            <Button radius="full" variant="light" color="warning">
              Manage
            </Button>
          </Link>
        )}
      </div>

      {!!savedBlogPosts?.length ? (
        <ManageSaved blogs={savedBlogPosts} userId={session.user.id} />
      ) : (
        <div className="py-10 px-2">No saved blogs yet :{"("}</div>
      )}
    </div>
  );
}
