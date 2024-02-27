import BlogCard from "@/components/BlogCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

const TopPicks = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followingTopics: true,
      following: true,
      likedBlogPosts: true,
    },
  });

  const likedBlogPostsTopics = await prisma.blogPost.findMany({
    where: {
      id: {
        in: currentUser?.likedBlogPosts.map((blog) => blog.id),
      },
    },
    select: {
      topicID: true,
    },
  });

  const interestedTopics = Array.from(
    new Set<string>([
      ...likedBlogPostsTopics.map((blog) => blog.topicID),
      ...(currentUser ? currentUser?.followingTopicIDs : []),
    ])
  );

  const recommendations = await prisma.blogPost.findMany({
    where: {
      topicID: {
        in: interestedTopics,
      },
      authorId: {
        not: userId,
        in: currentUser?.following.map((user) => user.id),
      },
    },
    include: {
      author: true,
      topic: true,
    },
  });

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
