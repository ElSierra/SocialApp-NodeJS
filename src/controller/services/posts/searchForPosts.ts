import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const searchForPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.query;
  console.log("🚀 ~ file: searchForPosts.ts:10 ~ q:", q);

  try {
    const posts = await prisma.post.findMany({
      where: {
        postText: { contains: q?.toString(), mode: "insensitive" },
      },
      orderBy: { id: "desc" },
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

        repostUser: {
          select: {
            id: true,
          },
          where: {
            //@ts-ignore
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
      take: 15,
    });
    if (posts) {
      return res.status(200).json({ posts });
    }
    res.status(404).json({ posts: [], msg: "Not Found" });
  } catch (e) {
    next(e);
  }
};
