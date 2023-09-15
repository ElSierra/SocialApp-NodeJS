import prisma from "../../lib/prisma/init";

export const getReceiverNotificationToken = async (
  chatId: string,
  authUserId: string
) => {
  try {
    const userIds = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        userIds: true,
      },
    });
    if (userIds) {
      const userId = userIds?.userIds.find((id) => id !== authUserId);
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          notificationId: true,
        },
      });
      if (user) {
        return {notificationId: user.notificationId, userId}
      }
    }
  } catch (e) {
    return e;
  }
};
