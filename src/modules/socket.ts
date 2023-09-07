import { Socket, Server } from "socket.io";
import app from "../app";
import jwt from "jsonwebtoken";
import { userCollection } from "../lib/mongodb/init";
import { ChangeStream, ObjectId } from "mongodb";
import prisma from "../lib/prisma/init";
import { startChatSocket } from "../controller/chat/startChatSocket";
import { Chat } from "@prisma/client";
import { addMessages } from "../controller/chat/addMessages";
import { addToRedis } from "../controller/chat/addOnlineList";
import { removeFromRedis } from "../controller/chat/removeOnlineList";

const IO = new Server(app);

//TODO: CHANGE TO REDIS
const onlineUsers: Array<string> = [];

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

  if (user) {
    socket.data.userId = user.id;
    return next();
  }

  next(new Error("Not authorized"));
});
IO.on("connection", (socket) => {
  IO.emit("connected", { id: socket.data.userId });
});
IO.on("connection", async (socket) => {
  console.log(`⚡: ${socket.data.userId} user just connected!`);
  const id = socket.data.userId;

  // if (!isAlreadyLoaded) {
  //   onlineUsers.push(id);
  // }
  addToRedis(id)
    .then((r) => {
      IO.emit("online", r);
    })
    .catch((e) => {
      console.log(e);
    });

  socket.on("disconnect", async () => {
    socket.disconnect();
    removeFromRedis(id)
      .then((r) => {
        console.log("🚀 ~ file: socket.ts:61 ~ removeFromRedis ~ r:", r);
        IO.emit("online", r);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("🔥: A user disconnected");
  });
  socket.on("followedStatus", () => {
    console.log("yes");
    try {
      const changeStream = userCollection.watch([
        {
          $match: {
            "documentKey._id": new ObjectId(id),
          },
        },
      ]);

      changeStream.on("change", (change: any) => {
        if (change.updateDescription?.updatedFields?.followingCount) {
          //console.log(change); // Change object
          socket.emit(
            "following",
            change?.updateDescription?.updatedFields?.followingCount
          );
        }

        socket.emit(
          "followers",
          change?.updateDescription?.updatedFields?.followersCount
        );

        console.log(
          "🚀",
          change?.updateDescription?.updatedFields?.followingCount
        );
      });
    } catch (e) {}
  });
  socket.on("startChat", async (receiverId) => {
    try {
      const chat: any = await startChatSocket(id, receiverId);
      if (chat) {
        socket.emit("newChat", chat);
      }
    } catch (e) {}
  });

  socket.on("chat", async (id) => {
    console.log("🚀 ~ file: socket.ts:73 ~ socket.on ~ id:", id);
    socket.join(id);

    IO.to(id).emit("isOnline", { id, isOnline: true });
  });
  socket.on("newMessage", async (data) => {
    console.log("🚀 ~ file: socket.ts:76 ~ socket.on ~ data:", data);
    IO.to(data.chatId).emit("message", data);
    addMessages(data.message.text, data.chatId, data.id, id).then((e) => {});
  });
  socket.on("isTyping", async (chatId, isTyping) => {
    IO.to(chatId).emit("isTyping", { id, isTyping });
    console.log("🚀 ~ file: socket.ts:83 ~ socket.on ~ isTyping:", {
      id,
      isTyping,
    });
  });
});

export default IO;
