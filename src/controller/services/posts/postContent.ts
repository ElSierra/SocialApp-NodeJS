import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
import validator from "validator";
import ogs from "open-graph-scraper";
import expo from "../../../lib/expo/init";
import { handleNotificationsForPosts } from "../../../modules/handleNotifications/forPosts";

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
    photo,
  }: {
    audioUri: string;
    audioTitle: string;
    videoUri: string;
    videoTitle: string;
    photoUri: string[];
    postText: string;
    videoThumbnail: string;
    photo: {
      uri: string;
      height: number;
      width: number;
    };
  } = req.body;
  console.log("body🚀", req.body);
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

  if (postText && validator.isURL(postText) === true) {
    console.log("reached after false");
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
            const signedInUser = await prisma.user.findUnique({
              where: { id },
              select: {
                userName: true,
                followers: { select: { notificationId: true } },
              },
            });
            for (let i in signedInUser?.followers) {
              expo.sendPushNotificationsAsync([
                {
                  to: signedInUser?.followers[Number(i)]
                    .notificationId as string,
                  sound: "default",
                  badge: 1,
                  mutableContent: true,
                  title: `@${signedInUser.userName}`,
                  body: `just posted`,
                  categoryId: "post",
                  data: {
                    postId: post.id,
                    url: `qui-ojo://posts/${post.id}`,
                  },
                },
              ]);
            }
            return res.json({ msg: "posted" });
          }
        }
        if (error) {
          console.log(error);
          const post = await prisma.post.create({
            data: {
              user: {
                connect: {
                  id,
                },
              },
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
            const signedInUser = await prisma.user.findUnique({
              where: { id },
              select: {
                userName: true,
                followers: { select: { notificationId: true } },
              },
            });
            for (let i in signedInUser?.followers) {
              expo.sendPushNotificationsAsync([
                {
                  to: signedInUser?.followers[Number(i)]
                    .notificationId as string,
                  sound: "default",
                  badge: 1,
                  mutableContent: true,
                  title: `@${signedInUser.userName}`,
                  body: `just posted`,
                  categoryId: "post",
                  data: {
                    postId: post.id,
                    url: `qui-ojo://posts/${post.id}`,
                  },
                },
              ]);
            }
            return res.json({ msg: "posted" });
          }
        }
      }
    } catch (e) {}
  } else {
    try {
      console.log("reached");
      const post = await prisma.post.create({
        data: {
          user: {
            connect: {
              id,
            },
          },
          photoUri,
          photo:
            photo?.height && photo?.uri && photo?.width
              ? {
                  create: {
                    imageHeight: photo.height,
                    imageUri: photo.uri,
                    imageWidth: photo.width,
                  },
                }
              : undefined,
          audioTitle,
          audioUri: audioUriUpdated(),
          videoUri: videoUriUpdated(),
          videoTitle,
          postText,
          videoThumbnail,
        },
      });
      if (post) {
        const signedInUser = await prisma.user.findUnique({
          where: { id },
          select: {
            userName: true,
            imageUri: true,
            followers: { select: { notificationId: true, id: true } },
          },
        });
        for (let i in signedInUser?.followers) {
          expo.sendPushNotificationsAsync([
            {
              to: signedInUser?.followers[Number(i)].notificationId as string,
              sound: "default",
              badge: 1,
              mutableContent: true,
              title: `@${signedInUser.userName}`,
              body: `just posted`,
              categoryId: "post",
              data: {
                postId: post.id,
                url: `qui-ojo://posts/${post.id}`,
              },
            },
          ]);
        }
        handleNotificationsForPosts(
          post.postText ? post?.postText : "New Media content",
          id,
          signedInUser?.imageUri as string,
          signedInUser?.followers,
          post.id
        ).then((e) => {
          console.log(e);
        });
        return res.json({ msg: "posted" });
      }
    } catch (e) {
      next(e);
    }
  }
};
