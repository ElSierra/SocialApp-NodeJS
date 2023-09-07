import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";

export const startChat = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingChat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [req.user.id, req.body.userId],
            },
          },
          {
            userIds: {
              equals: [req.body.userId, req.user.id],
            },
          },
        ],
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
          select: {
            text: true,
            sender: {
              select: {
                userName: true,
              },
            },
            id: true,
            createdAt: true,
          },
        },
      },
    });
    if (existingChat[0]) {
      const users = existingChat[0].users.filter(
        (exChat) => exChat.id !== req.user.id
      );
      const chat = { ...existingChat[0], users };
      return res.status(200).json({ chat });
    }
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: req.user.id }, { id: "64e3f28156ebaa948e07da4f" }],
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    return res.json({ chat, });
  } catch (e) {
    next(e);
  }
};
