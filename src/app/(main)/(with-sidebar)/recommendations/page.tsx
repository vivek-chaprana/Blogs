import { redirect } from "next/navigation";

export default async function RecommendationsPage() {
  redirect("/recommendations/top-picks");
}
