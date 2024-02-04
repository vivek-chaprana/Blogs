import ManageSaved from "@/components/ManageSaved";
import prisma from "@/prisma";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function List({
  searchParams,
}: {
  searchParams: { manage: string };
}) {
  const blogs = await prisma.blogPost.findMany({
    include: {
      author: true,
    },
  });

  const newArray = new Array(5).fill(blogs[0]);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl font-bold">Your library</h1>
        {!searchParams?.manage && (
          <Link href={{ pathname: "/saved", query: { manage: "true" } }}>
            <Button radius="full" variant="light" color="warning">
              Manage
            </Button>
          </Link>
        )}
      </div>

      <ManageSaved blogs={newArray} />
    </div>
  );
}
