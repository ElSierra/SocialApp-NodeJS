import redis from "../../lib/redis/init";

export const addToRedis = async (id: string) => {
  try {
    // Check if the ID is already in the list
    const existingIds = await redis.lrange("online", 0, -1);

    if (!existingIds.includes(id)) {
      // If the ID is not in the list, add it
      const onlineUsers = await redis.rpush("online", id);
      if (onlineUsers) {
        const onlineUsers = await redis.lrange("online", 0, -1);
        return onlineUsers;
      }
    } else {
      console.log("👺👺👺👺👺 user exists")
      // If the ID is already in the list, return an error or handle it as needed
      return existingIds;
    }
  } catch (e) {
    return e;
  }
};
