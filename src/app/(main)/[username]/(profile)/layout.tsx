import { fallbackCoverImageUrl } from "@/lib/constants";
import { Button, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { FaEdit, FaShare } from "react-icons/fa";

export default function UserProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <div className=" ">
      {/* Cover Image */}
      <Image src={fallbackCoverImageUrl} alt="Cover Image" radius="none" />

      <section className="p-5 my-5">
        {/* Main profile */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Vivek Chaprana</h1>
            <h3>@vivekchaprana</h3>
          </div>
          <div className="flex gap-5">
            <Tooltip content="Edit Profile" closeDelay={0}>
              <Button variant="light" isIconOnly>
                <FaEdit className="text-dark-200 text-lg" />
              </Button>
            </Tooltip>
            <Tooltip content="Share Profile" closeDelay={0}>
              <Button variant="light" color="success" isIconOnly>
                <FaShare className="text-teal-700 text-lg" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </section>

      <div>
        <div className="flex gap-5  text-sm border-b px-5 py-2">
          <Button
            className="capitalize"
            as={Link}
            href={`/${params.username}`}
            variant="light"
          >
            Home
          </Button>
          <Button
            className="capitalize"
            as={Link}
            href={`/${params.username}/about`}
            variant="light"
          >
            About
          </Button>
        </div>
        <section className="p-5">{children}</section>
      </div>
    </div>
  );
}
