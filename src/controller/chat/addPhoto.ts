import prisma from "../../lib/prisma/init";

export const addPhoto = async (
  photo: {
    height: number;
    width: number;
    uri: string;
  },
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
        id,
        sender: {
          connect: { id: senderId },
        },
        photo:
          photo?.height && photo?.uri && photo?.width
            ? {
                create: {
                  imageHeight: photo.height,
                  imageUri: photo.uri,
                  imageWidth: photo.width,
                },
              }
            : undefined,
        chat: {
          connect: { id: chatId },
        },
      },
    });
    console.log("🚀 ~ file: getMessages.ts:16 ~ messages:", messages);
  } catch (e) {}
};
