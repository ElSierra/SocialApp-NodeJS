import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Response, Request } from "express";


export const ErrorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        const keyName = error.meta?.target as string;
        const formattedKeyName = keyName.split("_")[1];
        console.log("🚀 ~ file: HandleErrors.ts:17 ~ keyName:", keyName);
        res.status(400).json({ message: `${formattedKeyName} already exists` });
        break;
      case "P2010":
        res.status(400).json({ message: "The name is required" });
        break;

      default:
        res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(500).json({ msg: "internal server error" });
  }
};
