import { Button, Skeleton } from "@nextui-org/react";

export function RecommendationsTopicCardSkeleton() {
  return (
    <div className="px-1 py-3 xs:p-3 border-b last:border-b-0 flex justify-between items-center gap-2 sm:gap-5 md:gap-10">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="rounded-md w-fit">Lorem Ipsum.</Skeleton>
        <Skeleton className="rounded-md h-4 w-11/12" />
        <Skeleton className="rounded-md h-4 w-3/4" />
        <Skeleton className="h-4 w-2/5 rounded-md" />
      </div>

      <Skeleton className="rounded-full">
        <Button>Follow</Button>
      </Skeleton>
    </div>
  );
}
