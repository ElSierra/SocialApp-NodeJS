import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getRandomPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: "desc" },
      include: {
        user: {
          select: {
            name: true,
            userName: true,
            verified: true,
            imageUri: true,
          },
        },
      },
      take:20,
    });
    let uniqueNumbers: Array<number> = [];

    if (posts.length > 2) {
      const numbers = Array.from({ length: posts.length }, (_, i) => i);
      const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
      uniqueNumbers = shuffledNumbers.slice(0, posts.length );
    } else if (posts.length === 2) {
      uniqueNumbers = [0, 1];
    } else if (posts.length === 1) {
      uniqueNumbers = [0];
    }
    const randomPostToSend = [];
   
    for (let i in uniqueNumbers) {
      const filteredPosts = posts.filter(
        (posts, idx) => idx == uniqueNumbers[i]
      );
      randomPostToSend.push(...filteredPosts);
    }
    
    return res.status(200).json({ posts: randomPostToSend });
  } catch (e) {
    next(e);
  }
};
