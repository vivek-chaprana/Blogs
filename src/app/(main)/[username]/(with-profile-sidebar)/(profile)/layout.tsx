import ProfileTabs from "@/components/sub-components/ProfileTabs";
import { authOptions } from "@/lib/auth/auth-options";
import { fallbackCoverImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaEdit, FaShare } from "react-icons/fa";

export default async function UserProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  const session = await getServerSession(authOptions);
  const username = session?.user?.username;

  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className=" ">
      {/* Cover Image */}
      <div className="flex items-center justify-center">
        <Image
          src={user.coverImage || fallbackCoverImageUrl}
          alt="Cover Image"
          radius="none"
        />
      </div>

      <section className="p-5 my-5">
        {/* Main profile */}
        <div className="flex items-center justify-between">
          <Link href={`/${user.username}`}>
            <h1 className="text-4xl font-bold text-gray-900">
              {user.name || "@" + user.username}
            </h1>
            {!!user.name && <h3>@{user.username}</h3>}
          </Link>
          <div className="flex gap-5">
            {username === params.username && (
              <Tooltip content="Edit Profile" closeDelay={0}>
                <Button as={Link} href="/settings" variant="light" isIconOnly>
                  <FaEdit className="text-dark-200 text-lg" />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Share Profile" closeDelay={0}>
              <Button variant="light" color="success" isIconOnly>
                <FaShare className="text-teal-700 text-lg" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </section>

      <div>
        {
          <ProfileTabs
            username={params.username}
            links={[
              { name: "Home", url: "/" },
              { name: "About", url: "about" },
            ]}
          />
        }
        <section className="p-5 ">{children}</section>
      </div>
    </div>
  );
}
