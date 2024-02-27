import Tabs from "@/components/sub-components/Tabs";

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-dark-400 font-bold mt-5">
        Refine Recommendations
      </h1>
      <p className="text-sm text-gray-600 my-5">
        Adjust recommendations by updating what you&apos;re following, your
        reading history, and who you&apos;ve muted.
      </p>

      <div className="flex gap-2 xs:gap-5  text-sm border-b pt-10 pb-1">
        <Tabs
          base="recommendations"
          links={[
            {
              name: "Top Picks",
              url: "top-picks",
            },
            {
              name: "People",
              url: "people",
            },
            {
              name: "Topics",
              url: "topics",
            },
          ]}
        />
      </div>

      <div>{children}</div>
    </main>
  );
}
