"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function OtherLogins() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="grid gap-4 px-6 py-7">
      <Button
        isLoading={isLoading}
        className=" border bg-w"
        onClick={handleLogin}
      >
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button
        isLoading={isLoading}
        className=" border bg-w"
        onClick={handleLogin}
      >
        <BsGithub />
        Sign in with Github
      </Button>
    </div>
  );
}
