import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export const createHashedPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const compareHashedPassword = (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};

export const createJWT = (user: {
  userName: string;
  id: string;
  verified: boolean;
}) => {
  const token = jwt.sign(
    { email: user.userName, id: user.id, verified: user.verified },

    process.env.SECRET || "",
  );

  return token;
};

export const createEmailJWT = (email: string) => {
  const token = jwt.sign(
    { email },

    process.env.SECRET || "",
    { expiresIn: "1h" }
  );

  return token;
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ msg: "invalid token" });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET || "");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ msg: "invalid token" });
  }
};

export const blockJWT = async (req: any, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  console.log(bearer);
  const tokenFromSession = req.session.token;
  console.log(
    "🚀 ~ file: index.ts:68 ~ blockJWT ~ tokenFromSession:",
    tokenFromSession
  );
  if (!tokenFromSession) {
    return res.status(401).json({ msg: "Session Expired" });
  }
  if (!bearer) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ msg: "invalid token" });
  }
  if (token !== tokenFromSession) {
    return res.status(401).json({ msg: "invalid token" });
  }
  next();
};

export const checkVerified = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { verified } = req.user;
  if (verified) {
    next();
  } else {
    return res.status(401).json({ msg: "User not verified" });
  }
};
