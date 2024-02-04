"use client";

import useActivePath from "@/lib/hooks/useActivePath";
import { Button, cn } from "@nextui-org/react";
import Link from "next/link";

export default function ProfileTabs({
  username,
  links,
}: {
  username: string;
  links: { name: string; url: string }[];
}) {
  const checkActivePath = useActivePath();
  return (
    <div className="flex gap-5  text-sm border-b px-5 py-2">
      {links.map((link, i) => (
        <Button
          key={i}
          className={cn(
            "capitalize",
            checkActivePath(link.url === "/" ? username : link.url) &&
              "text-green-700 font-semibold"
          )}
          as={Link}
          href={`/${username}/${link.url}`}
          variant="light"
        >
          {link.name}
        </Button>
      ))}
    </div>
  );
}
