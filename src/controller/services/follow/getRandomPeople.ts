import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getRandomFollowers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: { id: "desc" },
      select: {
        name: true,
        userName: true,
        id: true,
        imageUri: true,
      },
      take: 15,
    });
    let uniqueNumbers: Array<number> = [];
    const loggedInUser = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        followingIDs: true,
      },
    });
    let updatedUsers: Array<{
      id: string;
      userName: string;
      isFollowed: boolean;
      imageUri: string | null;
    }> = [];

    if (loggedInUser) {
      const usersWithFollowStatus = allUsers.map((user) => {
        const isFollowed = loggedInUser.followingIDs.includes(user.id);
        return { ...user, isFollowed };
      });
      //console.log("🚀 ~ file: getRandomPeople.ts:41 ~ usersWithFollowStatus ~ usersWithFollowStatus:", loggedInUser.followingIDs)

      updatedUsers = usersWithFollowStatus;
    }

    if (allUsers.length > 2) {
      const numbers = Array.from({ length: allUsers.length - 1 }, (_, i) => i); // Create an array of numbers from 0 to 9
      const shuffledNumbers = numbers.sort(() => Math.random() - 0.5); // Shuffle the array
      uniqueNumbers = shuffledNumbers.slice(0, 3);
    } else if (allUsers.length === 2) {
      uniqueNumbers = [0, 1];
    } else if (allUsers.length === 1) {
      uniqueNumbers = [0];
    }
    const randomPeople: Array<{
      id: string;
      userName: string;
      isFollowed: boolean;
      imageUri: string | null;
    }> = [];

    for (let i in uniqueNumbers) {
      const filteredPeople = updatedUsers.filter(
        (posts, idx) => idx == uniqueNumbers[i] && posts.id !== req.user.id
      );
      randomPeople.push(...filteredPeople);
    }
  
    return res.status(200).json({ people: randomPeople });
  } catch (e) {
    next(e);
  }
};
