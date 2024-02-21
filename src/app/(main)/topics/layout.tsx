import Footer from "@/components/Footer";
import TopicSlider from "@/components/TopicSlider";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  const topics = await prisma.topic.findMany({
    orderBy: {
      BlogPost: {
        _count: "desc",
      },
    },
  });

  return (
    <>
      <main className="max-w-6xl mx-auto min-h-screen my-10 gap-10 justify-center lg:justify-start relative ">
        {/* Slider */}
        <div className="flex w-full relative ">
          <TopicSlider topics={topics} />
        </div>

        <div>{children}</div>
      </main>
      <Footer classes="justify-center border-t py-5 " />
    </>
  );
}
