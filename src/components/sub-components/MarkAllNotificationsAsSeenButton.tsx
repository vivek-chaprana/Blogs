"use client";

import { markAllNotificationsAsSeen } from "@/lib/actions/notification";
import { Button, ButtonProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FollowButtonProps extends ButtonProps {
  userId: string;
}

export default function MarkAllNotificationsAsSeenButton(
  props: FollowButtonProps
) {
  const { userId, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUnfollowReq = async () => {
    setIsLoading(true);
    try {
      await markAllNotificationsAsSeen(userId);
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Button isLoading={isLoading} onClick={handleUnfollowReq} {...rest}>
      Mark all as seen
    </Button>
  );
}
