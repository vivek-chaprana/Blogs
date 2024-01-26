import OtherLoginsRegistrationPage from "@/components/OtherLoginsRegistrationPage";
import SignUpForm from "@/components/SignUpForm";
import DividerWithText from "@/ui/DividerWithText";
import { Divider } from "@nextui-org/react";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <main className="bg-ow py-10">
      <h1 className="text-3xl font-bold font-sans text-center">
        Create your account
      </h1>
      <div className="mb-3 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-md border p-2 bg-[#fff]">
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
  <div className="text-xs bg-g -m-2 mt-0  p-3">
    By signing up, you agree to our{" "}
    <Link className="hover:font-semibold hover:text-b transition-all" href="#">
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link className="hover:font-semibold hover:text-b transition-all" href="#">
      Privacy Policy
    </Link>
    .
    <br /> Need help?{" "}
    <Link className="hover:font-semibold hover:text-b transition-all" href="#">
      Get in touch
    </Link>
    .
  </div>
);

export default RegistrationPage;
