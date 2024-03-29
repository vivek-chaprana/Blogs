import Footer from "@/components/Footer";
import { authOptions } from "@/lib/auth/auth-options";
import { fallbackImageUrl } from "@/lib/constants";
import prisma from "@/prisma";
import { Image } from "@nextui-org/react";
import { User as PrismaUser } from "@prisma/client";
import { User as AuthUser, getServerSession } from "next-auth";
import Link from "next/link";
import FollowButton from "./sub-components/FollowButton";
import MyLink from "./sub-components/MyLink";
import UnfollowButton from "./sub-components/UnfollowButton";

export default async function ProfileSidebar({ user }: { user: PrismaUser }) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  return (
    <>
      <ProfileSection user={user} currentUser={currentUser} />
      {currentUser && <FollowingSection followings={user.followingIDs} />}
      <Footer />
    </>
  );
}

const ProfileSection = ({
  user,
  currentUser,
}: {
  user: PrismaUser;
  currentUser?: AuthUser;
}) => {
  return (
    <section className="flex flex-col gap-4">
      <Image
        src={user.image || fallbackImageUrl}
        alt="profile"
        width={75}
        height={75}
        className="rounded-full border "
      />
      <div>
        <h3 className="font-semibold">{user.name || "@" + user.username}</h3>
        <MyLink
          append
          href="followers"
          className="text-sm text-green-400 hover:text-green-700 "
        >
          {user.followedByIDs.length} Followers
        </MyLink>
      </div>

      {user.bio && <p className="text-sm">{user.bio}</p>}
      {currentUser &&
        user.id !== currentUser.id &&
        (user.followedByIDs.includes(currentUser.id) ? (
          <UnfollowButton
            followerId={currentUser.id}
            followingId={user.id}
            color="danger"
            variant="light"
            radius="full"
            className="w-min"
          />
        ) : (
          <FollowButton
            followerId={currentUser.id}
            followingId={user.id}
            color="success"
            className="text-offWhite w-min"
            radius="full"
          />
        ))}
    </section>
  );
};

const FollowingSection = async ({ followings }: { followings: string[] }) => {
  const followingUsers = await prisma.user.findMany({
    where: {
      id: {
        in: followings,
      },
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-semibold">Following</h3>

      {!!followings?.length ? (
        <>
          <div className="flex flex-col gap-2">
            {followingUsers.slice(0, 5).map((user) => (
              <Link
                href={`/${user.username}`}
                key={user.id}
                className="flex gap-3 items-center text-sm group "
              >
                <Image
                  src={user.image || fallbackImageUrl}
                  alt="profile"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                <p className="group-hover:underline underline-offset-2">
                  {user.name || "@" + user.username}
                </p>
              </Link>
            ))}
          </div>
          <MyLink
            append
            href="following"
            className="text-green-600 text-sm hover:text-green-800 transition-colors duration-150"
          >
            See all ({followingUsers.length})
          </MyLink>
        </>
      ) : (
        <p className="text-sm">No followings yet</p>
      )}
    </section>
  );
};
