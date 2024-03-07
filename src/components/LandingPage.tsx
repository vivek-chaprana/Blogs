import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { StartWriting } from "@/components/SidebarHomepage";
import { TypewriterEffectSmooth } from "@/components/TypewriterEffect ";
import { WavyBackground } from "@/components/WavyBackground";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import prisma from "@/prisma";
import { Button, Chip, Skeleton } from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import { MdOutlineTrendingUp } from "react-icons/md";
import Await from "./Await";
import { BlogCardSkeleton } from "./skeleton";

const words = [
  {
    text: "Stay",
  },
  {
    text: "curious",
    className: "text-pink-600 ",
  },
  {
    text: ".",
  },
];

export default async function LandingPage() {
  const blogsPromise = prisma.blogPost.findMany({
    take: 10,
    where: {
      status: PostStatus.PUBLISHED,
    },
    orderBy: {
      likedByUsers: {
        _count: "desc",
      },
    },
    include: {
      topic: true,
      author: true,
    },
  });

  const topicsPromise = prisma.topic.findMany({
    take: 9,
    orderBy: {
      BlogPost: {
        _count: "desc",
      },
    },
  });

  return (
    <main className="">
      <section className="">
        <WavyBackground
          backgroundFill="white"
          className="max-w-4xl mx-auto pb-40"
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-8xl text-dark-200 font-bold font-serif text-center">
              <TypewriterEffectSmooth
                words={words}
                textClassnames="text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-dark-200 font-bold font-serif"
                cursorClassName="bg-black border "
              />
            </h1>
            <p className="text-base md:text-lg mt-4 text-dark-200 font-semibold inter-var text-center">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <Button
              as={Link}
              href="/register"
              className="text-white bg-dark-200 w-min my-10 "
              radius="full"
            >
              Start reading
            </Button>
          </div>
        </WavyBackground>
      </section>

      <section className="mt-10 mx-auto ">
        <h2 className="text-xl sm:text-2xl font-semibold font-serif flex items-center gap-2 max-w-4xl mx-auto ps-2 lg:ps-0">
          <div className="border border-gray-500 text-gray-500 rounded-full p-1 w-min inline-flex">
            <MdOutlineTrendingUp className="text-xl sm:text-2xl" />
          </div>
          Trending
        </h2>

        <div>
          <div className="py-10 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <Suspense
              fallback={<InfiniteMovingCards direction="right" speed="slow" />}
            >
              <Await promise={blogsPromise}>
                {(blogs) => (
                  <InfiniteMovingCards
                    items={blogs}
                    direction="right"
                    speed="slow"
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </section>

      <section className="flex max-w-6xl mx-auto gap-10 relative px-2 sm:px-4 lg:px-2">
        <div className="flex-1">
          <Suspense
            fallback={new Array(3).fill(0).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          >
            <Await promise={blogsPromise}>
              {(blogs) => (
                <>
                  {!!blogs.length &&
                    blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                </>
              )}
            </Await>
          </Suspense>
          <Loading />
        </div>

        <aside className="w-1/3 border-s px-5 py-10 sticky hidden md:block ">
          {/* Topics */}
          <div className="flex flex-col gap-4 mb-10">
            <h3 className="font-semibold">
              Discover more of what matters to you
            </h3>
            <div className="flex flex-wrap gap-2">
              <Suspense
                fallback={new Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="overflow-hidden rounded-full">
                    <Chip classNames={{ base: "px-3 py-5 bg-gray-200" }}>
                      Lorem.
                    </Chip>
                  </Skeleton>
                ))}
              >
                <Await promise={topicsPromise}>
                  {(topics) => (
                    <>
                      {!!topics.length &&
                        topics.map((topic) => (
                          <Chip
                            as={Link}
                            href={`/topics/${topic.slug}`}
                            key={topic.id}
                            classNames={{ base: "px-3 py-5 bg-gray-200" }}
                          >
                            {topic.name}
                          </Chip>
                        ))}
                    </>
                  )}
                </Await>
              </Suspense>
            </div>
            <Link href="/topics" className="text-sm font-normal text-green-600">
              See more topics
            </Link>
          </div>

          <StartWriting />

          <Footer classes="border-t py-10 [&>a]:text-sm" />
        </aside>
      </section>
    </main>
  );
}
