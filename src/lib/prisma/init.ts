import { PrismaClient } from "@prisma/client";
import config from "../../config";

const prisma = new PrismaClient({
  log: config.stage === "local" ? ["error", "info", "query"] : ["error"],
});

export default prisma;
