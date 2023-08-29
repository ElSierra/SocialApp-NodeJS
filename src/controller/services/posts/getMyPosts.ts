import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
export const getMyPosts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { skip, take } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
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
    console.log("🚀 ~ file: getMyPosts.ts:55 ~ posts:", posts);
    if (posts) {
      res.status(200).json({ posts });
    }
  } catch (e) {
    next(e);
  }
};
