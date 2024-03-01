import { fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullComment } from "@/types/prisma";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import CommentReply from "./CommentReply";
import ReportModal from "./ReportModal";
import { DeleteCommentButton } from "./sub-components/BlogCommentUtils";
import ReplyToComment from "./sub-components/ReplyToComment";

const CommentCard = ({
  comment,
  userId,
}: {
  comment: FullComment;
  userId?: string;
}) => {
  return (
    !!comment.author && (
      <div className="flex flex-col border rounded-lg p-3">
        <div className="flex justify-between ">
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
              <h3>{comment.author.name || "@" + comment.author.username}</h3>
              <p className="text-xs">{getFormattedDate(comment.createdAt)}</p>
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

        {!!comment.replies.length &&
          comment.replies.map((reply) => (
            <CommentReply
              topmostCommentId={comment.id}
              userId={userId}
              key={reply.id}
              comment={reply as FullComment}
            />
          ))}
      </div>
    )
  );
};
export default CommentCard;
