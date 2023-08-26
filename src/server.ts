import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import notifier from "node-notifier";
import config from "./config";
console.log("🚀 ~ file: server.ts:6 ~ config:", config)

process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});
console.log(process.env.NODE_ENV)
app.listen(config.port, () => {
  console.log("🚀 Server Started @:", config.port);
  // notifier.notify({
  //   title: "Server started",
  //   message: Port.toString(),
  // });
});
