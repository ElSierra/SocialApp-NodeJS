import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const postContent = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req?.user;
  const {
    audioUri,
    audioTitle,
    videoUri,
    videoTitle,
    photoUri,
    postText,
    videoThumbnail,
  }: {
    audioUri: string;
    audioTitle: string;
    videoUri: string;
    videoTitle: string;
    photoUri: string[];
    postText: string;
    videoThumbnail: string;
  } = req.body;

  const audioUriUpdated = () => {
    if (audioUri) {
      if (audioUri.startsWith("http")) {
        return audioUri;
      } else {
        return `https://${audioUri}`;
      }
    } else {
      return undefined;
    }
  };
  const videoUriUpdated = () => {
    if (videoUri) {
      if (videoUri.startsWith("http")) {
        return videoUri;
      } else {
        return `https://${videoUri}`;
      }
    } else {
      return undefined;
    }
  };

  try {
    const post = await prisma.post.create({
      data: {
        userId: id,
        photoUri,
        audioTitle,
        audioUri: audioUriUpdated(),
        videoUri: videoUriUpdated(),
        videoTitle,
        postText,
        videoThumbnail,
      },
    });
    if (post) {
      res.json({ msg: "posted" });
    }
  } catch (e) {
    next(e);
  }
};
