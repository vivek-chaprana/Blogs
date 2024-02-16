import { fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import prisma from "@/prisma";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { BsFlag } from "react-icons/bs";
import BlogComment from "./BlogComment";
import { DeleteCommentButton } from "./sub-components/BlogCommentUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

export default async function CommentSection({ blogId }: { blogId: string }) {
  const blog = await prisma.blogPost.findUnique({
    where: {
      id: blogId,
    },
    include: {
      comments: {
        include: {
          author: true,
          replies: {
            include: {
              author: true,
            },
          },
          parentComment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return (
    <div>
      {userId ? <BlogComment blogId={blogId} /> : <div>Sign in to comment</div>}

      <h4 className="font-semibold text-lg">Comments</h4>
      <div className="flex flex-col gap-5 px-3 py-5">
        {blog?.comments.map((comment) => (
          <div key={comment.id} className="flex flex-col border rounded-lg p-3">
            <div className="flex justify-between">
              <Link
                href={`/${comment.author.username}`}
                className="flex items-center gap-4"
              >
                <Image
                  src={comment.author.image || fallbackImageUrl}
                  alt={comment.author.name || "@" + comment.author.username}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col text-sm">
                  <h3>
                    {comment.author.name || "@" + comment.author.username}
                  </h3>
                  <p>{getFormattedDate(comment.createdAt)}</p>
                </div>
              </Link>
              {userId && (
                <div className="flex items-center gap-3">
                  <Button variant="light" isIconOnly>
                    <BsFlag className="text-lg" />
                  </Button>

                  {userId === comment.authorId && (
                    <DeleteCommentButton commentId={comment.id} />
                  )}
                </div>
              )}
            </div>
            <p className="pt-5">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
