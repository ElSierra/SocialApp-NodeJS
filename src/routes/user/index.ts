import { NextFunction, Response, Router } from "express";

const router = Router();
router.get("/get-user", (req: any, res: Response, next: NextFunction) => {
  console.log(req?.user);
  res.json({ msg: "" });
});
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: false });
});
export default router;
