import { NextFunction, Response } from "express";
import prisma from "../../lib/prisma/init";

export const startChatSocket = async (
  authUserId: string,
  receiverId: string
) => {
  try {
    const existingChat = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [authUserId, receiverId],
            },
          },
          {
            userIds: {
              equals: [receiverId, authUserId],
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
                id: true,
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
      console.log("old chat");
      const users = existingChat[0].users.filter(
        (exChat) => exChat.id !== authUserId
      );
      const chat = { ...existingChat[0], users, isNew: false };
      return chat;
    }
    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: authUserId }, { id: receiverId }],
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
          select: {
            text: true,
            sender: {
              select: {
                id: true,
                userName: true,
              },
            },
            id: true,
            createdAt: true,
          },
        },
      },
    });
    console.log("new chat");
    const users = newChat.users.filter((exChat) => exChat.id !== authUserId);
    const chat = { ...newChat, users, isNew: true };
    return chat;
  } catch (e) {
    return e;
  }
};
