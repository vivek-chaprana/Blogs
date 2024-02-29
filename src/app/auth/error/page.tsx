import { authOptions } from "@/lib/auth/auth-options";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Error | " + COMPANY_NAME,
};

export default async function AuthError() {
  const { user } = (await getServerSession(authOptions)) ?? {};

  if (user) redirect("/");

  return (
    <main className="max-w-6xl mx-auto min-h-screen">
      <section className="w-full min-h-screen sm:flex-1 px-5 lg:ps-10 xl:px-0 bg-white flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold text-red-700">
          Something went wrong!
        </h1>
        <p className="text-lg mt-3">
          We are sorry, but something went wrong. Please try singing in again.
        </p>

        <div className="flex justify-center gap-10 w-full my-10">
          <Button
            variant="bordered"
            className="border-gray-800 text-black"
            as={Link}
            href="/"
          >
            Homepage{" "}
          </Button>
          <Button
            as={Link}
            href="/auth/login"
            className="bg-dark-200 text-offWhite "
          >
            Login{" "}
          </Button>
        </div>
      </section>
    </main>
  );
}
