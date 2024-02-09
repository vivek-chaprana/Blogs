import { FullBlog } from "@/types/prisma";

import BlogContentRenderer from "@/components/BlogContentRenderer";
import { fallbackCoverImageUrl, fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Button, Chip, Divider, Image } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import { JSONContent } from "@tiptap/core";
import { BsBookmark, BsDot, BsFlag, BsHeart, BsShare } from "react-icons/bs";
import { MdOutlineComment } from "react-icons/md";

export default function BlogRenderer({ blog }: { blog: FullBlog }) {
  return (
    <section className="max-w-4xl mx-auto p-2">
      <h1 className="text-gray-700 text-4xl font-bold my-5">{blog?.title}</h1>

      {/* Cover Image */}
      <div className="flex items-center justify-center my-5">
        <Image
          src={blog?.coverImage ?? fallbackCoverImageUrl}
          alt={blog?.title}
          className="max-h-[400px] "
          radius="none"
        />
      </div>

      {/* Author details here */}
      <div className="flex gap-2 items-center">
        <div className="p-3">
          <Image
            src={blog?.author?.image ?? fallbackImageUrl}
            alt={blog?.author?.username}
            width={50}
            height={50}
            radius="full"
            className="border"
          />
        </div>
        <div className="text-sm flex flex-col gap-2 ">
          <div className="flex items-center gap-2 ">
            <h4 className="font-semibold">
              {blog.author.name ?? blog.author.username}
            </h4>
            <BsDot />
            <button className="text-green-700">Follow</button>
          </div>

          <div className="flex items-center gap-2 ">
            <p>{blog.readingTime} min read</p>
            <BsDot />
            <p className="capitalize">{getFormattedDate(blog.createdAt)}</p>
          </div>
        </div>
      </div>

      <Divider className="mt-5 mb-1" />

      {/* Blog Actions here, like, share, etc */}
      <BlogActions blog={blog} />

      <Divider className="mb-5 mt-1" />

      <BlogContentRenderer content={blog?.content as JSONContent} />

      <BlogTags />

      <BlogActions blog={blog} />
    </section>
  );
}

const BlogActions = ({ blog }: { blog: BlogPost }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <BsHeart className="text-lg" />
          </Button>
          {blog.likes || "3.8k"}
        </span>

        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <MdOutlineComment className="text-lg" />
          </Button>
          1.2k
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <BsBookmark className="text-lg" />
          </Button>
        </span>
        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <BsShare className="text-lg" />
          </Button>
        </span>
        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <BsFlag className="text-lg" />
          </Button>
        </span>
      </div>
    </div>
  );
};

const BlogTags = () => {
  const tags = ["javascript", "reactjs", "nextjs", "webdev", "programming"];
  return (
    <div className="flex flex-wrap gap-2 my-10">
      {!!tags?.length &&
        tags.map((tag) => (
          <Chip key={tag} className="bg-gray-200 p-3 capitalize">
            {tag}
          </Chip>
        ))}
    </div>
  );
};
