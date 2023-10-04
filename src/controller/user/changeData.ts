import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma/init";
import {
  compareHashedPassword,
  createHashedPassword,
} from "../../middleware/auth";

export const changeData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const { id } = req.user;
    const { password, userName, newPassword, name } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (user) {
      if (await compareHashedPassword(password, user.password)) {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: name || undefined,
            password: newPassword
              ? await createHashedPassword(newPassword)
              : undefined,
            userName: userName ? userName.trim() : undefined,
          },
        });
        if (updatedUser) {
          return res.status(200).json({ msg: "success" });
        }
      }
      return res.status(401).json({ msg: "Invalid password" });
    }
  } catch (e) {
    return next(e);
  }
};
