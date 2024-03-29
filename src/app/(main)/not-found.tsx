import Await from "@/components/Await";
import SquareBlogCard from "@/components/SquareBlogCard";
import { SquareBlogCardSkeleton } from "@/components/skeleton";
import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME } from "@/lib/constants";
import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Page Not Found | " + COMPANY_NAME,
};

export default async function NotFound() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const promise = prisma.blogPost.findMany({
    where: {
      status: PostStatus.PUBLISHED,
    },
    orderBy: {
      likedByUsers: {
        _count: "desc",
      },
    },
    take: 4,
    include: {
      topic: true,
      author: true,
    },
  });

  return (
    <>
      <main className="py-10">
        <section className="flex flex-col gap-5 text-center max-w-3xl mx-auto py-10">
          <p className="uppercase text-sm text-gray-500">page not found</p>
          <h1 className="text-9xl text-gray-500 font-serif">404</h1>
          <p className="text-3xl font-serif font-semibold">
            Out of nothing, something.
          </p>
          <p className="text-base">
            You can find (just about) anything on {COMPANY_NAME} — apparently
            even a page that doesn&apos;t exist. Maybe these stories will take
            you somewhere new?
          </p>
          <Link
            href="/"
            className="underline underline-offset-1 text-green-700 hover:text-green-800"
          >
            Home
          </Link>
        </section>

        <section className="max-w-4xl mx-auto grid grid-cols-2 py-5 gap-5 px-2 md:px-0 ">
          <Suspense
            fallback={
              <>
                {new Array(4).fill(null).map((_, i) => (
                  <SquareBlogCardSkeleton key={i} />
                ))}
              </>
            }
          >
            <Await promise={promise}>
              {(blogs) => (
                <>
                  {!!blogs.length &&
                    blogs.map((blog) => (
                      <SquareBlogCard
                        blog={blog}
                        key={blog.id}
                        userId={userId}
                      />
                    ))}
                </>
              )}
            </Await>
          </Suspense>
        </section>
      </main>
    </>
  );
}
