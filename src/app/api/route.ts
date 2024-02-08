import prisma from "@/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const blog = await prisma.blogPost.findMany();

  await prisma.blogPost.update({
    where: { id: blog[0].id },
    data: {
      coverImage:
        "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Boost your website's impact with a blog! Enhance SEO, engage audiences, and establish authority. Follow our guide for success.",
    },
  });

  return NextResponse.json({ message: "Hello World" });
}
