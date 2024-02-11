import { useSearchParams } from "next/navigation";

export default function useActiveTab() {
  const params = useSearchParams();

  function checkActiveTab(tab: string) {
    if (tab === "/") return !params.has("feed") && !params.has("topic");

    if (tab === "following") return params.get("feed") === "following";

    return params.get("topic") === tab;
  }

  return checkActiveTab;
}
