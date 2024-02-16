"use server";
import prisma from "@/prisma";
import { User } from "@prisma/client";

export default async function getSomePeopleToFollow(selectedTopics: string[]) {
  let personWhoPostSelectedTopics: User[] = [];

  if (selectedTopics.length > 0)
    personWhoPostSelectedTopics = await prisma.user.findMany({
      where: {
        blogPost: {
          some: {
            topic: {
              id: {
                in: selectedTopics,
              },
            },
          },
        },
      },
      orderBy: {
        followedBy: {
          _count: "desc",
        },
      },
      take: 5,
    });

  if (personWhoPostSelectedTopics.length >= 5)
    return personWhoPostSelectedTopics;

  const famousPeople = await prisma.user.findMany({
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
    where: {
      id: {
        notIn: personWhoPostSelectedTopics.map((user) => user.id),
      },
    },
    take: 5 - personWhoPostSelectedTopics.length,
  });

  return [...personWhoPostSelectedTopics, ...famousPeople];
}
