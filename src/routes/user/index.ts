import { NextFunction, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { getUser } from "../../controller/user/getUser";
import { getFollows } from "../../controller/user/getFollows";
import config from "../../config/env";
import { upload, uploadOcean } from "../../config/multer";
import { updatePhoto } from "../../controller/user/updatePhoto";
import { getGuest } from "../../controller/user/getGuest";
import { saveNotificationId } from "../../controller/user/saveNotificationId";
import { getNotifications } from "../../controller/user/getNotifications";
import { profilePhotoUpload } from "../../modules/handlePhotoUpload/profilePhotoUpload";
import { getFollowersList } from "../../controller/services/follow/getFollowersList";
import { getFollowingList } from "../../controller/services/follow/getFollowingList";
import { handleErrors } from "../../middleware/validation/handleErrors";
import { followerFollowingValidator } from "../../middleware/validation/inputValidation";

const isProduction = config.stage === "production";
const router = Router();
router.get("/get-user", getUser);
router.get("/get-guest", getGuest);
router.get("/get-follows", getFollows);
router.get("/token-valid", (req: any, res: Response, next: NextFunction) => {
  res.json({ msg: true });
});
router.get("/get-notifications", getNotifications);
// router.post(
//   "/update-photo",

//   isProduction && uploadOcean
//     ? uploadOcean.single("photo")
//     : upload.single("photo"),

//   updatePhoto
// );

router.post(
  "/update-photo",
  upload.single("photo"),
  profilePhotoUpload,
  updatePhoto
);
router.put("/update-notification-id", saveNotificationId);
router.get(
  "/get-following",
  followerFollowingValidator,
  handleErrors,
  getFollowingList
);
router.get(
  "/get-followers",
  followerFollowingValidator,
  handleErrors,
  getFollowersList
);
export default router;
