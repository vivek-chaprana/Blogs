"use client";
import followUser from "@/lib/actions/followUser";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface FollowButtonProps extends ButtonProps {
  followerId: string;
  followingId: string;
  text?: string;
}

export default function FollowButton(props: FollowButtonProps) {
  const { followerId, followingId, text, ...rest } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleFollowReq = async () => {
    setIsLoading(true);
    try {
      await followUser(followerId, followingId);
    } catch (error) {
      console.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Button isLoading={isLoading} onClick={handleFollowReq} {...rest}>
      {text || "Follow"}
    </Button>
  );
}
