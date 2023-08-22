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
        postText: { contains: q?.toString() },
      },
      orderBy: { id: "desc" },
      include: {
        user: {
          select: {
            name: true,
            userName: true,
            verified: true,
            imageUri: true,
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
