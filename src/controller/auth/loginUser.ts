import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";
import { compareHashedPassword, createJWT } from "../../middleware/auth";
export async function loginUser(req: any, res: Response, next: NextFunction) {
  const { userName, password } = req.body;
  console.log("🚀 ~ file: loginUser.ts:4 ~ createUser ~ req.body:", req.body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
      select: {
        password: true,
        id: true,
        emailIsVerified: true,
        email: true,
        name: true,
        userName: true,
        followers: true,
        following: true,
        imageUri: true,
      },
    });

    if (user) {
      const {
        email,
        userName,
        imageUri,
        emailIsVerified,
        name,
        followers,
        following,
      } = user;
      if (await compareHashedPassword(password, user.password)) {
        const token = createJWT({
          userName,
          id: user.id,
          verified: user.emailIsVerified,
        });
        return res.status(200).json({
          token,
          data: {
            email,
            userName,
            imageUri,
            emailIsVerified,
            name,
            followers,
            following,
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