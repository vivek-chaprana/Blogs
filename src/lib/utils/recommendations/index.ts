import prisma from "@/prisma";
import { PostStatus } from "@prisma/client";

export async function getTopPicks({
  userId,
  take,
}: {
  userId: string;
  take?: number;
}) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followingTopics: true,
      following: true,
      likedBlogPosts: true,
    },
  });

  const likedBlogPostsTopics = await prisma.blogPost.findMany({
    where: {
      id: {
        in: currentUser?.likedBlogPosts.map((blog) => blog.id),
      },
    },
    select: {
      topicID: true,
    },
  });

  const interestedTopics = Array.from(
    new Set<string>([
      ...likedBlogPostsTopics.map((blog) => blog.topicID),
      ...(currentUser ? currentUser?.followingTopicIDs : []),
    ])
  );

  const recommendations = await prisma.blogPost.findMany({
    where: {
      topicID: {
        in: interestedTopics,
      },
      authorId: {
        not: userId,
        in: currentUser?.following.map((user) => user.id),
      },
      status: PostStatus.PUBLISHED,
    },
    take,
    include: {
      author: true,
      topic: true,
    },
  });

  if (take && recommendations.length < take) {
    const remaining = await prisma.blogPost.findMany({
      orderBy: {
        likedByUsers: {
          _count: "desc",
        },
      },
      include: {
        author: true,
        topic: true,
      },
      where: {
        status: PostStatus.PUBLISHED,
        id: {
          notIn: recommendations.map((blog) => blog.id),
        },
      },
      take: take - recommendations.length,
    });

    return [...recommendations, ...remaining];
  }

  return recommendations;
}

export async function getPeopleRecommendations({
  userId,
  take,
}: {
  userId: string;
  take?: number;
}) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followingTopics: true,
    },
  });

  const recommendations = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
        notIn: currentUser?.followingIDs,
      },
      blogPost: {
        some: {
          topicID: {
            in: currentUser?.followingTopics.map((topic) => topic.id),
          },
        },
      },
    },
    take,
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
  });

  if (take && recommendations.length < take)
    return [
      ...recommendations,
      ...(await prisma.user.findMany({
        where: {
          followedBy: {
            none: {
              id: userId,
            },
          },
          id: {
            notIn: [userId, ...recommendations.map((user) => user.id)],
          },
        },
        orderBy: {
          followedBy: {
            _count: "desc",
          },
        },
        take: take - recommendations.length,
      })),
    ];

  return recommendations;
}

export async function getTopicsRecommendations({
  userId,
  take,
}: {
  userId: string;
  take?: number;
}) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followingTopics: true,
      following: true,
      likedBlogPosts: true,
      blogPost: {
        select: {
          topicID: true,
        },
      },
    },
  });

  const followingsTopics = await prisma.user.findMany({
    where: {
      id: {
        in: currentUser?.followedByIDs,
      },
    },
    select: {
      followingTopicIDs: true,
    },
  });

  const followingsTopicIds = followingsTopics
    .map((user) => user.followingTopicIDs)
    .flat();

  const blogPostTopicIds = currentUser?.blogPost.map((blog) => blog.topicID);
  const likedBlogPostsTopicIds = currentUser?.likedBlogPosts.map(
    (blog) => blog.topicID
  );

  const interestedTopics = Array.from(
    new Set([
      ...followingsTopicIds,
      ...(blogPostTopicIds || []),
      ...(likedBlogPostsTopicIds || []),
    ])
  );

  const recommendations = await prisma.topic.findMany({
    where: {
      id: {
        in: interestedTopics,
        notIn: currentUser?.followingTopicIDs,
      },
    },
    take,
    include: {
      BlogPost: {
        include: {
          _count: true,
        },
      },
      users: {
        include: {
          _count: true,
        },
      },
    },
  });

  if (take && recommendations.length < take) {
    return {
      recommendations: [
        ...recommendations,
        ...(await prisma.topic.findMany({
          where: {
            id: {
              notIn: [...recommendations.map((topic) => topic.id)],
            },
          },
          orderBy: {
            BlogPost: {
              _count: "desc",
            },
          },
          take: take - recommendations.length,
          include: {
            BlogPost: {
              include: {
                _count: true,
              },
            },
            users: {
              include: {
                _count: true,
              },
            },
          },
        })),
      ],
    };
  }

  return { recommendations, currentUser };
}
