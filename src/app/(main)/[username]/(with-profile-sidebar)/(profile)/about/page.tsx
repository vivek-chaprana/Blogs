import prisma from "@/prisma";
import { useRadio } from "@nextui-org/react";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

export default async function ProfileAbout({
  params,
}: {
  params: { username: string };
}) {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
  });

  if (!user) return null;

  return (
    <div className="my-5">
      {/* About */}
      {user.bio && <div className="text-sm">{user.bio}</div>}

      {/* Footer */}
      <div className="flex flex-col py-5 gap-5">
        <p className="text-sm">Member since {formatDate(user.createdAt)}.</p>
        <span className="flex gap-2 items-center text-sm text-green-700 ">
          <Link
            className="hover:text-green-900 transition-colors duration-150"
            href="followers"
          >
            {user.followingIDs.length} Followers
          </Link>
          <BsDot />
          <Link
            className="hover:text-green-900 transition-colors duration-150"
            href="following"
          >
            {user.followedByIDs.length} Following
          </Link>
        </span>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
