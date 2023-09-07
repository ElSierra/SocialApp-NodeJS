import prisma from "../../lib/prisma/init";

export const addMessages = async (
  text: string,
  chatId: string,
  id: string,
  senderId: string
) => {
  try {
    const messages = await prisma.message.create({
      data: {
        text,
        id,
        senderId,
        chatId,
      },
    });
    console.log("🚀 ~ file: getMessages.ts:16 ~ messages:", messages);
  } catch (e) {}
};
