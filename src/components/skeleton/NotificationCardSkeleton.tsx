import { Skeleton } from "@nextui-org/react";

export default function NotificationCardSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-5 xs:p-5 border-b last:border-b-0 cursor-pointer rounded-lg rounded-s-none">
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
      <div className="flex flex-col gap-1 w-full">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
