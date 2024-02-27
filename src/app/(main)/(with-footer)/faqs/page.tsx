import FaqAccordion from "@/components/FaqAccordion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Faqs() {
  return (
    <main>
      <section className="py-10 flex flex-col gap-10 max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold ">Frequently Asked Questions</h1>
        <div
          className="max-w-3xl mx-auto bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border p-5 border-dark-200
"
        >
          <FaqAccordion />
        </div>
      </section>

      <div className="w-full bg-gray-100 text-center flex flex-col justify-center items-center text-3xl font-serif py-10 gap-5">
        <h2>Can&apos; find what you&apos;re looking for ?</h2>
        <Button as={Link} href="/contact" className="text-white bg-dark-200 ">
          Submit a request
        </Button>
      </div>
    </main>
  );
}
