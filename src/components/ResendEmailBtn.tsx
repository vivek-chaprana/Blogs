"use client";

import resendVerificationEmail from "@/lib/actions/auth/resendVerificationEmail";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ResendEmailBtn({ email }: { email: string }) {
  const handleResendEmail = async () => {
    try {
      const res = await resendVerificationEmail({ email });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Email sent successfully.");

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }

  };
  return <Button onClick={handleResendEmail}>Resend Email</Button>;
}
