import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { startChat } from "../../controller/chat/startChat";
import { getChatList } from "../../controller/chat/getChatList";
import { getMessageList } from "../../controller/chat/getMessageList";

const router = Router();
router.get("/", (req) => {
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
});
router.post("/startChat", startChat);
router.get("/get-all-chats", getChatList)
router.get("/get-all-messages", getMessageList)
export default router;
