import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const postComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { comment, id } = req.body;

  try {
    const commentPost = await prisma.comment.create({
      data: {
        comment,
        postId: id,
        userId: req.user.id,
      },
    });
    console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", commentPost)
    if (comment) return res.json({ msg: "commented" });
  } catch (e) {
    next(e);
  }
};
