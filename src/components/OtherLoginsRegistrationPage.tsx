"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OtherLoginsRegistrationPage = () => {
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
    <div className="flex justify-evenly">
      <Button
        onClick={handleLogin}
        isLoading={isLoading}
        startContent={<FcGoogle />}
        className="w-2/5 bg-w border "
      >
        Google
      </Button>
      <Button
        onClick={handleLogin}
        isLoading={isLoading}
        startContent={<FaGithub fill="#6e5494" />}
        className="w-2/5 bg-w border"
      >
        Github
      </Button>
    </div>
  );
};

export default OtherLoginsRegistrationPage;
