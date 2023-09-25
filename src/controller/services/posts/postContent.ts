import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
import validator from "validator";
import ogs from "open-graph-scraper";

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
  if (validator.isURL(postText)) {
    try {
      const options = { url: postText };

      const data = await ogs(options);
      if (data) {
        const { error, html, result, response } = data;
        if (result) {
          console.log("🚀 ~ file: postContent.ts:60 ~ result:", result);
          //@ts-ignore

          const results = result.ogImage
            ? result?.ogImage?.length >= 1
              ? result?.ogImage[0]
              : undefined
            : undefined;

          const title = result?.ogTitle;
          console.log("reached here after");
          const post = await prisma.post.create({
            data: {
              user: {
                connect: {
                  id,
                },
              },
              postText,
              link: {
                create: {
                  imageHeight: results?.height
                    ? Number(results?.height)
                    : undefined,
                  imageWidth: results?.width
                    ? Number(results?.width)
                    : undefined,
                  imageUri: results?.url ? results?.url : undefined,
                  url: postText,
                  title,
                },
              },
            },
          });
          if (post) {
            return res.json({ msg: "posted" });
          }
        }
      }
    } catch (e) {}
  } else {
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
        return res.json({ msg: "posted" });
      }
    } catch (e) {
      next(e);
    }
  }
};
