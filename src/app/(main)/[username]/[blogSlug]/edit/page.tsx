import NewStoryForm from "@/components/NewStoryForm";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function EditBlogPage(params: {
  params: { username: string; blogSlug: string };
}) {
  const blog = await prisma.blogPost.findUnique({
    where: {
      slug: params.params.blogSlug,
      author: {
        username: params.params.username,
      },
    },
    include: {
      author: true,
      topic: true,
      likedByUsers: true,
    },
  });

  if (!blog) return notFound();

  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user) redirect("/auth/login");

  if (user.id !== blog.author.id) return notFound();

  return (
    <main className="min-h-screen bg-white ">
      <NewStoryForm user={user} blog={blog} />
    </main>
  );
}
