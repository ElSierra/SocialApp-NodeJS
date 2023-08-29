import { query } from "express-validator";
import prisma from "../../../lib/prisma/init";
import updateFollowerCounts from "../../../modules/updateFollows";
import { User } from "./../../../../node_modules/.prisma/client/index.d";
import { NextFunction, Response } from "express";

export const followUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  console.log("🚀 ~ file: followUser.ts:7 ~ followUser ~ id:", id);

  if (id === req.query.id) {
    return res.status(200).json({ msg: "can't follow self" });
  }

  try {
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
  } catch (e) {
    next(e);
  }
};
