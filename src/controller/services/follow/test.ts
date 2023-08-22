import prisma from "../../../lib/prisma/init";
import { User } from "./../../../../node_modules/.prisma/client/index.d";
import { Response } from "express";

export const followUser = async () => {
  try {
    const userWithFollower = await prisma.user.update({
      where: {
        id: "64e3ee55944e422c92619985",
      },
      data: {
        followers: {
          connect: {
            id: "64e3eea6944e422c92619987",
          },
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

followUser()