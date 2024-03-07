import { BlogCardSkeleton } from "@/components/skeleton";

export default function () {
  return (
    <div className="py-5">
      {new Array(5).fill(0).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
