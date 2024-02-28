import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import GetInTouch from "@/components/GetInTouch";
import { authOptions } from "@/lib/auth/auth-options";
import { Input } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

export default async function Help() {
  const session = await getServerSession(authOptions);
  return (
    <main className="">
      <section className="py-10 flex flex-col gap-5 max-w-4xl mx-auto  ">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center">
          How can we help you ?
        </h1>
        <p className=" text-sm xs:text-base text-center text-gray-500 ">
          Welcome to our Help Center! Discover comprehensive solutions and
          guides for everything from account setup to advanced features. If you
          have any questions or require assistance, our dedicated support team
          is at your service.
        </p>

        <div className="flex flex-col items-center gap-5 py-10">
          <Input
            className="w-4/5 xs:w-3/6"
            placeholder="Search all queries here"
            startContent={<BsSearch className="text-xl" />}
            radius="full"
          />
          <p className="text-sm text-center px-2 xs:px-0 ">
            Most Visited :{" "}
            {[
              {
                name: "FAQs",
                url: "#faqs",
              },
              {
                name: "Get in touch",
                url: "#get-in-touch",
              },
              {
                name: "Contact us",
                url: "#contact-us",
              },
              {
                name: "Privacy Policy",
                url: "#",
              },
              {
                name: "Terms of Service",
                url: "#",
              },
            ].map((topic, index) => (
              <Link
                key={index}
                href={topic.url}
                className="hover:underline underline-offset-1 hover:text-dark-200"
              >
                {topic.name + (index === 4 ? "." : ", ")}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <section
        id="faqs"
        className="py-10 flex flex-col gap-10  mx-auto max-w-4xl "
      >
        <h1 className="text-2xl xs:text-3xl font-bold font-serif -ms-10 ">
          Frequently Asked Questions
        </h1>
        <div
          className=" bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border p-5 border-dark-200
"
        >
          <FaqAccordion />
        </div>
      </section>

      <GetInTouch />

      <ContactForm user={session?.user} />
    </main>
  );
}
