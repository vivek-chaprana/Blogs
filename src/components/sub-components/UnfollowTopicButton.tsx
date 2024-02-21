"use client";
import unfollowTopic from "@/lib/actions/unfollowTopic";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface FollowButtonProps extends ButtonProps {
  userId: string;
  topicId: string;
  text?: string;
}

export default function UnfollowTopicButton(props: FollowButtonProps) {
  const { userId, topicId, text, ...rest } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleFollowReq = async () => {
    setIsLoading(true);
    try {
      await unfollowTopic(userId, topicId);
    } catch (error) {
      console.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={handleFollowReq}
      color="danger"
      {...rest}
    >
      {text || "Unfollow"}
    </Button>
  );
}
