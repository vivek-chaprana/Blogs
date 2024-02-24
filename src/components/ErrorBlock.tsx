"use client";

import getAuthErrorMessages from "@/lib/auth/getAuthErrorMessages";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ErrorBlock({ error }: { error: string }) {
  const [show, setShow] = useState(true);

  const errorDetails = getAuthErrorMessages(error);

  if (!show) return null;
  return (
    <div className="w-full p-3 my-3 rounded-lg border-offWhite bg-red-300/35">
      <div className="flex justify-between">
        <h3 className="font-semibold ">{errorDetails.title}</h3>
        <Button
          isIconOnly
          onClick={() => setShow(false)}
          aria-label="Close"
          size="sm"
          variant="light"
          color="danger"
        >
          <RxCross2 className="text-red-700 text-lg" />
        </Button>
      </div>
      <p className="text-sm text-default-500">{errorDetails.message}</p>
    </div>
  );
}
