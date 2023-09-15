import prisma from "../../lib/prisma/init";

export default async function updateFollowerCounts(userId: string) {
  const followersCount = await prisma.user.count({
    where: { following: { some: { id: userId } } },
  });
  console.log(
    "🚀 ~ file: updateFollows.ts:7 ~ updateFollowerCounts ~ followersCount:",
    followersCount
  );

  const followingCount = await prisma.user.count({
    where: { followers: { some: { id: userId } } },
  });
  console.log(
    "🚀 ~ file: updateFollows.ts:12 ~ updateFollowerCounts ~ followingCount:",
    followingCount
  );

  await prisma.user.update({
    where: { id: userId },
    data: { followersCount, followingCount },
  });
}
