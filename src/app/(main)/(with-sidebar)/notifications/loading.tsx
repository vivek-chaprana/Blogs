import { NotificationCardSkeleton } from "@/components/skeleton";

export default function () {
  return (
    <div className="flex flex-col gap-2 ">
      {new Array(10).fill(0).map((_, i) => (
        <NotificationCardSkeleton key={i} />
      ))}
    </div>
  );
}
