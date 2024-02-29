import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { StartWriting } from "@/components/SidebarHomepage";
import { TypewriterEffectSmooth } from "@/components/TypewriterEffect ";
import { WavyBackground } from "@/components/WavyBackground";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import prisma from "@/prisma";

import { Button, Chip } from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import Link from "next/link";
import { MdOutlineTrendingUp } from "react-icons/md";

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

export default async function Landing() {
  const blogs = await prisma.blogPost.findMany({
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

  const topics = await prisma.topic.findMany({
    take: 9,
    orderBy: {
      BlogPost: {
        _count: "desc",
      },
    },
  });

  if (!topics.length) return null;

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
                textClassnames=" text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-dark-200 font-bold font-serif"
                cursorClassName="bg-black border h-10"
              />
            </h1>
            <p className="text-base md:text-lg mt-4 text-dark-200 font-semibold inter-var text-center">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <Button
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
            <InfiniteMovingCards items={blogs} direction="right" speed="slow" />
          </div>
        </div>
      </section>

      <section className="flex max-w-6xl mx-auto gap-10 relative px-2 sm:px-4 lg:px-2">
        <div className="flex-1">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <Loading />
        </div>

        <aside className="w-1/3 border-s px-5 py-10 sticky hidden md:block ">
          {/* Topics */}
          <div className="flex flex-col gap-4 mb-10">
            <h3 className="font-semibold">
              Discover more of what matters to you
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics &&
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
