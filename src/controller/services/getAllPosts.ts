import prisma from "../../lib/prisma/init";
import { NextFunction, Request, Response } from "express";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            imageUri: true,
            name: true,
            userName:true,
            verified: true,
          },
        },
      },
      orderBy: [
        {
          id: 'desc'
        }
      ]
    });
    if (posts) {
      return res.json({ posts });
    }
    throw new Error("Error in trying get posts");
  } catch (e) {
    next(e);
  }
};
