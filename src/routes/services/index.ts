import { handleErrors } from "./../../middleware/validation/handleErrors";
import { createPostValidator } from "./../../middleware/validation/inputValidation";
import { Router } from "express";

import { postContent } from "../../controller/services/postContent";
import { postPhoto } from "../../controller/services/postPhoto";
import { upload } from "../../config/multer";
import { getAllPosts } from "../../controller/services/getAllPosts";

const router = Router();

router.post("/post", createPostValidator, handleErrors, postContent);
router.get("/all-posts", getAllPosts);

router.post("/upload-photos",upload.array("photos"), postPhoto);

export default router;
