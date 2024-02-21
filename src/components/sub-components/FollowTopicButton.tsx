"use client";
import followTopic from "@/lib/actions/followTopic";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface FollowButtonProps extends ButtonProps {
  userId: string;
  topicId: string;
  text?: string;
}

export default function FollowTopicButton(props: FollowButtonProps) {
  const { userId, topicId, text, ...rest } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleFollowReq = async () => {
    setIsLoading(true);
    try {
      await followTopic(userId, topicId);
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
