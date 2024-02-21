import prisma from "@/prisma";
import { Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { BsDot, BsSearch } from "react-icons/bs";

export default async function ExploreTopics() {
  const topics = await prisma.topic.findMany({
    include: {
      BlogPost: {
        include: {
          _count: true,
        },
      },
      users: {
        include: {
          _count: true,
        },
      },
    },
  });

  const topTopics = topics
    .sort((a, b) => b.users.length - a.users.length)
    .slice(0, 5);

  return (
    <section className="flex flex-col items-center gap-5 py-10">
      <h1 className="text-4xl font-sans font-semibold text-center">
        Explore Topics
      </h1>
      <Input
        className="w-3/6"
        placeholder="Search all topics"
        startContent={<BsSearch />}
        radius="full"
      />
      <p className="text-sm text-center">
        Recommended :{" "}
        {topTopics.map((topic, index) => (
          <Link
            href={`/topic/${topic.slug}`}
            key={topic.id}
            className="hover:underline"
          >
            {index === topTopics.length - 1 ? topic.name : topic.name + ", "}
          </Link>
        ))}
      </p>
      <Divider className="my-10" />

      {/* Content */}

      <div className="grid grid-cols-2 gap-10">
        {!!topics?.length &&
          topics.map((topic) => (
            <div key={topic.id} className="flex flex-col gap-1 ">
              <Link
                href={"/topic/" + topic.slug}
                className="text-lg font-semibold text-gray-700 "
              >
                {topic.name}
              </Link>
              <p className="text-sm ps-3">{topic.description}</p>

              <div className="flex items-center ps-3 text-sm capitalize">
                <span className="text-green-700 font-semibold">
                  {topic.users.length}{" "}
                  {topic.users.length > 1 ? "followers" : "follower"}
                </span>
                <BsDot />
                <span className="text-green-700 font-semibold">
                  {topic.BlogPost.length}{" "}
                  {topic.BlogPost.length > 1 ? "posts" : "post"}
                </span>
              </div>
            </div>
          ))}
      </div>

      <Divider className="my-10" />
      <div className="bg-gray-100 text-sm w-full py-5 text-center">
        See a topic you think should be added or removed here?{" "}
        <Link
          className="underline hover:underline-offset-2 transition-all ms-1"
          href="#"
        >
          Suggest an edit.
        </Link>
      </div>
    </section>
  );
}
