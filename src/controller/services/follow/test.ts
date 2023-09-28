import prisma from "../../../lib/prisma/init";
import { User } from "./../../../../node_modules/.prisma/client/index.d";
import { Response } from "express";

export const followUser = async () => {
  try {
    const userWithFollower = await prisma.post.deleteMany({
      where: {
        photoUri: {
          isEmpty: false,
        },
      },
    });
    console.log(
      "🚀 ~ file: followUser.ts:21 ~ followUser ~ userWithFollower:",
      userWithFollower
    );
  } catch (e) {
    console.log(e);
  }
};

followUser();
