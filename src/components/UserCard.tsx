import { fallbackImageUrl } from "@/lib/constants";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";

export default function UserCard() {
  return (
    <div className="flex justify-between items-center">
      <Link href="#" className="flex items-center gap-5">
        <Image
          src={fallbackImageUrl}
          width={75}
          height={75}
          alt="username"
          radius="full"
        />

        <div className="flex flex-col justify-center gap-2">
          <h3 className="font-semibold">Lorem, ipsum.</h3>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur,
            numquam! Perspiciatis cupiditate odio tenetur dolores?
          </p>
        </div>
      </Link>
      <Button radius="full" className="text-offWhite bg-dark-200 ms-6">
        Follow
      </Button>
    </div>
  );
}
