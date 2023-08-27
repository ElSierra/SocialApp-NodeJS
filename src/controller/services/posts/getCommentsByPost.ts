import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getCommentByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: id?.toString(),
      },
      select: {
        id: true,
        comment:true,
        createdAt:true,
        User: {
          select: {
            verified: true,
            imageUri: true,
            name: true,
            id: true,
            userName: true,
          },
        },
      },
    });

    if (comment) {
      res.json({ comment });
    }
  } catch (e) {
    next(e);
  }
};
