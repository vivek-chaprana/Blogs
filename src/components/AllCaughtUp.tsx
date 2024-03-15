import { Button } from "@nextui-org/react";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";

export default function AllCaughtUp({
  title,
  desc,
  button,
}: {
  title?: string;
  desc?: string;
  button?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full my-5">
        <hr className="w-full h-px bg-default border-0 dark:bg-gray-700 " />
        <span className="absolute px-3 text-xs  text-gray-900  bg-white  dark:text-white dark:bg-gray-900">
          <BsCheckCircle className="text-3xl text-green-400" />
        </span>
      </div>
      <h3 className="font-semibold text-lg ">
        {title || "You're all caught up"}
      </h3>
      <p className="text-base mt-0 mb-2">
        {desc || "You've seen all new posts."}
      </p>
      <div className="flex gap-5 items-center justify-center">
        {button || (
          <>
            <Button
              as={Link}
              variant="light"
              href="/topics"
              className="text-dark-200 font-medium"
            >
              Explore Topics
            </Button>
            <Button
              as={Link}
              variant="light"
              href="/recommendations/top-picks"
              className="text-dark-200 font-medium"
            >
              Recommendations
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
