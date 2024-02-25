"use client";

import useActivePath from "@/lib/hooks/useActivePath";
import { Button, cn } from "@nextui-org/react";
import Link from "next/link";

export default function Tabs({
  base,
  links,
  activeStyles = "font-semibold",
}: {
  base: string;
  links: { name: string; url: string }[];
  activeStyles?: string;
}) {
  const checkActivePath = useActivePath();
  return (
    <>
      {links.map((link, i) => (
        <Button
          key={i}
          className={cn(
            "capitalize",
            checkActivePath(link.url === "/" ? base : link.url) && activeStyles
          )}
          as={Link}
          href={`/${base}/${link.url}`}
          variant="light"
        >
          {link.name}
        </Button>
      ))}
    </>
  );
}
