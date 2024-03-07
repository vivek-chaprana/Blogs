import { BlogCardSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="py-5">
      {new Array(5).fill(0).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
