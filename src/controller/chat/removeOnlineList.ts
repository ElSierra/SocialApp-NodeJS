import redis from "../../lib/redis/init";

export const removeFromRedis = async (id: string) => {
  try {
    // Remove all occurrences of the specified ID from the "online" list
    const removedCount = await redis.lrem("online", 0, id);
    console.log("🚀 ~ file: removeOnlineList.ts:7 ~ removeFromRedis ~ removedCount:", removedCount)
    if (removedCount) {
      const onlineList = await redis.lrange("online", 0, -1);
      console.log("🚀 ~ file: removeOnlineList.ts:10 ~ removeFromRedis ~ onlineList:", onlineList)
      return onlineList;
    }
 
  } catch (e) {
    return e;
  }
};
