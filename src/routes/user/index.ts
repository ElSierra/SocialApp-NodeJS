import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { getUser } from "../../controller/user/getUser";
import { getFollows } from "../../controller/user/getFollows";
import config from "../../config/env";
import { upload, uploadOcean } from "../../config/multer";
import { updatePhoto } from "../../controller/user/updatePhoto";
import { getGuest } from "../../controller/user/getGuest";
import { saveNotificationId } from "../../controller/user/saveNotificationId";

const isProduction = config.stage === "production";
const router = Router();
router.get("/get-user", getUser);
router.get("/get-guest", getGuest);
router.get("/get-follows", getFollows);
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: true });
});
router.post(
  "/update-photo",
  isProduction && uploadOcean
    ? uploadOcean.single("photo")
    : upload.single("photo"),
  updatePhoto
);
router.put("/update-notification-id", saveNotificationId);
export default router;
