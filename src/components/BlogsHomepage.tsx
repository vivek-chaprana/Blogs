import { fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

function getUserFromId(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export default async function BlogsHomepage() {
  const blogs = await prisma.blogPost.findMany();

  return (
    <section>
      <h1 className="text-xl font-bold  uppercase">ALL Blogs</h1>
      {!!blogs.length &&
        blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={blog.id}
            className="flex flex-col p-3 items-center w-min border border-red-400"
          >
            <h2 className="text-lg font-semibold">{blog.title}</h2>
            <p className="">{blog.description}</p>
            <UserDetails id={blog.authorId} />
          </Link>
        ))}
    </section>
  );
}

const UserDetails = async ({ id }: { id: string }) => {
  const user = await getUserFromId(id);
  if (!user) return null;

  return (
    <div className="flex p-3 items-center gap-2 w-min ">
      <Avatar src={user.image ?? fallbackImageUrl} />
      {user.username}
    </div>
  );
};
