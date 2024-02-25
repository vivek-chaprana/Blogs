import { fallbackCoverImageUrl, fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullBlog } from "@/types/prisma";
import { Avatar, Button, Chip, Image, cn } from "@nextui-org/react";
import Link from "next/link";
import { BsDot, BsShare } from "react-icons/bs";
import ReportModal from "./ReportModal";
import BlogOptionsPopover from "./sub-components/BlogOptionsPopover";
import BlogStatusOptions from "./sub-components/BlogStatusOptions";
import LikeButton from "./sub-components/LikeButton";
import UnLikeButton from "./sub-components/UnLikeButton";

const BlogCard = ({
  blog,
  userId,
  linksDisabled = false,
}: {
  blog: FullBlog;
  userId?: string;
  linksDisabled?: boolean;
}) => {
  return (
    <article className="flex flex-col border-b py-5 last:border-b-0">
      {/* User Details */}
      <div className="flex items-center gap-1 sm:gap-2">
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
          <p className="text-xs md:text-sm ">
            {blog.author?.name ?? blog.author.username}
          </p>
        </Link>
        <span className="flex items-center text-sm font-light ">
          <BsDot />
          <p className="capitalize text-xs">
            {getFormattedDate(blog.createdAt)}
          </p>
        </span>
        {blog.authorId === userId && (
          <span className="items-center text-sm font-light hidden xs:inline-flex ">
            <BsDot />
            <p className="capitalize text-xs">
              {blog.status.toLocaleLowerCase()}
            </p>
          </span>
        )}
      </div>

      {/* Article */}
      <Link
        href={`/${blog.author.username}/${blog.slug}`}
        className={cn(
          "flex min-h-20 w-full justify-between gap-2",
          linksDisabled && "pointer-events-none"
        )}
      >
        <div className="flex flex-col justify-center w-3/5 ms:w-auto text-wrap">
          <h2 className="text-base md:text-lg font-bold line-clamp-2  ">
            {blog.title}
          </h2>
          {blog.description && (
            <p className="text-sm hidden md:flex">
              {blog.description.substring(0, 100) +
                (blog.description.length > 100 ? " ..." : "")}{" "}
            </p>
          )}
        </div>

        <div className="ms-2 sm:ms-10 w-2/5 md:w-[30%] flex items-center  ">
          <Image
            alt={blog.title}
            src={blog.coverImage || fallbackCoverImageUrl}
          />
        </div>
      </Link>

      {/* Bottom details */}
      <div className="text-sm flex items-center justify-between pt-3 md:pt-0 md:max-w-[70%]">
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

        {!linksDisabled && userId && (
          <div className="flex items-center">
            {/* Like button */}
            {blog.likedByUsersIds.includes(userId) ? (
              <UnLikeButton
                isIconOnly
                variant="light"
                size="sm"
                className="text-lg text-gray-500"
                userId={userId}
                blogId={blog.id}
              />
            ) : (
              <LikeButton
                isIconOnly
                variant="light"
                size="sm"
                className="text-lg text-gray-500"
                userId={userId}
                blogId={blog.id}
              />
            )}
            {blog.authorId === userId ? (
              <>
                <BlogStatusOptions blogStatus={blog.status} blogId={blog.id} />
                <BlogOptionsPopover blog={blog} />
              </>
            ) : (
              <>
                <ReportModal
                  reported="blog"
                  id={blog.id}
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-lg text-gray-500"
                />

                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-lg text-gray-500"
                >
                  <BsShare />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
