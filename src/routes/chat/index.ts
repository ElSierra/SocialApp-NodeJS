import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { startChat } from "../../controller/chat/startChat";
import { getChatList } from "../../controller/chat/getChatList";

const router = Router();
router.get("/", (req) => {
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
});
router.post("/startChat", startChat);
router.get("/get-all-chats", getChatList)
export default router;
