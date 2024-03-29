import Tabs from "@/components/sub-components/Tabs";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    query: string;
  };
}): Promise<Metadata> {
  return {
    title: `Results for ${params.query}`,
    description: `Search results for ${params.query}`,
  };
}

export default async function SearchLayout({
  children,
  params,
}: {
  children: any;
  params: {
    query: string;
  };
}) {
  const query = decodeURIComponent(params.query);

  return (
    <main className="">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gray-400 font-bold">
        Results for <span className="text-black">{query}</span>
      </h1>

      <div className="flex gap-2 xs:gap-5 text-sm border-b pt-10 pb-1">
        <Tabs
          base={`search/${query}`}
          links={[
            {
              name: "Posts",
              url: "posts",
            },
            {
              name: "Users",
              url: "users",
            },
            {
              name: "Tags",
              url: "tags",
            },
          ]}
        />
      </div>

      <div>{children}</div>
    </main>
  );
}
