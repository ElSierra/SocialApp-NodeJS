import { query } from "express-validator";
import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const rePost = async (req: any, res: Response, next: NextFunction) => {
  try {
    const repostUserId = await prisma.post.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        repostUserId: true,
      },
    });
    if (repostUserId?.repostUserId.includes(req.user.id)) {
      const postToAdd = await prisma.post.update({
        where: {
          id: req.query.id,
        },
        data: {
          repostUser: {
            disconnect: {id: req.user.id},
          },
        },
      });

      if (postToAdd) {
        return res.status(200).json({
          msg: "repost removed",
        });
      }
      return res.status(400).json({
        msg: "failed",
      });
    } else {
      const postToAdd = await prisma.post.update({
        where: {
          id: req.query.id,
        },
        data: {
          repostUser: {
            connect: {id: req.user.id},
          },
        },
      });
      if (postToAdd) {
        return res.status(200).json({
          msg: "successfully reposted",
        });
      }
      return res.status(400).json({
        msg: "failed",
      });
    }
  } catch (e) {
    next(e);
  }
};
