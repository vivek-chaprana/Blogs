import UserCard from "@/components/UserCard";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";

export default async function SearchUsers({
  params,
}: {
  params: { query: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const people = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: params.query,
            mode: "insensitive",
          },
        },
      ],
      id: {
        not: user?.id,
      },
    },
  });

  if (!people.length)
    return <div className="text-center text-xl my-10">No users found</div>;

  return (
    <div className="py-5">
      {people.map((person) => (
        <div className="px-2 py-3 border-b last:border-b-0" key={person.id}>
          <UserCard user={person} signedInUserId={user?.id} />
        </div>
      ))}
    </div>
  );
}
