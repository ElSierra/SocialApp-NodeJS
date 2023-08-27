import { Socket } from "socket.io";
import app from "../app";
import jwt from "jsonwebtoken";
import { userCollection } from "../lib/mongodb/init";
import { ChangeStream, ObjectId } from "mongodb";
const socketIO = require("socket.io")(app);

socketIO.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
  socket.on("auth", (token: string) => {
    const user: any = jwt.verify(token, process.env.SECRET || "");
    console.log("🚀 ~ file: socket.ts:15 ~ socket.on ~ user:", user);

    try {
      const changeStream = userCollection.watch([
        {
          $match: {
            "documentKey._id": new ObjectId(user.id),
          },
        },
      ]);

      changeStream.on("change", (change: any) => {
        console.log("🚀 ~ file: socket.ts:47 ~ changeStream.on ~ change:", change)
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
});

export default socketIO;
