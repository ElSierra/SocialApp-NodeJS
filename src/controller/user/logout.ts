import { Response } from "express";
import { Request } from "express-validator/src/base";

export const logout = (req: Request, res: Response) => {
  req.session.destroy();
  res.json({ msg: "done" });
};
