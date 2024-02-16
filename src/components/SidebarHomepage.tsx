import Footer from "@/components/Footer";
import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME, fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Avatar, Button, Chip, cn } from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsBookmark } from "react-icons/bs";
import FollowButton from "./sub-components/FollowButton";

export default function SidebarHomepage() {
  return (
    <aside className="border-l p-3 px-5 flex flex-col gap-5 h-min -top-[calc(100%-100px)] sticky w-1/3 ">
      <TopPicks />
      <StartWriting />
      <RecommendedTopics />
      <WhoToFollow />
      <ReadingList />
      <Footer />
    </aside>
  );
}

const TopPicks = async () => {
  const blogs = await prisma.blogPost.findMany({
    orderBy: {
      likedByUsers: {
        _count: "desc",
      },
    },
    include: {
      author: true,
      topic: true,
    },
    where: {
      status: PostStatus.PUBLISHED,
    },
    take: 3,
  });
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Top picks</h3>
      {blogs.map((blog, i) => (
        <div className={cn("py-3 border-b", i === 2 && " border-b-0")}>
          <div className="flex items-center gap-2 ">
            <Avatar
              size="sm"
              src={blog.author.image || fallbackImageUrl}
              alt={blog.author.name || "Author"}
              classNames={{
                base: "flex-shrink-0 w-6 h-6",
              }}
            />
            <Link
              href={`/${blog.author.username}`}
              className="flex gap-2 items-center font-normal"
            >
              <p className="text-xs ">
                {blog.author.name || "@" + blog.author.username}
              </p>
            </Link>
          </div>
          <Link
            href={`/${blog.author.username}/${blog.slug}`}
            className="text-sm font-bold"
          >
            {blog.title}
          </Link>
        </div>
      ))}

      <Link href="/" className="text-sm font-normal text-green-600">
        See all
      </Link>
    </div>
  );
};

const StartWriting = () => {
  return (
    <div className="rounded-md bg-blue-300 text-black p-5 flex flex-col gap-4">
      <h3 className="font-semibold">Writing on {COMPANY_NAME}</h3>

      <div className="flex flex-col">
        <p className="font-normal text-lg self-start font-serif ">
          Share insights.
        </p>
        <p className="font-normal text-lg self-center font-sans">
          Craft stories.
        </p>
        <p className="font-normal text-lg self-end font-mono">Ignite ideas.</p>
      </div>

      <Button
        as={Link}
        href="/new-story"
        size="sm"
        className="rounded-full bg-gray-900 text-offWhite w-min mx-auto"
      >
        Start writing
      </Button>
    </div>
  );
};

const RecommendedTopics = async () => {
  const topics = await prisma.topic.findMany({
    take: 8,
    orderBy: {
      BlogPost: {
        _count: "desc",
      },
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">Recommended topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics &&
          topics.map((topic) => (
            <Chip
              as={Link}
              href={`/topic/${topic.slug}`}
              key={topic.id}
              classNames={{ base: "px-3 py-5 bg-gray-200" }}
            >
              {topic.name}
            </Chip>
          ))}
      </div>
      <Link
        href="/topics/explore"
        className="text-sm font-normal text-green-600"
      >
        See more topics
      </Link>
    </div>
  );
};

const WhoToFollow = async () => {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user;

  if (!currentUser) return null;

  const users = await prisma.user.findMany({
    where: {
      followedBy: {
        none: {
          id: currentUser.id,
        },
      },
      id: {
        not: currentUser.id,
      },
    },
    take: 3,
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">Who to follow</h3>
      <div className="flex flex-wrap gap-2">
        {users &&
          users.map((user) => (
            <div key={user.id} className="flex gap-2 w-full ">
              <Avatar
                size="sm"
                src={user.image || fallbackImageUrl}
                alt={user.name || user.username}
                className="flex-shrink-0"
              />
              <div>
                <Link href={`/${user.username}`}>
                  <h4 className="text-sm font-semibold">
                    {user.name || "@" + user.username}
                  </h4>
                </Link>
                {user.bio && (
                  <p className="text-xs ">
                    {user.bio.substring(0, 50) +
                      (user.bio.length > 50 ? " ..." : "")}
                  </p>
                )}
              </div>

              <FollowButton
                followerId={currentUser.id}
                followingId={user.id}
                variant="bordered"
                size="sm"
                radius="full"
                className="flex-shrink-0 border-dark-200 text-dark-200 ms-auto"
              />
            </div>
          ))}
      </div>
      <Link href="#" className="text-sm font-normal text-green-600">
        See more suggestions
      </Link>
    </div>
  );
};

const ReadingList = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold ">Reading list</h3>
      <span className="text-sm ">
        Click on
        <BsBookmark className=" inline mx-1" />
        on any story to easily add it to your reading list or custom list to
        read later or share.
      </span>
    </div>
  );
};
