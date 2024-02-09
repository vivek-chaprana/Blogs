import prisma from "@/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const blog = await prisma.blogPost.findMany();

  await prisma.blogPost.update({
    where: { id: blog[0].id },
    data: {
      topic: {
        update: {
          name: "Updated Topic Name",
        },
      },
    },
  });

  return NextResponse.json({ message: "Hello World" });
}
