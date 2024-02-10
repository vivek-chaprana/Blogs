"use client";
import unfollowUser from "@/lib/actions/unfollowUser";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FollowButtonProps extends ButtonProps {
  followerId: string;
  followingId: string;
  text?: string;
}

export default function UnfollowButton(props: FollowButtonProps) {
  const { followerId, followingId, text, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnfollowReq = async () => {
    setIsLoading(true);
    try {
      await unfollowUser(followerId, followingId);
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Button isLoading={isLoading} onClick={handleUnfollowReq} {...rest}>
      {text || "Unfollow"}
    </Button>
  );
}
