import Loading from "@/components/Loading";
import UserCard from "@/components/UserCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function Following({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      following: true,
    },
  });

  if (!user) return null;
  return (
    <div className="p-4">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold">
        {user.following.length} Following
      </h1>

      <div className="flex flex-col gap-5 py-10">
        {!!user.following.length ? (
          user.following.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              signedInUserId={session.user.id}
            />
          ))
        ) : (
          <p>No following yet</p>
        )}
      </div>

      <Loading />
    </div>
  );
}
