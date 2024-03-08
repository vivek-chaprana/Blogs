import FollowTopicButton from "@/components/sub-components/FollowTopicButton";
import UnfollowTopicButton from "@/components/sub-components/UnfollowTopicButton";
import { authOptions } from "@/lib/auth/auth-options";
import { getTopicsRecommendations } from "@/lib/utils/recommendations";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

const Topics = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;
  const { recommendations, currentUser } = await getTopicsRecommendations({
    userId,
  });

  if (!recommendations?.length)
    return (
      <div className="text-center text-xl my-10 ">No recommendations.</div>
    );

  return (
    <div className="py-5">
      {recommendations.map((topic) => (
        <div
          key={topic.id}
          className="px-1 py-3 xs:p-3 border-b last:border-b-0 flex justify-between items-center gap-2 sm:gap-5 md:gap-10"
        >
          <div className="flex flex-col gap-2">
            <Link
              className="text-base xs:text-lg sm:text-xl font-semibold"
              href={`/topics/${topic.slug}`}
            >
              {topic.name}
            </Link>
            <p className="text-sm line-clamp-2">{topic.description}</p>

            <div className="flex items-center text-sm capitalize">
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
          {currentUser &&
            (currentUser.followingTopicIDs.includes(topic.id) ? (
              <UnfollowTopicButton
                topicId={topic.id}
                userId={currentUser.id}
                radius="full"
              />
            ) : (
              <FollowTopicButton
                topicId={topic.id}
                userId={currentUser.id}
                className="text-white bg-dark-200 "
                radius="full"
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Topics;
