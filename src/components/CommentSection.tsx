import BlogComment from "@/components/BlogComment";
import CommentCard from "@/components/CommentCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaUserLock } from "react-icons/fa";

export default async function CommentSection({ blogId }: { blogId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      blogPostId: blogId,
      parentComment: null,
    },
    include: {
      author: true,
      blogPost: {
        select: {
          authorId: true,
        },
      },
      replies: {
        include: {
          author: true,
          blogPost: {
            select: {
              authorId: true,
            },
          },
          replies: {
            include: {
              _count: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <div id="commentSection" className="pt-10">
      {userId ? (
        <BlogComment blogId={blogId} />
      ) : (
        <Link
          href="/register"
          className="w-full rounded-xl bg-gray-50 py-10 text-center font-semibold text-lg flex items-center justify-center gap-5"
        >
          <FaUserLock className="text-lg " />
          Sign in to comment
        </Link>
      )}

      {!!comments.length && (
        <>
          <h4 className="font-semibold text-lg">Comments</h4>
          <div className="flex flex-col gap-5 px-3 py-3">
            {comments.map((comment) => (
              <CommentCard comment={comment} key={comment.id} userId={userId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
