"use client";

import useActiveTab from "@/lib/hooks/useActiveTab";
import { Button, cn } from "@nextui-org/react";
import { Topic } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs";

const activeClasses = "text-dark-100 border-b-dark-100 border-b-2";

function HomePageTabs({ topics }: { topics: Topic[] }) {
  const checkActiveTab = useActiveTab();
  const ref = useRef<HTMLDivElement>(null);
  const [currentPostiion, setCurrentPosition] = useState(0);

  const handleScrollLeft = (position: number) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft + position;
      setCurrentPosition(ref.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (ref.current) {
      setCurrentPosition(ref.current.scrollLeft);
    }
  }, []);

  const scrollPosition = {
    LEFT: -100,
    RIGHT: 100,
  };

  return (
    <div className="relative overflow-x-hidden">
      <div
        ref={ref}
        className="flex gap-5 text-sm border-b overflow-x-scroll scrollbar-hide scroll-smooth overscroll-x-contain px-10 justify-evenly"
      >
        {currentPostiion > 0 && (
          <Button
            size="sm"
            radius="none"
            variant="light"
            isIconOnly
            className="absolute top-0 left-0 z-10 h-full bg-white"
            onClick={() => handleScrollLeft(scrollPosition.LEFT)}
          >
            <BsChevronLeft className=" font-semibold" />
          </Button>
        )}

        {ref.current &&
          ref.current.scrollWidth - ref.current.clientWidth >
            Math.ceil(currentPostiion) && (
            <Button
              size="sm"
              radius="none"
              variant="light"
              isIconOnly
              className={cn("absolute top-0 right-0 z-10 h-full  bg-white ")}
              onClick={() => handleScrollLeft(scrollPosition.RIGHT)}
            >
              <BsChevronRight />
            </Button>
          )}

        <Link
          className={cn(
            "min-w-max font-semibold text-gray-500 hover:text-dark-200 transition-colors py-4"
          )}
          href={{
            pathname: "/",
          }}
        >
          <BsPlus className="text-lg" />
        </Link>
        <Link
          className={cn(
            "min-w-max font-semibold text-gray-500 hover:text-dark-200 transition-colors py-4",
            checkActiveTab("/") && activeClasses
          )}
          href={{
            pathname: "/",
          }}
        >
          For you
        </Link>
        <Link
          className={cn(
            "min-w-max font-semibold text-gray-500 hover:text-dark-200 transition-colors py-4",
            checkActiveTab("following") && activeClasses
          )}
          href={{
            pathname: "/",
            query: { feed: "following" },
          }}
        >
          Following
        </Link>
        {!!topics.length &&
          topics.map((topic) => (
            <Link
              key={topic.id}
              className={cn(
                "min-w-max font-semibold text-gray-500 hover:text-dark-200 transition-colors py-4",
                checkActiveTab(topic.slug) && activeClasses
              )}
              href={{
                pathname: "/",
                query: { topic: topic.slug },
              }}
            >
              {topic.name}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default HomePageTabs;
