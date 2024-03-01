"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { BsReply } from "react-icons/bs";
import BlogComment from "../BlogComment";

export default function ReplyToComment({
  parentCommentId,
  blogId,
}: {
  parentCommentId: string;
  blogId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="light"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-min"
      >
        <BsReply className="text-lg" /> Reply
      </Button>

      {isOpen && (
        <BlogComment blogId={blogId} parentCommentId={parentCommentId} />
      )}
    </>
  );
}
