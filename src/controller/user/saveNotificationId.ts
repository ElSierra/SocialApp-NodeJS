import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";

export const saveNotificationId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const notificationId = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        notificationId: req.body.notificationId,
      },
    });
    console.log(
      "🚀 ~ file: saveNotificationId.ts:18 ~ notificationId:",
      notificationId
    );
    if (notificationId) {
      return res.json({ msg: "notificationId saved" });
    }
  } catch (e) {
    next(e);
  }
};
