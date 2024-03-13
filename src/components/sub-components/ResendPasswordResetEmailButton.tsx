"use client";

import { sendPasswordResetEmail } from "@/lib/actions/auth";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ResendPasswordResetEmailBtn({
  email,
}: {
  email: string;
}) {
  const handleResendEmail = async () => {
    try {
      await sendPasswordResetEmail({
        email,
      });
      toast.success("Email sent successfully.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };
  return <Button onClick={handleResendEmail}>Resend Email</Button>;
}
