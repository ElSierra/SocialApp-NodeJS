import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getPostByFollowing = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { take, skip } = req.query;
  try {
    const followedUserIds = await prisma.user.findUnique({
      where: { id },
      select: { followingIDs: true },
    });

    if (followedUserIds) {
      const postsByFollowing = await prisma.post.findMany({
        where: {
          userId: {
            in: followedUserIds.followingIDs,
          },
        },
        select: {
          like: {
            select: {
              userId: true,
            },
          },
          createdAt: true,
          postText: true,
          audioTitle: true,
          audioUri: true,
          videoTitle: true,
          id: true,
          videoUri: true,
          photoUri: true,
          videoViews: true,
          userId: true,

          user: {
            select: {
              id: true,
              imageUri: true,
              name: true,
              userName: true,
              verified: true,
            },
          },
          _count: {
            select: {
              like: true,
              comments: true,
            },
          },
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        take: Number(take),
        skip: Number(skip),
      });

      if (postsByFollowing) {
        return res.status(200).json({ posts: postsByFollowing });
      }
    }
    return res.status(400).json({ msg: "Bad Request" });
  } catch (e) {
    next(e);
  }
};