import Footer from "@/components/Footer";
import TopicSlider from "@/components/TopicSlider";
import prisma from "@/prisma";

export default async function WithSidearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    </>
  );
}
