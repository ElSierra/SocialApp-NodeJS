import prisma from "../../lib/prisma/init";

export const handleNotificationsForPosts = async (
  text: string,
  userId: string,
  imageUri: string,

  notifUserIds: { id: string; notificationId: string | null }[] | undefined,
  postId?: string
) => {
  try {
    if (!notifUserIds) {
      return;
    }
    const notif = await prisma.notification.createMany({
      data: notifUserIds?.map((notifUserId) => ({
        text,
        to: postId,
        type: "Posts",
        imageUri,
        userId: notifUserId.id,
        notifUserId: userId,
      })),
    });
    return notif;
  } catch (e) {
    return e;
  }
};
