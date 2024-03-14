import BlogCard from "@/components/BlogCard";
import { authOptions } from "@/lib/auth/auth-options";
import { getTopPicks } from "@/lib/utils/recommendations";
import { getServerSession } from "next-auth";

const TopPicks = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  const recommendations = await getTopPicks({ userId, take: 5, limit: false });

  if (!recommendations.length)
    return (
      <div className="text-center text-xl my-10 ">No recommendations.</div>
    );

  return (
    <div className="py-5">
      {recommendations.map((blog) => (
        <BlogCard key={blog.id} blog={blog} userId={userId} />
      ))}
    </div>
  );
};

export default TopPicks;
