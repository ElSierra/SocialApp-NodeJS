import { NextFunction, Response, response } from "express";
import { CustomRequest } from "../../types/request";
import prisma from "../../lib/prisma/init";

export const getMessageList = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatList = await prisma.chat.findUnique({
      where: {
        id: req.query.id,
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
            photo:true,
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
    });
    if (chatList) {
      const users = chatList.users.filter((users) => users.id !== req.user.id);
      const newChatList = { ...chatList, users };
      res.status(200).json({
        chatList: newChatList,
      });
    }
  } catch (e) {
    next(e);
  }
};
