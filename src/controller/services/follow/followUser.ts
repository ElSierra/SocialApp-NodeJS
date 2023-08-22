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
      updateFollowerCounts(req.user.id)
        .then(() => console.log("Follower counts updated"))
        .catch((error) =>
          console.error("Error updating follower counts:", error)
        )
        updateFollowerCounts(req.query?.id)
        .then(() => console.log("Follower counts updated"))
        .catch((error) =>
          console.error("Error updating follower counts:", error)
        )
    }
    return res.status(200).json({
      msg: "followed",
    });
  } catch (e) {
    next(e);
  }
};
