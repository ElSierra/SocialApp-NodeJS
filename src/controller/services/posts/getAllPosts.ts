import { like } from "./likePost";
import prisma from "../../../lib/prisma/init";
import { NextFunction, Request, Response } from "express";

export const getAllPosts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log("my user id is", req.user.id);
  const { take, skip } = req.query;
  try {
    const posts = await prisma.post.findMany({
      select: {
        like: {
          select: {
            userId: true,
          },
        },
        postText: true,
        audioTitle: true,
        audioUri: true,
        videoTitle: true,
        id: true,
        videoUri: true,
        photoUri: true,
        videoViews: true,
        userId: true,
        user: {
          select: {
            id: true,
            imageUri: true,
            name: true,
            userName: true,
            verified: true,
          },
        },
        _count: {
          select: {
            like: true,
            comments: true,
          },
        },
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      take: Number(take),
      skip: Number(skip),
    });
    console.log("🚀 ~ file: getAllPosts.ts:36 ~ posts:", posts[9]);
    if (posts) {
      const updatedPosts = [];

      for (let i in posts) {
        updatedPosts.push({
          ...posts[i],
          isLiked: posts[i].like.some((i) => i.userId === req.user.id),
        });
      }

      console.log("🚀 ~ file: getAllPosts.ts:55 ~ updatedPosts:", updatedPosts);
      return res.status(200).json({ posts: updatedPosts });
    }

    throw new Error("Error in trying get posts");
  } catch (e) {
    next(e);
  }
};
