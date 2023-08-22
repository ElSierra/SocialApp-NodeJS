import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma/init";
import { createHashedPassword } from "../../middleware/auth";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    email,
    password,
    userName,
  }: { name: string; email: string; password: string; userName: string } =
    req.body;

  const formattedUserName = userName.toLowerCase();
  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: await createHashedPassword(password),
        email,
        userName: formattedUserName,
      },
    });

    if (user) {
      return res.status(200).json({ msg: "Account created" });
    }
    return res.status(400).json({ msg: "error" });
  } catch (e: any) {
    next(e);
    // if (e?.meta?.target === "User_email_key") {
    //   return res.status(401).json({ msg: "Email exists" });
    // }
    // if (e?.meta?.target === "User_userName_key") {
    //   return res.status(401).json({ msg: "UserName exists" });
    // }
    // return res.status(400).json({ msg: e });
  }
}
