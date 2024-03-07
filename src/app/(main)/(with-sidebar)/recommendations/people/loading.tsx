import { UserCardSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="py-5">
      {new Array(5).fill(null).map((_, i) => (
        <div key={i} className="py-3 border-b last:border-b-0">
          <UserCardSkeleton />
        </div>
      ))}
    </div>
  );
}
