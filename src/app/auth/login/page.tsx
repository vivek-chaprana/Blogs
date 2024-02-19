import LoginForm from "@/components/LoginForm";
import OtherLogins from "@/components/OtherLogins";
import DividerWithText from "@/ui/DividerWithText";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="bg-offWhite py-10">
      <h1 className="text-3xl font-bold font-sans text-center">Welcome back</h1>
      <div className="mb-3 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-md border   p-2 bg-white">
        <div className="rounded-md px-4 py-5 sm:px-10  ">
          <LoginForm />
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
