import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";

const router = Router();
router.get("/get-user", (req: any, res: Response, next: NextFunction) => {
  const { userName } = req?.user;
  try {
    prisma.user.findUnique({
      where: {
        userName,
      },
      select: {
        name: true,
        followers: true,
        userName: true,

        email: true,
        following: true,
        imageUri: true,
        emailIsVerified: true,
      },
    });
  } catch (e) {}
  res.json({ msg: "" });
});
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: true });
});

export default router;
