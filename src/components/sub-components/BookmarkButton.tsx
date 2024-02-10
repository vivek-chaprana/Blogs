"use client";
import saveBlogToBookmarks from "@/lib/actions/saveBlogToBookmarks";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsBookmark } from "react-icons/bs";

interface BookmarkButtonProps extends ButtonProps {
  blogId: string;
  userId: string;
}

export default function BookmarkButton({
  blogId,
  userId,
  ...rest
}: BookmarkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    setIsLoading(true);
    try {
      await saveBlogToBookmarks({
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
      <BsBookmark className="text-lg" />
    </Button>
  );
}
