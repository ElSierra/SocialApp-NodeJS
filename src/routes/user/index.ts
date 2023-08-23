import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { getUser } from "../../controller/user/getUser";
import { getFollows } from "../../controller/user/getFollows";

const router = Router();
router.get("/get-user", getUser);
router.get("/get-follows", getFollows);
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: true });
});

export default router;
