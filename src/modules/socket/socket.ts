import { Socket, Server } from "socket.io";
import app from "../../app";
import jwt from "jsonwebtoken";
import { userCollection } from "../../lib/mongodb/init";
import { ChangeStream, ObjectId } from "mongodb";

import { startChatSocket } from "../../controller/chat/startChatSocket";

import { deleteMessage } from "../../controller/chat/deleteMessage";
import { addPhoto } from "../../controller/chat/addPhoto";

import { newMessage } from "./newMessage";
import { onlineState } from "../onlineUsers";
import { followStatusEmit } from "./followStatus";

const IO = new Server(app);

//TODO: CHANGE TO REDIS

IO.use((socket, next) => {
  const token = socket.handshake?.auth?.token;
  console.log(
    "🚀 ~ file: socket.ts:17 ~ IO.use ~ token:",
    socket.handshake?.auth
  );
  if (!token) {
    return next(new Error("Not authorized"));
  }
  const user: any = jwt.verify(token, process.env.SECRET || "");
  console.log("🚀 ~ file: socket.ts:33 ~ IO.use ~ user:", user);

  if (user) {
    socket.data.userId = user.id;
    socket.data.userName = user.email;
    return next();
  }

  next(new Error("Not authorized"));
});

IO.on("connection", async (socket) => {
  console.log(`⚡: ${socket.data.userId} user just connected!`);
  const id = socket.data.userId;
  const userName = socket.data.userName;
  socket.emit("connected", socket.data.userId);
  socket.join(id);

  // if (!isAlreadyLoaded) {
  //   onlineUsers.push(id);
  // }

  onlineState.addValue(id);
  IO.emit("online", onlineState.getValues());

  socket.on("disconnect", async () => {
    socket.disconnect();
    onlineState.deleteValue(id);
    IO.emit("online", onlineState.getValues());
    console.log("🔥: A user disconnected");
  });
  socket.on("followedStatus", () => {
    followStatusEmit(id, socket);
  });
  socket.on("startChat", async (receiverId) => {
    try {
      socket.join(receiverId);
      const chat: any = await startChatSocket(id, receiverId);
      console.log("🚀 ~ file: socket.ts:102 ~ socket.on ~ id:", id);
      if (chat) {
        IO.to(receiverId).emit("newChat", chat);
      }
    } catch (e) {}
  });

  socket.on("chat", async (id) => {
    console.log("🚀 ~ file: socket.ts:73 ~ socket.on ~ id:", id);
    socket.join(id);

    IO.to(id).emit("isOnline", { id, isOnline: true });
  });
  socket.on(
    "newMessage",
    async (data: { message: { text: string }; chatId: string; id: string }) => {
      newMessage(data, socket, id, userName);
    }
  );
  socket.on("newPhoto", async (data) => {
    console.log("🚀 ~ file: socket.ts:76 ~ socket.on ~ data:", data);
    IO.to(data.chatId).emit("message", data);
    socket.emit("sent", true);
    addPhoto(data.message.photoUri, data.chatId, data.id, id)
      .then((e) => {})
      .catch((e) => {});
  });
  socket.on("deleteMessage", async (messageId) => {
    console.log("🚀 ~ file: socket.ts:124 ~ socket.on ~ messageId:", messageId);
    deleteMessage(messageId, id)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  socket.on("initChat", (id) => {
    console.log("🚀 ~ file: socket.ts:142 ~ socket.on ~ id:", id);
    socket.join(id);
    socket.emit("initChat", { id });
  });
  socket.on("isTyping", async (chatId, isTyping) => {
    IO.to(chatId).emit("isTyping", { id, isTyping });
    console.log("🚀 ~ file: socket.ts:83 ~ socket.on ~ isTyping:", {
      id,
      isTyping,
    });
  });
  socket.on("away", () => {
    console.log(`${id} is now away`);
    onlineState.deleteValue(id);
    IO.emit("online", onlineState.getValues());
  });
  socket.on("online", () => {
    console.log(`${id} is now online`);
    onlineState.addValue(id);
    IO.emit("online", onlineState.getValues());
  });
});

export default IO;
