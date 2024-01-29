"use client";

import { providers } from "@/lib/constants";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function OtherLogins() {
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
    <div className="grid gap-4 px-6 py-7">
      <Button
        isLoading={isLoading.status && isLoading.for === providers.GOOGLE}
        isDisabled={isLoading.status}
        onClick={() => handleLogin(providers.GOOGLE)}
        className=" border border-default bg-white"
      >
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button
        isLoading={isLoading.status && isLoading.for === providers.GITHUB}
        isDisabled={isLoading.status}
        onClick={() => handleLogin(providers.GITHUB)}
        className=" border border-default bg-white"
      >
        <BsGithub />
        Sign in with Github
      </Button>
    </div>
  );
}
