import LikeButton from "@/components/sub-components/LikeButton";
import {
  WEBAPP_URL,
  fallbackCoverImageUrl,
  fallbackImageUrl,
} from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { FullBlog } from "@/types/prisma";
import { Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import UnLikeButton from "./sub-components/UnLikeButton";
import ReportModal from "./ReportModal";
import ShareButton from "./sub-components/ShareButton";

export default function SquareBlogCard({
  blog,
  userId,
}: {
  blog: FullBlog;
  userId?: string;
}) {
  return (
    <div
      key={blog.id}
      className="p-0 sm:p-1 md::p-5 col-span-full sm:col-span-1 flex flex-col h-full gap-1"
    >
      <Link
        href={`/${blog.author.username}/${blog.slug}`}
        className="items-center flex justify-center mb-3"
      >
        <Image
          src={blog.coverImage || fallbackCoverImageUrl}
          alt={blog.title}
          radius="none"
          className="h-[200px] w-auto"
        />
      </Link>

      <Link
        href={`/${blog.author.username}`}
        className="flex items-center gap-3 text-sm"
      >
        <Image
          src={blog.author.image || fallbackImageUrl}
          alt={blog.author.name || blog.author.username}
          radius="full"
          width={30}
          height={30}
        />
        <p className="hover:underline underline-offset-2">
          {blog.author.name || "@" + blog.author.username}
        </p>
      </Link>

      <Link
        className="font-semibold text-base line-clamp-2"
        href={`/${blog.author.username}/${blog.slug}`}
      >
        {blog.title}
      </Link>

      {blog.description && (
        <p className="text-xs line-clamp-2">
          {blog.description?.substring(0, 100) +
            (blog.description.length > 100 && "...")}
        </p>
      )}

      <div className="flex gap-2 text-xs sm:text-sm items-center my-3 ">
        <p>{blog.readingTime} min read</p>
        <BsDot />
        <p>{getFormattedDate(blog.createdAt)}</p>
      </div>

      <div className="flex justify-between items-center ">
        <Chip
          as={Link}
          href={`/topics/${blog.topic.slug}`}
          size="sm"
          variant="flat"
        >
          {blog.topic.name || "Nextjs"}
        </Chip>
        {!!userId && (
          <div className="flex items-center gap-2">
            <ReportModal
              reported="blog"
              id={blog.id}
              isIconOnly
              variant="light"
              size="sm"
              className="text-lg text-gray-500"
            />

            <ShareButton
              size="sm"
              className="text-lg text-gray-500"
              url={`${WEBAPP_URL}/${blog.author.username}/${blog.slug}`}
              media={blog.coverImage ?? fallbackCoverImageUrl}
              title={blog.title}
              desc={blog.description ?? undefined}
              tags={blog.tags}
            />

            {blog.likedByUsersIds.includes(userId) ? (
              <UnLikeButton
                blogId={blog.id}
                userId={userId}
                variant="light"
                size="sm"
              />
            ) : (
              <LikeButton
                blogId={blog.id}
                userId={userId}
                variant="light"
                size="sm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
