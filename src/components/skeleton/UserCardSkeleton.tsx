import { Button, Skeleton } from "@nextui-org/react";

export default function UserCardSkeleton() {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-5 w-full">
        <Skeleton className="min-w-[50px] h-[50px] xs:w-auto aspect-square shrink-0 rounded-full" />
        <div className=" w-full flex flex-col gap-2 py-2">
          <Skeleton className="rounded-md h-5 w-1/3 " />
          <Skeleton className="rounded-md h-4 w-11/12" />
          <Skeleton className="rounded-md h-4 w-3/4" />
        </div>
      </div>

      <Skeleton className="rounded-full ">
        <Button>Follow</Button>
      </Skeleton>
    </div>
  );
}
