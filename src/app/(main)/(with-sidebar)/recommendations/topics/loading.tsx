import { RecommendationsTopicCardSkeleton } from "@/components/skeleton";

export default function () {
  return (
    <div className="my-5">
      {new Array(5).fill(null).map((_, i) => (
        <RecommendationsTopicCardSkeleton key={i} />
      ))}
    </div>
  );
}
