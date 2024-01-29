"use client";

import { providers } from "@/lib/constants";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OtherLoginsRegistrationPage = () => {
  const [isLoading, setIsLoading] = useState<{
    status: boolean;
    for: string | null;
  }>({ status: false, for: null });

  const handleLogin = async (provider: string) => {
    setIsLoading({ status: true, for: provider });
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      toast.error("Something went wrong, please try again later!");
    }
    setIsLoading({ status: false, for: null });
  };

  return (
    <div className="flex justify-evenly">
      <Button
        isLoading={isLoading.status && isLoading.for === providers.GOOGLE}
        isDisabled={isLoading.status}
        onClick={() => handleLogin(providers.GOOGLE)}
        startContent={<FcGoogle />}
        className="w-2/5 bg-white border "
      >
        Google
      </Button>
      <Button
        isLoading={isLoading.status && isLoading.for === providers.GITHUB}
        isDisabled={isLoading.status}
        onClick={() => handleLogin(providers.GITHUB)}
        startContent={<FaGithub fill="#6e5494" />}
        className="w-2/5 bg-white border"
      >
        Github
      </Button>
    </div>
  );
};

export default OtherLoginsRegistrationPage;
