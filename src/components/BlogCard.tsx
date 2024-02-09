import { fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullBlog } from "@/types/prisma";
import { Avatar, Button, Chip, Image, cn } from "@nextui-org/react";
import Link from "next/link";
import { BsBookmark, BsDot, BsFlag, BsHeart } from "react-icons/bs";

const BlogCard = ({
  blog,
  linksDisabled = false,
}: {
  blog: FullBlog;
  linksDisabled?: boolean;
}) => {
  return (
    <article className="flex flex-col border-b py-5 last:border-b-0">
      {/* User Details */}
      <div className="flex items-center gap-2">
        <Link
          href={`/${blog.author.username}`}
          className={cn(
            "flex gap-2 items-center font-normal",
            linksDisabled && "pointer-events-none"
          )}
        >
          <Avatar
            size="sm"
            src={blog.author.image ?? fallbackImageUrl}
            alt={blog.author.name ?? "Author"}
          />
          <p className="text-sm ">
            {blog.author?.name ?? blog.author.username}
          </p>
        </Link>
        <span className="flex items-center text-sm font-light ">
          <BsDot />
          <p className="capitalize text-xs">
            {getFormattedDate(blog.createdAt)}
          </p>
        </span>
      </div>

      {/* Article */}
      <Link
        href={`/${blog.author.username}/${blog.slug}`}
        className={cn(
          "flex min-h-20 w-full",
          linksDisabled && "pointer-events-none"
        )}
      >
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-lg font-bold">{blog.title}</h1>
          {blog.description && (
            <p className="text-sm">{blog.description} ....</p>
          )}
        </div>

        <div className="w-[30%] ms-10">
          <Image
            alt="Cover image for the blog"
            src={blog.coverImage || fallbackImageUrl}
          />
        </div>
      </Link>

      {/* Bottom details */}
      <div className="text-sm flex items-center justify-between max-w-[70%]">
        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            className="capitalize"
            classNames={{ base: "bg-gray-200" }}
          >
            {blog.topic.name}
          </Chip>
          {blog?.readingTime && (
            <span className="text-xs">{blog?.readingTime} min read</span>
          )}
        </div>
        {/* Utility */}
        {!linksDisabled && (
          <div className="flex items-center">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-lg text-gray-500"
            >
              <BsHeart />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-lg text-gray-500"
            >
              <BsBookmark />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-lg text-gray-500"
            >
              <BsFlag />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
