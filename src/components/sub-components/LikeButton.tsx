"use client";
import likeBlogpost from "@/lib/actions/likeBlogpost";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsHeart } from "react-icons/bs";

interface LikeButtonProps extends ButtonProps {
  blogId: string;
  userId: string;
}

export default function LikeButton({
  blogId,
  userId,
  ...rest
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    setIsLoading(true);
    try {
      await likeBlogpost({
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
      <BsHeart className="text-lg" />
    </Button>
  );
}
