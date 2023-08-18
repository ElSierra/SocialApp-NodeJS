import { handleErrors } from "./../../middleware/validation/handleErrors";
import { createPostValidator } from "./../../middleware/validation/inputValidation";
import { Router } from "express";

import { postContent } from "../../controller/services/postContent";
import { postPhoto } from "../../controller/services/postPhoto";
import { upload, uploadAudio, uploadVideo } from "../../config/multer";
import { getAllPosts } from "../../controller/services/getAllPosts";
import { postVideo } from "../../controller/services/postVideo";
import { postAudio } from "../../controller/services/postAudio";

const router = Router();

router.post("/post", createPostValidator, handleErrors, postContent);
router.get("/all-posts", getAllPosts);

router.post("/upload-photos",upload.array("photos"), postPhoto);
router.post("/upload-video",uploadVideo.single("video"), postVideo);
router.post("/upload-audio",uploadAudio.single("audio"), postAudio);

export default router;
