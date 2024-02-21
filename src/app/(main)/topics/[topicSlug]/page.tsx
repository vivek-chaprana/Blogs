import BlogCard from "@/components/BlogCard";
import SquareBlogCard from "@/components/SquareBlogCard";
import FollowTopicButton from "@/components/sub-components/FollowTopicButton";
import UnfollowTopicButton from "@/components/sub-components/UnfollowTopicButton";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { PostStatus, Topic } from "@prisma/client";
import { getServerSession } from "next-auth";
import { BsDot } from "react-icons/bs";

export default async function Topic({
  params,
}: {
  params: { topicSlug: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const topic = await prisma.topic.findUnique({
    where: { slug: params.topicSlug },
    include: {
      users: {
        include: {
          _count: true,
        },
      },
      BlogPost: {
        include: {
          _count: true,
        },
      },
    },
  });

  if (!topic) {
    return (
      <div>
        <h1 className="text-4xl font-sans font-semibold text-center">
          Topic not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <section className="py-10 flex flex-col items-center text-center gap-5">
        <h1 className="text-4xl font-sans font-bold ">{topic?.name}</h1>

        <p className="text-sm max-w-2xl">{topic.description}</p>

        <div className="flex items-center font-semibold text-gray-600 text-sm">
          <span>Topic</span>
          <BsDot />
          <span>
            {topic.users.length}{" "}
            {topic.users.length === 1 ? "Follower" : "Followers"}
          </span>
          <BsDot />
          <span>
            {topic.BlogPost.length}{" "}
            {topic.BlogPost.length === 1 ? "Story" : "Stories"}
          </span>
        </div>

        {user &&
          (topic.userIDs.includes(user.id) ? (
            <UnfollowTopicButton
              userId={user.id}
              topicId={topic.id}
              radius="full"
            />
          ) : (
            <FollowTopicButton
              userId={user.id}
              topicId={topic.id}
              radius="full"
              className="text-offWhite bg-dark-200"
            />
          ))}
      </section>

      {topic.BlogPost.length > 0 ? (
        <>
          <RecommendedStories topic={topic} userId={user?.id} />
          <LatestStories topic={topic} userId={user?.id} />
        </>
      ) : (
        <div className="text-center py-10 ">
          <p className="text-xl">No stories yet! </p>
          <p>Be the first to write a story on this topic!</p>
        </div>
      )}
    </div>
  );
}

async function RecommendedStories({
  topic,
  userId,
}: {
  topic: Topic;
  userId?: string;
}) {
  const recommendedStories = await prisma.blogPost.findMany({
    where: {
      topicID: topic.id,
      status: PostStatus.PUBLISHED,
    },
    orderBy: {
      likedByUsers: {
        _count: "desc",
      },
    },
    take: 10,
    include: {
      author: true,
      topic: true,
    },
  });

  if (!recommendedStories.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-sans font-semibold ">Recommended Stories</h2>

      <div className="gap-5 mt-5 grid grid-cols-2">
        {recommendedStories.map((blog) => (
          <SquareBlogCard key={blog.id} blog={blog} userId={userId} />
        ))}
      </div>
    </section>
  );
}
async function LatestStories({
  topic,
  userId,
}: {
  topic: Topic;
  userId?: string;
}) {
  const recommendedStories = await prisma.blogPost.findMany({
    where: {
      topicID: topic.id,
      status: PostStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      author: true,
      topic: true,
    },
  });

  if (!recommendedStories.length) return null;

  return (
    <section className="py-10 grid grid-cols-3">
      <h2 className="text-2xl font-sans font-semibold col-span-1 ">
        Latest Stories
      </h2>

      <div className="gap-5 col-span-2 flex flex-col">
        {recommendedStories.map((blog) => (
          <BlogCard userId={userId} key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
