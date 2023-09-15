import prisma from "../../../lib/prisma/init";
import updateFollowerCounts from "../../../modules/socket/updateFollows";
import { User } from ".prisma/client";
import { NextFunction, Response } from "express";

export const unfollowUser = async (
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
          disconnect: {
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
        );
      updateFollowerCounts(req.query?.id)
        .then(() => console.log("Follower counts updated"))
        .catch((error) =>
          console.error("Error updating follower counts:", error)
        );
    }
    return res.status(200).json({
      msg: "unfollowed",
    });
  } catch (e) {
    next(e);
  }
};
