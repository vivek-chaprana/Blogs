import { fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Avatar, Button, Chip, Image, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { BsBookmark, BsDot, BsFlag, BsHeart } from "react-icons/bs";

export default async function BlogsHomepage() {
  const blogs = await prisma.blogPost.findMany({
    include: {
      author: true,
    },
  });

  let newBlogs = new Array(10).fill(blogs[0]);

  return (
    <section className="py-10">
      {!!blogs.length &&
        newBlogs.map((blog) => <BlogCardHomepage key={blog.id} blog={blog} />)}

      {/* Spinner */}
      <div className="flex gap-4 items-center justify-center my-5">
        <Spinner color="default" />
      </div>
    </section>
  );
}

const BlogCardHomepage = ({ blog }: { blog: any }) => {
  return (
    <article className="flex flex-col border-b py-5">
      {/* User Details */}
      <div className="flex items-center gap-2">
        <Link href="#" className="flex gap-2 items-center font-normal">
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
          <p>5 hours ago</p>
        </span>
      </div>

      {/* Article */}
      <Link href="#" className="flex min-h-20 w-full">
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-lg font-bold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure saepe
            temporibus, consequatur eius ea iste.
          </h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            recusandae veritatis provident magnam laudantium autem. Repellendus
            quasi laborum iste similique? ....
          </p>
        </div>
        <div className="w-[30%]">
          <Image alt="Cover image for the blog" src={fallbackImageUrl} />
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
            nextjs
          </Chip>
          <span className="text-xs">4 min read</span>
        </div>
        {/* Utility */}
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
      </div>
    </article>
  );
};
