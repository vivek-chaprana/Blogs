import UserCard from "@/components/UserCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

const People = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followingTopics: true,
    },
  });

  const recommendations = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
        notIn: currentUser?.followingIDs,
      },

      blogPost: {
        some: {
          topicID: {
            in: currentUser?.followingTopics.map((topic) => topic.id),
          },
        },
      },
    },
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
  });

  if (!recommendations.length)
    return (
      <div className="text-center text-xl my-10 ">No recommendations.</div>
    );

  return (
    <div className="py-5">
      {recommendations.map((user) => (
        <div key={user.id} className="py-3 border-b last:border-b-0">
          <UserCard user={user} signedInUserId={userId} />
        </div>
      ))}
    </div>
  );
};

export default People;
