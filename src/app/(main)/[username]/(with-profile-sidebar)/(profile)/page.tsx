import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import prisma from "@/prisma";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { blogPost: userBlogs } =
    (await prisma.user.findUnique({
      where: {
        username: params.username,
      },
      include: {
        blogPost: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: true,
            topic: true,
          },
        },
      },
    })) ?? {};

  return (
    <>
      {!!userBlogs?.length ? (
        <>
          {userBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <Loading />
        </>
      ) : (
        <p>No blogs yet!</p>
      )}
    </>
  );
}
