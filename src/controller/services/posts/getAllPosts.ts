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
          where: {
            userId: req.user.id,
          },
        },
        photo: {
          select:{
            id:true,
            imageUri:true,
            imageHeight:true,
            imageWidth:true,
          }
        },
        
        link: {
          select: {
            id: true,
            imageHeight: true,
            imageUri: true,
            imageWidth: true,
            title: true,
          },
        },
        createdAt: true,
        postText: true,
        audioTitle: true,
        audioUri: true,
        videoTitle: true,
        id: true,
        videoUri: true,
        photoUri: true,
        videoViews: true,
        userId: true,
        videoThumbnail: true,
        

        repostUser: {
          select: {
            id: true,
          },
          where: {
            id: req.user.id,
          },
        },

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
            repostUser: true,
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

    if (posts) {
      return res.status(200).json({ posts });
    }

    throw new Error("Error in trying get posts");
  } catch (e) {
    next(e);
  }
};
