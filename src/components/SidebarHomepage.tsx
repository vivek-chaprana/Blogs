import { COMPANY_NAME, fallbackImageUrl } from "@/lib/constants";
import { Avatar, Button, Chip, cn } from "@nextui-org/react";
import Link from "next/link";
import { BsBookmark } from "react-icons/bs";
import Footer from "@/components/Footer";

export default function SidebarHomepage() {
  return (
    <aside className="border-l p-3 px-5 flex flex-col gap-5 h-min -top-[calc(100%-100px)] sticky w-1/3 ">
      <TopPicks />
      <StartWriting />
      <RecommendedTopics />
      <WhoToFollow />
      <ReadingList />
      <Footer />
    </aside>
  );
}

const TopPicks = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Top picks</h3>
      {new Array(3).fill(0).map((_, i) => (
        <div className={cn("py-3 border-b", i === 2 && " border-b-0")}>
          <div className="flex items-center gap-2 ">
            <Avatar
              size="sm"
              src={fallbackImageUrl}
              alt="Author"
              classNames={{
                base: "flex-shrink-0 w-6 h-6",
              }}
            />
            <Link href="#" className="flex gap-2 items-center font-normal">
              <p className="text-xs ">Author Name</p>
            </Link>
          </div>
          <h3 className="text-sm font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit?
          </h3>
        </div>
      ))}

      <Link href="#" className="text-sm font-normal text-green-600">
        See all
      </Link>
    </div>
  );
};

const StartWriting = () => {
  return (
    <div className="rounded-md bg-blue-300 text-black p-5 flex flex-col gap-4">
      <h3 className="font-semibold">Writing on {COMPANY_NAME}</h3>

      <div>
        <p className="font-light">Lorem, ipsum dolor.</p>
        <p className="font-light">Lorem, ipsum dolor.</p>
        <p className="font-light">Lorem, ipsum dolor.</p>
      </div>

      <Button
        as={Link}
        href="/new-story"
        size="sm"
        className="rounded-full bg-gray-900 text-offWhite w-min"
      >
        Start writing
      </Button>
    </div>
  );
};

const RecommendedTopics = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">Recommended topics</h3>
      <div className="flex flex-wrap gap-2">
        {[
          "Data Science",
          "Machine Learning",
          "Artificial Intelligence",
          "Python",
          "Productivity",
          "Politics",
        ].map((elem, index) => (
          <Chip
            as={Link}
            href="#"
            key={index}
            classNames={{ base: "px-3 py-5 bg-gray-200" }}
          >
            {elem}
          </Chip>
        ))}
      </div>
      <Link href="#" className="text-sm font-normal text-green-600">
        See more topics
      </Link>
    </div>
  );
};

const WhoToFollow = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">Who to follow</h3>
      <div className="flex flex-wrap gap-2">
        {new Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex gap-2 ">
            <Avatar
              size="sm"
              src={fallbackImageUrl}
              alt="Author"
              className="flex-shrink-0"
            />
            <div>
              <Link href="#">
                <h4 className="text-sm font-semibold">Lorem, ipsum.</h4>
              </Link>
              <p className="text-xs ">
                Lorem ipsum dolor sit amet consectetur....
              </p>
            </div>
            <Button
              variant="bordered"
              size="sm"
              radius="full"
              className="flex-shrink-0 border-dark-200 text-dark-200"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
      <Link href="#" className="text-sm font-normal text-green-600">
        See more suggestions
      </Link>
    </div>
  );
};

const ReadingList = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold ">Reading list</h3>
      <span className="text-sm ">
        Click on
        <BsBookmark className=" inline mx-1" />
        on any story to easily add it to your reading list or custom list to
        read later or share.
      </span>
    </div>
  );
};
