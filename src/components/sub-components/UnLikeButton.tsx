"use client";
import unlikeBlogpost from "@/lib/actions/unlikeBlogpost";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsHeartFill } from "react-icons/bs";

interface UnLikeButtonProps extends ButtonProps {
  blogId: string;
  userId: string;
}

export default function UnLikeButton({
  blogId,
  userId,
  ...rest
}: UnLikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    setIsLoading(true);
    try {
      await unlikeBlogpost({
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
      <BsHeartFill className="text-lg fill-red-600" />
    </Button>
  );
}
