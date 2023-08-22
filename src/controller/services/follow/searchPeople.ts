import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const searchPeople = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.query;
  console.log("🚀 ~ file: searchForPosts.ts:10 ~ q:", q);

  try {
    const people = await prisma.user.findMany({
      where: {
        OR: [
          { userName: { contains: q?.toString(), mode: "insensitive" } },

          { name: { contains: q?.toString(), mode: "insensitive" } },
        ],
      },
      select: {
        name: true,
        userName: true,
        id: true,
        imageUri: true,
      },
      orderBy: { id: "desc" },
      take: 15,
    });
    const loggedInUser = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        followingIDs: true,
      },
    });
    let updatedUsers: Array<{
      id: string;
      userName: string;
      isFollowed: boolean;
      imageUri: string | null;
    }> = [];

    if (loggedInUser) {
      const usersWithFollowStatus = people.map((user) => {
        const isFollowed = loggedInUser.followingIDs.includes(user.id);
        return { ...user, isFollowed };
      });
      console.log(
        "🚀 ~ file: getRandomPeople.ts:41 ~ usersWithFollowStatus ~ usersWithFollowStatus:",
        loggedInUser.followingIDs
      );

      updatedUsers = usersWithFollowStatus;
    }

    if (people) {
      console.log("🚀 ~ file: searchPeople.ts:30 ~ people:", updatedUsers);
      return res.status(200).json({ people: updatedUsers });
    }
    res.status(404).json({ people: [], msg: "Not Found" });
  } catch (e) {
    next(e);
  }
};
