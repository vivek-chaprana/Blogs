import EmptyScreen from "@/components/EmptyScreen";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import prisma from "@/prisma";
import { Button } from "@nextui-org/react";
import { compare } from "bcrypt";
import Link from "next/link";
import { FaExclamation } from "react-icons/fa";

export default async function ResetPasswordPage({
  params,
}: {
  params: {
    token: string;
    email: string;
  };
}) {
  const { token, email } = params;

  if (!token || !email) return ErrorPage();

  const foundToken = await prisma.resetToken.findFirst({
    where: {
      identifier: decodeURIComponent(email),
    },
  });

  if (!foundToken) return ErrorPage();

  const isTokenValid = await compare(token, foundToken.token);

  if (!isTokenValid) return ErrorPage();

  return (
    <main className="bg-offWhite py-10 min-h-screen flex flex-col items-center justify-center px-2 xs:px-5 sm:px-0">
      <h1 className="text-3xl font-bold font-sans text-center capitalize">
        Reset your password
      </h1>
      <div className="my-8 sm:mx-auto w-full sm:max-w-md rounded-md border p-2 bg-white">
        <div className="rounded-md px-4 py-5 sm:px-10  ">
          <ResetPasswordForm email={decodeURIComponent(email)} />
        </div>
      </div>
      <div className="text-center">
        <Link href="/auth/login">Back to Login?</Link>
      </div>
    </main>
  );
}

function ErrorPage() {
  return (
    <main className="bg-dark-100 py-10 min-h-screen flex flex-col items-center justify-center px-2 xs:px-5 sm:px-0">
      <div className="max-w-md ">
        <EmptyScreen
          Icon={
            <FaExclamation className="text-red-500 inline-block h-10 w-10 stroke-[1.3px] opacity-65" />
          }
          title="Something went wrong!"
          description="The link is invalid or expired. Please try again."
          Button={
            <Button
              className="font-medium"
              as={Link}
              href="/auth/forgot-password"
            >
              Forgot Password
            </Button>
          }
        />

        <div className="text-gray-300 backdrop-blur-md rounded-md py-3 text-center">
          If you think this is a mistake, please{" "}
          <Link
            href="/contact"
            className="text-gray-200 underline underline-offset-2"
          >
            Contact Support
          </Link>{" "}
          .
        </div>
      </div>
    </main>
  );
}
