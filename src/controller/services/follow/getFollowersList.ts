import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getFollowersList = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { take, skip } = req.query;
  console.log("🚀 ~ file: getFollowersList.ts:11 ~ skip:", skip, take);

  try {
    const followers = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        followingIDs: true,
        followers: {
          select: {
            id: true,
            name: true,
            userName: true,
            imageUri: true,
            verified: true,
          },
          take: Number(take),
          skip: Number(skip),
        },
      },
    });
    if (followers) {
      const usersWithFollowStatus = followers.followers.map((user) => {
        const isFollowed = followers.followingIDs.includes(user.id);
        return { ...user, isFollowed };
      });
      return res.status(200).json(usersWithFollowStatus);
    }
  } catch (e) {
    next(e);
  }
};
