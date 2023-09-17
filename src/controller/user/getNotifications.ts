import { NextFunction } from "express";
import { Request, Response } from "express";
import prisma from "../../lib/prisma/init";
export const getNotifications = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user.id, "hjhj");
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        notifUser: {
          select: {
            userName: true,
            imageUri: true,
            id: true,
            name: true,
            verified: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (notifications) {
      return res.status(200).json({ notifications });
    }
  } catch (e) {
    next(e);
  }
};
