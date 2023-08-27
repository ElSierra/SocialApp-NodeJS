import { PrismaClient } from "@prisma/client";
import config from "../../config/env";

const prisma = new PrismaClient({
  log: config.stage === "local" ? [] : ["error"],
});

export default prisma;
