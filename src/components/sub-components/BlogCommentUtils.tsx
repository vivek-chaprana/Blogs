"use client";

import { deleteComment } from "@/lib/actions/comment";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

interface DeleteButtonProps extends ButtonProps {
  commentId: string;
}

export function DeleteCommentButton(props: DeleteButtonProps) {
  const { commentId, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDeleteComment() {
    setIsLoading(true);
    try {
      await deleteComment(commentId);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(true);
      router.refresh();
    }
  }

  return (
    <Button
      isIconOnly
      variant="light"
      color="danger"
      onClick={handleDeleteComment}
      isLoading={isLoading}
      {...rest}
    >
      <BsTrash className="text-lg" />
    </Button>
  );
}
