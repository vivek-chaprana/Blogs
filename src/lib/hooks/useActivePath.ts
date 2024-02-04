import { usePathname } from "next/navigation";

export default function useActivePath() {
  const pathname = usePathname();

  const checkActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }
    return pathname.endsWith(path);
  };

  return checkActivePath;
}
