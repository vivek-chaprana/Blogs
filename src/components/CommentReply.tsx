"use client";

import ReportModal from "@/components/ReportModal";
import { DeleteCommentButton } from "@/components/sub-components/BlogCommentUtils";
import ReplyToComment from "@/components/sub-components/ReplyToComment";
import { getCommentReplies } from "@/lib/actions/comment";
import { fallbackImageUrl } from "@/lib/constants";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullComment } from "@/types/prisma";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CommentReply({
  comment,
  userId,
  topmostCommentId,
}: {
  comment: FullComment;
  userId?: string;
  topmostCommentId: string;
}) {
  const [commentReplies, setCommentReplies] = useState<FullComment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchReplies() {
    setIsLoading(true);
    try {
      const replies = await getCommentReplies(comment.id);
      setCommentReplies(replies);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  function handleFetchMoreReplies() {
    setShowReplies(true);
    fetchReplies();
  }

  return (
    <div className="flex flex-col border-s-2 ps-2 xs:ps-5 sm:ps-10 p-3">
      <div className="flex justify-between flex-wrap">
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
          <div className="flex flex-col text-sm ">
            <h3 className="text-wrap">
              {comment.author.name || "@" + comment.author.username}
            </h3>
            <p className="text-xs text-wrap">
              {getFormattedDate(comment.createdAt)}
            </p>
          </div>
        </Link>
        {userId && (
          <div className="flex items-center gap-2 xs:gap-3">
            <ReportModal reported="comment" id={comment.id} />

            {(userId === comment.authorId ||
              userId === comment.blogPost.authorId) && (
              <DeleteCommentButton commentId={comment.id} />
            )}
          </div>
        )}
      </div>
      <p className="py-3">{comment.text}</p>

      <ReplyToComment
        parentCommentId={comment.id}
        blogId={comment.blogPostId}
      />

      {showReplies &&
        !!commentReplies.length &&
        commentReplies.map((reply) => (
          <CommentReply
            topmostCommentId={topmostCommentId}
            userId={userId}
            key={reply.id}
            comment={reply}
          />
        ))}

      {!showReplies && !!comment.replies.length && (
        <Button
          variant="light"
          onClick={handleFetchMoreReplies}
          className="w-min mx-auto text-sm"
          isLoading={isLoading}
        >
          Show replies {"("}
          {comment.replies.length}
          {")"}
        </Button>
      )}

      {showReplies && topmostCommentId === comment.parentCommentId && (
        <Button
          variant="light"
          onClick={() => setShowReplies(false)}
          className="w-min mx-auto text-sm"
        >
          Hide replies
        </Button>
      )}
    </div>
  );
}
