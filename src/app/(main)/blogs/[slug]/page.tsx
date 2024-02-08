import BlogRenderer from "@/components/BlogRenderer";
import prisma from "@/prisma";
import { Divider } from "@nextui-org/react";
import { JSONContent } from "@tiptap/core";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params ?? {};

  if (!slug) return notFound();

  const blog = await prisma.blogPost.findUnique({ where: { slug: slug } });

  if (!blog) return notFound();

  return (
    <section className="max-w-5xl mx-auto p-2">
      <h1 className="text-gray-700 text-4xl font-bold my-5">{blog?.title}</h1>
      <Divider />
      {/* Author details here */}
      {/* Blog details here, like, share, etc */}
      <BlogRenderer content={blog?.content as JSONContent} />
    </section>
  );
}
