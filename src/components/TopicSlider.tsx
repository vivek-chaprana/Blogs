"use client";

import useActivePath from "@/lib/hooks/useActivePath";
import { Button, Chip, cn } from "@nextui-org/react";
import { Topic } from "@prisma/client";
import Link from "next/link";
import { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaCompass } from "react-icons/fa";

export default function TopicSlider({ topics }: { topics: Topic[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPostiion, setCurrentPosition] = useState(0);
  const checkActivePath = useActivePath();

  function scrollRight() {
    if (ref.current) {
      ref.current.scrollLeft += 100;
      setCurrentPosition((prevPosition) => prevPosition + 100);
    }
  }

  function scrollLeft() {
    if (ref.current) {
      ref.current.scrollLeft -= 100;
      setCurrentPosition((prevPosition) => prevPosition - 100);
    }
  }

  return (
    <div
      ref={ref}
      className="flex gap-1 xs:gap-3 overflow-scroll scrollbar-hide scroll-smooth overscroll-x-contain py-5 px-3"
    >
      <Link href="/topics" className="text-lg font-semibold text-gray-700">
        <Chip
          className={cn(
            "bg-gray-100 px-3 py-5",
            checkActivePath("topics") && "border-2 border-black "
          )}
          startContent={<FaCompass />}
        >
          Explore topics
        </Chip>
      </Link>
      {topics.map((topic) => (
        <Link
          href={"/topics/" + topic.slug}
          key={topic.id}
          className="text-lg font-semibold text-gray-700 "
        >
          <Chip
            className={cn(
              "bg-gray-100 px-3 py-5",
              checkActivePath(topic.slug) && "border-2 border-black "
            )}
          >
            {topic.name}
          </Chip>
        </Link>
      ))}
      {currentPostiion > 0 && (
        <Button
          variant="light"
          isIconOnly
          className="absolute h-full top-0 left-0 w-min bg-white border border-white"
          radius="none"
          onPress={scrollLeft}
        >
          <BsChevronLeft />{" "}
        </Button>
      )}

      {(!ref.current ||
        currentPostiion <
          ref.current.scrollWidth - ref.current.clientWidth) && (
        <Button
          variant="light"
          isIconOnly
          className="absolute h-full top-0 right-0 w-min bg-white border border-white"
          radius="none"
          onPress={scrollRight}
        >
          <BsChevronRight />{" "}
        </Button>
      )}
    </div>
  );
}
