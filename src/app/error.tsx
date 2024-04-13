"use client";

import Link from "next/link";

export default function Error() {
  return (
    <main className="h-screen grid place-items-center">
      <section className="flex flex-col gap-5 text-center max-w-3xl mx-auto py-10">
        <h1 className="text-4xl text-gray-500 font-serif">ERROR</h1>
        <p className="text-xl font-serif font-semibold">
          Something isn&apos;t quite right here.
        </p>
        <p className="text-base">
          Some error occurred. Please try again later or contact the support.
        </p>
        <Link
          href="/"
          className="underline underline-offset-1 text-green-700 hover:text-green-800"
        >
          Home
        </Link>
      </section>
    </main>
  );
}
