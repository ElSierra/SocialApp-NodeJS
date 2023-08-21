import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/prisma/init";

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
            verified:true,
            imageUri: true,
          },
        },
      },
    });
    let uniqueNumbers: Array<number> = [];

    if (posts.length > 2) {
      const numbers = Array.from({ length: posts.length - 1 }, (_, i) => i); // Create an array of numbers from 0 to 9
      const shuffledNumbers = numbers.sort(() => Math.random() - 0.5); // Shuffle the array
      uniqueNumbers = shuffledNumbers.slice(0, 3);
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
    console.log(
      "🚀 ~ file: getRandomPosts.ts:23 ~ randomPostToSend:",
      randomPostToSend
    );
    return res.status(200).json({ posts: randomPostToSend });
  } catch (e) {
    next(e);
  }
};
