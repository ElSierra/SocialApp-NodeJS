import { handleErrors } from "./../../middleware/validation/handleErrors";
import { createPostValidator } from "./../../middleware/validation/inputValidation";
import { Router } from "express";

import { upload, uploadAudio, uploadVideo } from "../../config/multer";
import { getAllPosts } from "../../controller/services/posts/getAllPosts";
import { postContent } from "../../controller/services/posts/postContent";
import { getRandomPosts } from "../../controller/services/posts/getRandomPosts";
import { postAudio } from "../../controller/services/posts/postAudio";
import { postPhoto } from "../../controller/services/posts/postPhoto";
import { postVideo } from "../../controller/services/posts/postVideo";
import { followUser } from "../../controller/services/follow/followUser";
import { searchForPosts } from "../../controller/services/posts/searchForPosts";
import { getRandomFollowers } from "../../controller/services/follow/getRandomPeople";
import { searchPeople } from "../../controller/services/follow/searchPeople";

const router = Router();

router.post("/post", createPostValidator, handleErrors, postContent);
router.get("/all-posts", getAllPosts);
router.get("/random-posts", getRandomPosts);
router.get("/random-people", getRandomFollowers);
router.get("/search-posts", searchForPosts);
router.get("/search-people", searchPeople);
router.post("/upload-photos", upload.array("photos"), postPhoto);
router.post("/upload-video", uploadVideo.single("video"), postVideo);
router.post("/upload-audio", uploadAudio.single("audio"), postAudio);
router.get("/follow", followUser);

export default router;
