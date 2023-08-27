import { Response, NextFunction } from "express";
import prisma from "../../lib/prisma/init";

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req?.user;

  try {
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
        followersCount,
        followingCount,
      } = user;
      return res.status(200).send({
        data: {
          email,
          userName,
          imageUri,
          emailIsVerified,
          name,
          followersCount:followersCount?.toString(),
          followingCount:followingCount?.toString(),
        },
      });
    }
    res.status(404).json({ msg: "user doesnot exist" });
  } catch (e) {
    next(e);
  }
};
