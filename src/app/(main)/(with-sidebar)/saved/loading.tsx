import { BlogCardSkeleton } from "@/components/skeleton";
import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center ">
        <Skeleton className="rounded-md w-full">
          <h1 className="text-xl xs:text-3xl sm:text-4xl font-bold">
            Your library
          </h1>
        </Skeleton>
      </div>

      {new Array(5).fill(0).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
