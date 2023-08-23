import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";
import { compareHashedPassword, createJWT } from "../../middleware/auth";
export async function loginUser(req: any, res: Response, next: NextFunction) {
  const { userName, password }:{userName:string,password:string} = req.body;
  const formattedUserName = userName.toLowerCase();
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName:formattedUserName,
      },
      select: {
        password: true,
        id: true,
        emailIsVerified: true,
        email: true,
        name: true,
        userName: true,
        followersCount:true,
        followingCount:true,
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
        followersCount,
        followingCount,
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
            followersCount:followersCount?.toString(),
            followingCount:followingCount?.toString(),
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
