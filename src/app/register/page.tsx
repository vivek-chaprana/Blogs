import OtherLoginsRegistrationPage from "@/components/OtherLoginsRegistrationPage";
import SignUpForm from "@/components/SignUpForm";
import { COMPANY_NAME } from "@/lib/constants";
import DividerWithText from "@/ui/DividerWithText";
import { Divider } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | " + COMPANY_NAME,
  description:
    "Create your account on " + COMPANY_NAME + " and join the community.",
};

const RegistrationPage = () => {
  return (
    <main className="bg-offWhite py-10 min-h-screen px-2 xs:px-5 sm:px-0">
      <h1 className="text-3xl font-bold font-sans text-center">
        Create your account
      </h1>
      <div className="mb-3 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-md border  p-2 bg-white">
        <div className="rounded-md px-4 py-5 sm:px-10  ">
          <SignUpForm />
        </div>
        <div className="my-3 px-6">
          <DividerWithText text="OR CONTINUE WITH" />
        </div>
        <OtherLoginsRegistrationPage />
        <Divider className="my-3" />
        <TermsAndConditions />
      </div>
      <div className="text-center"></div>
    </main>
  );
};

const TermsAndConditions = () => (
  <div className="text-xs bg-gr -m-2 mt-0  p-3">
    By signing up, you agree to our{" "}
    <Link
      className="hover:font-semibold hover:text-b transition-all"
      href="/terms-and-conditions"
    >
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link
      className="hover:font-semibold hover:text-b transition-all"
      href="/privacy-policy"
    >
      Privacy Policy
    </Link>
    .
    <br /> Need help?{" "}
    <Link
      className="hover:font-semibold hover:text-b transition-all"
      href="/contact"
    >
      Get in touch
    </Link>
    .
  </div>
);

export default RegistrationPage;
