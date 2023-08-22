import prisma from "../lib/prisma/init";

export default async function updateFollowerCounts(userId: string) {
  const followersCount = await prisma.user.count({
    where: { following: { some: { id: userId } } }
  });

  const followingCount = await prisma.user.count({
    where: { followers: { some: { id: userId } } }
  });

  await prisma.user.update({
    where: { id: userId },
    data: { followersCount, followingCount }
  });
}


