import { Skeleton } from "@nextui-org/react";

export const BlogCardSkeleton = () => {
  return (
    <article className="flex flex-col border-b py-5 last:border-b-0 ">
      {/* User Details */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex gap-2 items-center ">
          <Skeleton className="rounded-full w-10 h-10" />
          <Skeleton className="w-20 h-6 rounded-md" />
        </div>
      </div>

      {/* Article */}
      <div className="flex min-h-20 w-full justify-between gap-2">
        <div className="flex flex-col justify-center w-3/5 ms:w-auto text-wrap">
          <div>
            <Skeleton className="rounded-md h-6 w-2/3" />
            <Skeleton className="rounded-md h-4 w-full my-2" />
            <Skeleton className="rounded-md h-4 w-full" />
          </div>
        </div>
        <div className="ms-2 w-2/5 aspect-[16/7] flex items-center  ">
          <Skeleton className="rounded-md w-full h-full" />
        </div>
      </div>

      {/* Bottom Options */}
      <Skeleton className="w-full h-6 rounded-md mt-2" />
    </article>
  );
};

export const SquareBlogCardSkeleton = () => {
  return (
    <div className="p-0 sm:p-1 md::p-5 col-span-full sm:col-span-1 flex flex-col h-full gap-1">
      <Skeleton className="h-[200px] w-full " />

      <div className="flex items-center gap-3 text-sm">
        <Skeleton className="h-[30px] w-[30px] rounded-full" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>

      <Skeleton className="h-6 w-full rounded-md" />

      <Skeleton className="rounded-md h-4 w-11/12" />
      <Skeleton className="rounded-md h-4 w-3/5" />

      <Skeleton className="rounded-md h-3 w-3/5 my-3" />

      <Skeleton className="rounded-md h-4 w-full" />
    </div>
  );
};
