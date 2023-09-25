import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";
import { compareHashedPassword, createJWT } from "../../middleware/auth";
import { Request } from "express-validator/src/base";
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, password }: { userName: string; password: string } =
    req.body;
  const formattedUserName = userName.toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: formattedUserName,
      },
      select: {
        password: true,
        id: true,
        emailIsVerified: true,
        email: true,
        name: true,
        verified: true,
        userName: true,
        followersCount: true,
        followingCount: true,
        imageUri: true,
      },
    });

    if (user) {
      const {
        email,
        userName,
        imageUri,
        verified,
        emailIsVerified,
        name,
        followersCount,
        id,
        followingCount,
      } = user;
      if (await compareHashedPassword(password, user.password)) {
        const token = createJWT({
          userName,
          id: user.id,
          verified: user.emailIsVerified,
        });
        req.session.token = token;
        return res.status(200).json({
          token,
          data: {
            email,
            userName,
            imageUri,
            emailIsVerified,
            name,
            id,
            verified,
            followersCount: followersCount?.toString(),
            followingCount: followingCount?.toString(),
          },

          msg: "login success",
        });
      }
      return res
        .status(401)
        .json({ msg: "User Name or Password is incorrect" });
    }
    return res.status(401).json({ msg: "User Name or Password is incorrect" });
  } catch (e: any) {
    next(e);
  }
}
