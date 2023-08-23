import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma/init";

export const getFollows = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        followersCount: true,
        followingCount: true,
      },
    });
    if (user) {
      res.json({
        following: user.followingCount?.toString(),
        followers: user.followersCount?.toString(),
      });
    }
  } catch (e) {
    next(e);
  }
};
