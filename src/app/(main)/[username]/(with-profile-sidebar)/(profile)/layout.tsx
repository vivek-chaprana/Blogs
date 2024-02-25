import FollowButton from "@/components/sub-components/FollowButton";
import Tabs from "@/components/sub-components/Tabs";
import UnfollowButton from "@/components/sub-components/UnfollowButton";
import { authOptions } from "@/lib/auth/auth-options";
import { fallbackCoverImageUrl, fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
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
        <div className="flex flex-col justify-center gap-5">
          <div className="flex gap-5 xs:justify-between flex-col xs:flex-row xs:items-center">
            <div className="flex items-center gap-5">
              <Image
                className="w-12 xs:w-20 aspect-square"
                src={user.image ?? fallbackImageUrl}
                alt={user.name || user.username}
                radius="full"
              />
              <Link href={`/${user.username}`}>
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {user.name || "@" + user.username}
                </h1>
                {!!user.name && (
                  <h3 className="text-sm md:text-base">@{user.username}</h3>
                )}
              </Link>
            </div>

            <div className="flex  ">
              {session?.user.id &&
                user.id !== session.user.id &&
                (user.followedByIDs.includes(session.user.id) ? (
                  <UnfollowButton
                    followerId={session.user.id}
                    followingId={user.id}
                    color="danger"
                    variant="light"
                    radius="full"
                    className="w-min"
                  />
                ) : (
                  <FollowButton
                    followerId={session.user.id}
                    followingId={user.id}
                    color="success"
                    className="text-offWhite w-min"
                    radius="full"
                  />
                ))}

              <div className="ms-auto"></div>
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

          <div className="flex gap-2 items-center text-sm text-green-700  ">
            <Link
              className="hover:text-green-900 transition-colors duration-150"
              href={`${user.username}/followers`}
            >
              {user.followedByIDs.length} Followers
            </Link>
            <BsDot />
            <Link
              className="hover:text-green-900 transition-colors duration-150"
              href={`${user.username}/following`}
            >
              {user.followingIDs.length} Following
            </Link>
          </div>
        </div>
      </section>

      <div>
        {
          <div className="flex gap-5  text-sm border-b px-5 py-2">
            <Tabs
              base={params.username}
              links={[
                { name: "Home", url: "/" },
                { name: "About", url: "about" },
              ]}
              activeStyles="text-green-700 font-semibold"
            />
          </div>
        }
        <section className="p-5 ">{children}</section>
      </div>
    </div>
  );
}
