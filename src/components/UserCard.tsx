import { fallbackImageUrl } from "@/lib/constants";
import { Image } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";
import FollowButton from "./sub-components/FollowButton";
import UnfollowButton from "./sub-components/UnfollowButton";

export default function UserCard({
  user,
  signedInUserId,
}: {
  user: User;
  signedInUserId?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <Link href={`/${user.username}`} className="flex items-center gap-5">
        <Image
          className="min-w-[50px] h-[50px] xs:w-auto aspect-square shrink-0 "
          src={user.image || fallbackImageUrl}
          alt={user.username}
          radius="full"
        />

        <div className="flex flex-col justify-center gap-2 shrink ">
          <h3 className="font-semibold">{user.name || "@" + user.username}</h3>
          {user.bio && <p className="text-sm line-clamp-2">{user.bio}</p>}
        </div>
      </Link>

      {signedInUserId &&
        signedInUserId !== user.id &&
        (user.followedByIDs.includes(signedInUserId) ? (
          <UnfollowButton
            radius="full"
            className="text-offWhite bg-red-500 ms-3"
            followerId={signedInUserId}
            followingId={user.id}
          />
        ) : (
          <FollowButton
            radius="full"
            className="text-offWhite bg-dark-200 ms-3 "
            followerId={signedInUserId}
            followingId={user.id}
          />
        ))}
    </div>
  );
}
