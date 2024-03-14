import UserCard from "@/components/UserCard";
import { authOptions } from "@/lib/auth/auth-options";
import { getPeopleRecommendations } from "@/lib/utils/recommendations";
import { getServerSession } from "next-auth";

const People = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;
  const recommendations = await getPeopleRecommendations({
    userId,
    limit: false,
    take: 5,
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
