import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const postContent = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req?.user;
  const { audioUri, audioTitle, videoUri, videoTitle, photoUri, postText } =
    req.body;

  try {
    const post = await prisma.post.create({
      data: {
        userId: id,
        photoUri,
        audioTitle,
        audioUri,
        videoUri,
        videoTitle,
        postText,
      },
    });
    if (post) {
      res.json({ msg: "posted" });
    }
  } catch (e) {
    next(e);
  }
};
