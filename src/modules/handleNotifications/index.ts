import prisma from "../../lib/prisma/init";

export const handleNotifications = async (
  text: string,
  userId: string,
  type: "Follow" | "Posts" | "Suggestions" | "Reminder",
  remindDate?: string,
  imageUri?: string,
  notifUserId?: string
) => {
  try {
    const notif = await prisma.notification.create({
      data: {
        text,
        type,
        remindDate,
        imageUri,
        userId,
        notifUserId,
      },
    });
    return notif;
  } catch (e) {
    return e;
  }
};
