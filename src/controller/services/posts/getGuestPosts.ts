import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
export const getGuestPosts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { skip, take } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.query.id,
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
        link: {
          select: {
            id: true,
            imageHeight: true,
            imageUri: true,
            imageWidth: true,
            title: true,
          },
        },
        photo: {
          select: {
            id: true,
            imageUri: true,
            imageHeight: true,
            imageWidth: true,
          },
        },

        repostUser: {
          select: {
            id: true,
          },
          where: {
            id: req.user.id,
          },
        },

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
