import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getFollowingList = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { take, skip } = req.query;

  try {
    const following = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        following: {
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
    if (following) {
      return res.status(200).json(following.following);
    }
  } catch (e) {
    next(e);
  }
};
