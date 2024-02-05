import EmptyScreen from "@/components/EmptyScreen";
import ResendEmailBtn from "@/components/ResendEmailBtn";
import { authOptions } from "@/lib/auth/auth-options";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const success = searchParams.success;

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const email = user?.email ?? searchParams.email;

  if (user && user?.emailVerified) {
    redirect("/");
  }

  return (
    <main className="bg-dark-100 w-full h-screen ">
      <section className="flex h-full w-full flex-col items-center justify-center">
        <div className="max-w-3xl">
          {!!success || user?.isVerified ? (
            <EmptyScreen
              Icon={
                <FaCheck className="text-green-600 inline-block h-10 w-10 stroke-[1.3px] opacity-65 " />
              }
              title="Email verified successfully!"
              description={`Your email ${email ?? ""} has been verified.`}
              Button={
                <Button as={Link} href="/getting-started">
                  Continue
                </Button>
              }
            />
          ) : !!email ? (
            <EmptyScreen
              Icon={
                <IoMailOpenOutline className="text-gt inline-block h-10 w-10 stroke-[1.3px]" />
              }
              title="Check your email"
              description={`We've sent an email to ${
                email || "your email"
              }. It is important to verify your email addreess to gaurantee the best experience of our app.`}
              Button={<ResendEmailBtn email={email} />}
            />
          ) : (
            <EmptyScreen
              Icon={
                <RxCross1 className="text-red-500 inline-block h-10 w-10 stroke-[1.3px] opacity-65" />
              }
              title="Something went wrong!"
              description="The email you provided is invalid. Please try again."
              Button={
                <Button as={Link} href="/auth/login">
                  Login again
                </Button>
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}
