import { NextFunction, Response, response } from "express";
import { CustomRequest } from "../../types/request";
import prisma from "../../lib/prisma/init";

export const getChatList = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatList = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: req.user.id,
          },
        },
      },
      select: {
        id: true,

        users: {
          select: {
            userName: true,
            name: true,
            imageUri: true,
            id: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          select: {
            text: true,
            photoUri: true,
            photo: {
              select: {
                id: true,
                imageHeight: true,
                imageUri: true,
                imageWidth: true,
              },
            },
            sender: {
              select: {
                userName: true,
                id: true,
              },
            },
            id: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (chatList) {
      res.status(200).json({
        chatList,
      });
    }
  } catch (e) {
    next(e);
  }
};
