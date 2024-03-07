import { BlogCardSkeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      {new Array(3).fill(0).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </>
  );
}
