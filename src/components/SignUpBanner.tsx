"use client";

import { COMPANY_NAME } from "@/lib/constants";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export default function SignUpBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    isBannerVisible && (
      <section
        className="fixed bottom-0 left-0 right-0 py-10 md:py-20 bg-gray-100 z-50 border border-t-gray-400 
      flex md:flex-row flex-col justify-evenly 
      "
      >
        <Button
          onClick={() => setIsBannerVisible(false)}
          isIconOnly
          radius="full"
          variant="light"
          className="absolute top-5 right-5"
        >
          <RxCross2 className="text-xl" />
        </Button>

        <div className="flex md:max-w-lg flex-col gap-5 justify-center p-3 lg:p-0 text-center md:text-start ">
          <h1 className="font-brand font-bold text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-dark-200">
            {COMPANY_NAME}
          </h1>
          <p className="font-serif text-base xs:text-lg sm:text-xl">
            Sign up to discover human stories that deepen your understanding of
            the world.
          </p>
        </div>

        <div className="p-3 lg:p-0 min-w-[30%] flex flex-col items-center md:items-start">
          <div className="flex flex-col gap-5 bg-white rounded-lg p-3 lg:p-5 text-sm w-full xs:w-[80%] md:w-full ">
            <span className="w-full border-b py-3 font-semibold text-base">
              Free
            </span>

            <span className="flex gap-2 items-center">
              <BsCheck2 className="text-lg" />
              Distraction-free reading. No ads.
            </span>
            <span className="flex gap-2 items-center">
              <BsCheck2 className="text-lg" />
              Organize your knowledge with lists and highlights.
            </span>
            <span className="flex gap-2 items-center">
              <BsCheck2 className="text-lg" />
              Tell your story. Find your audience.
            </span>

            <Button
              as={Link}
              href="/register"
              className="text-white bg-dark-200"
              radius="full"
            >
              Sign up for free{" "}
            </Button>
          </div>

          <span className="text-sm text-gray-500 flex gap-2 mt-2 justify-center md:justify-start">
            Need help ?
            <Link
              className="underline hover:underline-offset-2 font-medium transition-all duration-100"
              href="/help"
            >
              Get Help
            </Link>
            <Link
              className="underline hover:underline-offset-2 font-medium transition-all duration-100"
              href="/contact"
            >
              Contact Us
            </Link>
          </span>
        </div>
      </section>
    )
  );
}
