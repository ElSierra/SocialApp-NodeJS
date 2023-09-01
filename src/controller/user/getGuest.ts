import { Response, NextFunction } from "express";
import prisma from "../../lib/prisma/init";

export const getGuest = async (req: any, res: Response, next: NextFunction) => {
  console.log('CALLING GUEST')
  const { id } = req?.query;

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        followingIDs: true,
      },
    });
    if (!loggedInUser) {
      return res.json({ error: "error" });
    }
    const isFollowed = loggedInUser.followingIDs.includes(req.query.id);
    console.log("🚀 ~ file: getGuest.ts:20 ~ getGuest ~ isFollowed:", isFollowed)
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        followers: true,
        userName: true,
        followersCount: true,
        followingCount: true,
        email: true,
        following: true,
        verified: true,
        imageUri: true,

        emailIsVerified: true,
      },
    });
    if (user) {
      const {
        email,
        userName,
        imageUri,
        emailIsVerified,
        name,
        verified,
        followersCount,
        followingCount,
      } = user;
      return res.status(200).send({
        data: {
          email,
          userName,
          imageUri,
          emailIsVerified,
          verified,
          name,
          followersCount: followersCount?.toString(),
          followingCount: followingCount?.toString(),
          isFollowed,
        },
      });
    }
    res.status(404).json({ msg: "user doesnot exist" });
  } catch (e) {
    next(e);
  }
};
