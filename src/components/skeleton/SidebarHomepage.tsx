import { Chip, Skeleton } from "@nextui-org/react";

function SideBlogCard() {
  return (
    <div className="py-3 border-b">
      <div className="flex items-center gap-2 ">
        <Skeleton className="w-6 h-6 rounded-full" />
        <div className="flex gap-2 items-center font-normal">
          <Skeleton className="rounded-md overflow-hidden">
            <p className="text-xs ">Lorem, ipsum dolor.</p>
          </Skeleton>
        </div>
      </div>
      <Skeleton className="h-4 w-full rounded-md mt-1" />
    </div>
  );
}

export function TopPicksSkeleton() {
  return new Array(3).fill(0).map((_, i) => <SideBlogCard key={i} />);
}

export function RecommendedTopicsSkeleton() {
  return new Array(6).fill(0).map((_, i) => (
    <Skeleton key={i} className="overflow-hidden rounded-full">
      <Chip classNames={{ base: "px-3 py-5 bg-gray-200" }}>Lorem.</Chip>
    </Skeleton>
  ));
}

export function WhoToFollowSkeleton() {
  return new Array(3).fill(0).map((_, i) => (
    <div key={i} className="flex gap-2 w-full items-center ">
      <Skeleton className="rounded-full w-8 h-8 " />
      <div className="w-full">
        <div className="flex justify-between">
          <Skeleton className="rounded-md w-2/3 h-5" />
          <Skeleton className="rounded-full h-5 w-12" />
        </div>
        <Skeleton className="h-4  rounded-md mt-2 " />
      </div>
    </div>
  ));
}

export function ReadingListSkeleton() {
  return new Array(3).fill(0).map((_, i) => <SideBlogCard key={i} />);
}
