import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import multer from "multer";

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
        return res.status(500).json({ message: "Something went wrong" });
    }
    return;
  }
  if (error instanceof multer.MulterError) {
    // A Multer error occurred during file upload
    return res.status(400).json({ message: "Multer Error: " + error.message });
  } else {
    console.log(error);
    return res.status(500).json({ msg: "internal server error" });
  }
};
