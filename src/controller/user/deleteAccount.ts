import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma/init";
import { compareHashedPassword } from "../../middleware/auth";

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const userAccount = await prisma.user.findUnique({
      where: {
        //@ts-ignore
        id: req.user.id,
      },
      select: {
        password: true,
      },
    });
    if (
      !(await compareHashedPassword(password, userAccount?.password as string))
    ) {
      return res.status(401).json({ msg: "invalid password" });
    }
    const user = await prisma.user.delete({
      where: {
        //@ts-ignore
        id: req.user.id,
      },
    });
    if (user) {
      res.json({ msg: "done" });
    }
  } catch (e) {
    next(e);
  }
};
