import prisma from "../../../lib/prisma/init";
import { NextFunction, Request, Response } from "express";

export const getAllPosts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {id}= req.user
  try {
    const posts = await prisma.user.findMany({
      where:{
        id
      },
      select:{
        following:{
         
        }
      }
    })
    if (posts) {
      return res.json({ posts });
    }
    throw new Error("Error in trying get posts");
  } catch (e) {
    next(e);
  }
};
