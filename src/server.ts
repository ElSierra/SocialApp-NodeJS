import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import notifier from "node-notifier";
import config from "./config/env";
import { Socket } from "socket.io";
import io from "./modules/socket/socket";
import IO from "./modules/socket/socket";
import redis from "./lib/redis/init";

process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});
console.log(process.env.NODE_ENV);
IO;
redis
  .flushdb()
  .then(() => {
    console.log("Database flushed.");
  })
  .catch((err) => {
    console.error("Error flushing database:", err);
  });
app.listen(config.port, () => {
  console.log("🚀 Server Started @:", config.port);
});
