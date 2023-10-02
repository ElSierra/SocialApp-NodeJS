import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
export const getSinglePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        like: {
          select: {
            userId: true,
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
        link: {
          select: {
            id: true,
            imageHeight: true,
            imageUri: true,
            imageWidth: true,
            title: true,
          },
        },
        _count: {
          select: {
            like: true,
            comments: true,
          },
        },
      },
    });
    console.log("🚀 ~ file: getMyPosts.ts:55 ~ posts:", posts);
    if (posts) {
      res.status(200).json({ posts });
    }
  } catch (e) {
    next(e);
  }
};
