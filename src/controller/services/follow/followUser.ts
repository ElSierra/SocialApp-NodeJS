import { query } from "express-validator";
import prisma from "../../../lib/prisma/init";
import updateFollowerCounts from "../../../modules/socket/updateFollows";
import { User } from "./../../../../node_modules/.prisma/client/index.d";
import { NextFunction, Response } from "express";
import Expo from "expo-server-sdk";
import expo from "../../../lib/expo/init";
import { handleNotifications } from "../../../modules/handleNotifications";
import { text } from "body-parser";

export const followUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id, email } = req.user;
  console.log("🚀 ~ file: followUser.ts:7 ~ followUser ~ id:", id);
  function isMultipleOf10(number: number) {
    return number % 10 === 0;
  }
  if (id === req.query.id) {
    return res.status(200).json({ msg: "can't follow self" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        followingIDs: true,
        notificationId: true,
      },
    });

    const followedUser = await prisma.user.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        followingIDs: true,
        notificationId: true,
      },
    });

    console.log("includes id", user?.followingIDs.includes(req.query.id));
    if (user?.followingIDs.includes(req.query.id)) {
      const userWithUnFollow = await prisma.user.update({
        where: {
          id,
        },
        data: {
          following: {
            disconnect: {
              id: req.query?.id,
            },
          },
        },
      });

      if (userWithUnFollow) {
        const userFollow = updateFollowerCounts(req.user.id);

        const guestFollow = updateFollowerCounts(req.query?.id);
        Promise.all([userFollow, guestFollow])
          .then((values) => {
            return res.status(200).json({
              msg: "unfollowed",
            });
          })
          .catch((e) => {
            return res.status(200).json({
              msg: "unfollowed",
            });
          });
      }
      return;
    } else {
      const userWithFollower = await prisma.user.update({
        where: {
          id,
        },
        data: {
          following: {
            connect: {
              id: req.query?.id,
            },
          },
        },
      });

      if (userWithFollower) {
        handleNotifications(
          `@${email} just followed you`,
          req.query.id,
          "Follow",
          undefined,
          undefined,
          id
        );
        if (
          isMultipleOf10((followedUser?.followingIDs?.length || 0) + 1) ||
          (followedUser?.followingIDs?.length || 0) <= 9
        ) {
          if (!Expo.isExpoPushToken(followedUser?.notificationId)) {
            return;
          }
          console.log("reached this point", followedUser?.notificationId);
          expo.sendPushNotificationsAsync([
            {
              to: followedUser?.notificationId as string,
              sound: "default",
              title: `+1 Follow`,
              body: `@${email} just followed you`,
              subtitle: "followed you",
            },
          ]);
        }
        const userFollow = updateFollowerCounts(req.user.id);

        const guestFollow = updateFollowerCounts(req.query?.id);
        Promise.all([userFollow, guestFollow])
          .then((values) => {
            return res.status(200).json({
              msg: "followed",
            });
          })
          .catch((e) => {
            return res.status(200).json({
              msg: "followed",
            });
          });
      }
    }
  } catch (e) {
    next(e);
  }
};
