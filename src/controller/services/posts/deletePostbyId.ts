import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const deletePostById = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user;

  try {
    const postsToDelete = await prisma.post.delete({
      where: {
        id: req.body?.id,
        userId: id,
      },
    });
    if (postsToDelete) {
      res.json({ msg: "Post deleted" });
    }
  } catch (e) {
    next(e);
  }
};
