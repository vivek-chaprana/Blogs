import EmptyScreen from "@/components/EmptyScreen";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import ResendPasswordResetEmailBtn from "@/components/sub-components/ResendPasswordResetEmailButton";
import Link from "next/link";
import { IoMailOpenOutline } from "react-icons/io5";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sent = !!searchParams.sent;
  const email = searchParams.email as string | undefined;

  if (sent && email)
    return (
      <main className="bg-dark-100 py-10 min-h-screen flex flex-col items-center justify-center px-2 xs:px-5 sm:px-0">
        <div className="max-w-md rounded-md">
          <EmptyScreen
            Icon={
              <IoMailOpenOutline className="text-gt inline-block h-10 w-10 stroke-[1.3px]" />
            }
            title="Check your email"
            description={`We've sent an email with a link to reset your password to your email ${
              email || ""
            } .`}
            Button={<ResendPasswordResetEmailBtn email={email} />}
          />
        </div>
        <div className="text-center text-gray-200 mt-3 ransition-all duration-75 hover:text-white">
          <Link href="/auth/login">Back to Login</Link>
        </div>
      </main>
    );

  return (
    <main className="bg-offWhite py-10 min-h-screen flex flex-col items-center justify-center px-2 xs:px-5 sm:px-0">
      <h1 className="text-3xl font-bold font-sans text-center capitalize">
        Forgot password
      </h1>
      <div className="my-8 sm:mx-auto w-full sm:max-w-md rounded-md border p-2 bg-white">
        <div className="rounded-md px-4 py-5 sm:px-10  ">
          <ForgotPasswordForm />
        </div>
      </div>
      <div className="text-center">
        <Link href="/auth/login">Back to Login?</Link>
      </div>
    </main>
  );
}
