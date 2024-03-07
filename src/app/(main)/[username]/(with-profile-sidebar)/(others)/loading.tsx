import { UserCardSkeleton } from "@/components/skeleton";
import { Skeleton } from "@nextui-org/react";

export default function () {
  return (
    <div className="p-4">
      <Skeleton className="rounded-md">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold ">
          XX Following
        </h1>
      </Skeleton>

      <div className="flex flex-col gap-5 py-10">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
}
