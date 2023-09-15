import redis from "../../lib/redis/init";

export const getOnlineList = async () => {
  try {
    const onlineUsers = await redis.lrange("online", 0, -1);
    return onlineUsers;
  } catch (e) {
    return e;
  }
};
