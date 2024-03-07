"use client";

import { fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullBlog } from "@/types/prisma";
import { Avatar, cn } from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: FullBlog[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);
  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }
    addAnimation();
  }, [getDirection, getSpeed]);

  const [start, setStart] = useState(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((blog) => (
          <li
            className="w-[250px] sm:w-[350px] max-w-full relative rounded-2xl border flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] flex flex-col justify-evenly gap-2"
            key={blog.id}
          >
            <div className="flex items-center gap-1 text-sm font-semibold ">
              <Link
                href={`/${blog.author.username}`}
                className="inline-flex gap-2 items-center "
              >
                <Avatar
                  src={blog.author.image || fallbackImageUrl}
                  alt={blog.author.name || blog.author.username}
                  radius="full"
                  size="sm"
                />
                {blog.author.name || "@" + blog.author.username}
              </Link>
              <span className="font-normal">in</span>
              <Link href={`/topics/${blog.topic.slug}`}>{blog.topic.name}</Link>
            </div>
            <Link href={`/${blog.author.username}/${blog.slug}`}>
              <h3 className="text-lg font-semibold line-clamp-2">
                {blog.title}
              </h3>
              <p className=" line-clamp-1">{blog.description}</p>
            </Link>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{getFormattedDate(blog.createdAt)}</span>
              {blog?.readingTime && <span>{blog?.readingTime} min read</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
