import prisma from "../../lib/prisma/init";

export const addMessages = async (
  text: string,
  chatId: string,
  id: string,
  senderId: string
) => {
  try {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    console.log("🚀 ~ file: addMessages.ts:18 ~ chat:", chat);
    const messages = await prisma.message.create({
      data: {
        text,
        id,
        sender: { connect: { id: senderId } },
        chat: { connect: { id: chatId } },
      },
    });
    console.log("🚀 ~ file: getMessages.ts:16 ~ messages:", messages);
  } catch (e) {}
};
