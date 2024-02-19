import { FullBlog, UserWithSavedIds } from "@/types/prisma";

import BlogContentRenderer from "@/components/BlogContentRenderer";
import { authOptions } from "@/lib/auth/auth-options";
import { fallbackCoverImageUrl, fallbackImageUrl } from "@/lib/constants";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import prisma from "@/prisma";
import { Button, Chip, Divider, Image } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import { JSONContent } from "@tiptap/core";
import { getServerSession } from "next-auth";
import { BsDot, BsShare } from "react-icons/bs";
import { MdOutlineComment } from "react-icons/md";
import BlogComment from "./BlogComment";
import CommentSection from "./CommentSection";
import ReportBlogModal from "./ReportBlogModal";
import BookmarkButton from "./sub-components/BookmarkButton";
import FollowButton from "./sub-components/FollowButton";
import LikeButton from "./sub-components/LikeButton";
import UnBookmarkButton from "./sub-components/UnBookmarkButton";
import UnLikeButton from "./sub-components/UnLikeButton";
import UnfollowButton from "./sub-components/UnfollowButton";

export default async function BlogRenderer({ blog }: { blog: FullBlog }) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  if (!currentUser) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: {
      savedBlogPosts: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) return null;

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
        <div className="text-sm flex flex-col  ">
          <div className="flex items-center gap-2 ">
            <h4 className="font-semibold text-base">
              {blog.author.name ?? blog.author.username}
            </h4>
            <BsDot />
            {!!currentUser &&
              blog.authorId !== currentUser?.id &&
              (blog.author.followedByIDs.includes(currentUser?.id) ? (
                <UnfollowButton
                  followerId={currentUser.id}
                  followingId={blog.authorId}
                  className="p-0"
                  variant="light"
                  color="danger"
                />
              ) : (
                <FollowButton
                  followerId={currentUser.id}
                  followingId={blog.authorId}
                  variant="light"
                  color="success"
                  className="p-0"
                />
              ))}
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
      <BlogActions blog={blog} user={user} />

      <Divider className="mb-5 mt-1" />

      <BlogContentRenderer content={blog?.content as JSONContent} />

      <BlogTags tags={blog.tags} />

      <BlogActions blog={blog} user={user} />

      <CommentSection blogId={blog.id} />
    </section>
  );
}

const BlogActions = ({
  blog,
  user,
}: {
  blog: BlogPost;
  user: UserWithSavedIds;
}) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1">
          {blog.likedByUsersIds.includes(user.id) ? (
            <UnLikeButton variant="light" blogId={blog.id} userId={user.id} />
          ) : (
            <LikeButton variant="light" blogId={blog.id} userId={user.id} />
          )}
          {blog.likedByUsersIds.length}
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
          {user.savedBlogPosts.some((post) => post.id === blog.id) ? (
            <UnBookmarkButton
              blogId={blog.id}
              userId={user.id}
              variant="light"
            />
          ) : (
            <BookmarkButton blogId={blog.id} userId={user.id} variant="light" />
          )}
        </span>
        <span className="flex items-center gap-1">
          <Button variant="light" size="sm" isIconOnly>
            <BsShare className="text-lg" />
          </Button>
        </span>
        <ReportBlogModal blogId={blog.id} />
      </div>
    </div>
  );
};

const BlogTags = ({ tags }: { tags: string[] }) => {
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
