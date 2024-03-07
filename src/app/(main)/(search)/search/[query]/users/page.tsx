import Await from "@/components/Await";
import UserCard from "@/components/UserCard";
import { UserCardSkeleton } from "@/components/skeleton";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function SearchUsers({
  params,
}: {
  params: { query: string };
}) {
  const { user } = (await getServerSession(authOptions)) ?? {};

  const promise = prisma.user.findMany({
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

  return (
    <div className="py-5">
      <Suspense
        fallback={new Array(5).fill(null).map((_, i) => (
          <div className="px-2 py-3 border-b last:border-b-0" key={i}>
            <UserCardSkeleton key={i} />
          </div>
        ))}
      >
        <Await promise={promise}>
          {(people) => (
            <>
              {!people.length ? (
                <div className="text-center text-xl my-5">No users found</div>
              ) : (
                people.map((person) => (
                  <div
                    className="px-2 py-3 border-b last:border-b-0"
                    key={person.id}
                  >
                    <UserCard user={person} signedInUserId={user?.id} />
                  </div>
                ))
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
