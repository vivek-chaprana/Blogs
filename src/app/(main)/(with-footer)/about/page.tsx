import { COMPANY_NAME } from "@/lib/constants";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | " + COMPANY_NAME,
  description: "Read our story and learn more about " + COMPANY_NAME + ".",
};

export default function About() {
  return (
    <main className=" min-h-screen ">
      <div className="max-w-3xl sm:text-lg text-dark-200 prose py-10 px-2 xs:px-5 sm:p-x-10 mb-10">
        <h1 className="text-4xl xs:text-5xl sm:text-7xl font-bold font-serif ">
          Everyone has a story to tell.
        </h1>

        <p>
          {COMPANY_NAME} is a home for human stories and ideas. Here, anyone can
          share insightful perspectives, useful knowledge, and life wisdom with
          the world—without building a mailing list or a following first. The
          internet is noisy and chaotic; {COMPANY_NAME} is quiet yet full of
          insight. It&apos;s simple, beautiful, collaborative, and helps you
          find the right audience for whatever you have to say.
        </p>

        <p>
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we&apos;re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </p>

        <blockquote className="p-0 border-0">
          <span className="bg-black/15 text-lg xs:text-xl !leading-10 p-1 not-italic ">
            Ultimately, our goal is to deepen our collective understanding of
            the world through the power of writing.
          </span>
        </blockquote>

        <p>
          Over 100 million people connect and share their wisdom on{" "}
          {COMPANY_NAME} every month. Many are professional writers, but just as
          many aren&apos;t — they&apos;re CEOs, computer scientists, U.S.
          presidents, amateur novelists, and anyone burning with a story they
          need to get out into the world. They write about what they&apos;re
          working on, what&apos;s keeping them up at night, what they&apos;ve
          lived through, and what they&apos;ve learned that the rest of us might
          want to know too.
        </p>

        <p>
          Instead of selling ads or selling your data, we&apos;re supported by a
          growing community of {COMPANY_NAME} members who align with our
          mission. If you&apos;re new here, start exploring. Dive deeper into
          whatever matters to you. Find a post that helps you learn something
          new, or reconsider something familiar—and then share your own story.
        </p>
      </div>

      {[
        {
          name: "Start reading",
          url: "/",
        },
        {
          name: "Start writing",
          url: "/new-story",
        },
        {
          name: "Become a member",
          url: "/register",
        },
      ].map((link) => (
        <Link
          key={link.url}
          href={link.url}
          className="text-2xl xs:text-4xl md:text-6xl w-full py-10 px-5 md:px-10 border-y font-semibold font-serif text-dark-400 hover:bg-dark-400 hover:text-gray-50 hover:border-y-gray-100 transition-colors duration-150 delay-75 flex items-center justify-between first-letter:uppercase "
        >
          {link.name}
          <BsArrowRight />
        </Link>
      ))}
    </main>
  );
}
