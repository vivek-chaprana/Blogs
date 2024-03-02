import ErrorBlock from "@/components/ErrorBlock";
import LoginForm from "@/components/LoginForm";
import OtherLogins from "@/components/OtherLogins";
import { authOptions } from "@/lib/auth/auth-options";
import { COMPANY_NAME } from "@/lib/constants";
import DividerWithText from "@/ui/DividerWithText";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | " + COMPANY_NAME,
  description:
    "Log in to your account on " + COMPANY_NAME + " and start writing.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = Array.isArray(searchParams.error)
    ? searchParams.error[0]
    : searchParams.error;

  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/");

  return (
    <main className="bg-offWhite py-10 min-h-screen px-2 xs:px-5 sm:px-0">
      <h1 className="text-3xl font-bold font-sans text-center">Welcome back</h1>
      <div className="mb-3 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-md border   p-2 bg-white">
        <div className="rounded-md px-4 py-5 sm:px-10  ">
          <LoginForm />
          {!!error && <ErrorBlock error={error} />}
          <div className="w-full text-left pt-2">
            <Link href="/auth/forgot-password">Forgot password ?</Link>
          </div>
        </div>
        <div className="my-3 px-6">
          {/* <Divider /> */}
          <DividerWithText text="OR" />
        </div>
        <OtherLogins />
      </div>
      <div className="text-center">
        <Link href="/register">Don&apos;t have an account ?</Link>
      </div>
    </main>
  );
}
