import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { getUser } from "../../controller/user/getUser";

const router = Router();
router.get("/get-user", getUser);
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: true });
});

export default router;
