import prisma from "../../lib/prisma/init";

export const deleteMessage = async (id: string, authUserId: string) => {
  try {
    const message = await prisma.message.delete({
      where: {
        id,
        
      },
    });
    if (message) {
      return message;
    }
  } catch (e) {
    return e;
  }
};
