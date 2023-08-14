import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import notifier from "node-notifier";

const Port = process.env.PORT || 80;
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

app.listen(Port, () => {
  console.log("🚀 Server Started @:", Port);
  // notifier.notify({
  //   title: "Server started",
  //   message: Port.toString(),
  // });
});
