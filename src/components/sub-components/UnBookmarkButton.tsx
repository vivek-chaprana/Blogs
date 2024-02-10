"use client";
import removeBlogFromBookmarks from "@/lib/actions/removeBlogFromBookmarks";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsBookmarkFill } from "react-icons/bs";

interface UnBookmarkButtonProps extends ButtonProps {
  blogId: string;
  userId: string;
}

export default function UnBookmarkButton({
  blogId,
  userId,
  ...rest
}: UnBookmarkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    setIsLoading(true);
    try {
      await removeBlogFromBookmarks({
        blogId,
        userId,
      });
    } catch (e) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Button isIconOnly isLoading={isLoading} onClick={handleLike} {...rest}>
      <BsBookmarkFill className="text-lg fill-dark-200 border" />
    </Button>
  );
}
