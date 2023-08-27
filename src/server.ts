import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import notifier from "node-notifier";
import config from "./config/env";
import { Socket } from "socket.io";
import io from "./modules/socket";
import socketIO from "./modules/socket";

process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});
console.log(process.env.NODE_ENV);
socketIO;
app.listen(config.port, () => {
  console.log("🚀 Server Started @:", config.port);
});
