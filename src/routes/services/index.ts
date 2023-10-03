import {
  uploadOcean,
  uploadOceanAudio,
  uploadOceanVideo,
} from "./../../config/multer";
import { handleErrors } from "./../../middleware/validation/handleErrors";
import {
  createPostValidator,
  followValidator,
  followerFollowingValidator,
  getCommentValidator,
  getPostsValidator,
  likeValidator,
  postCommentValidator,
  searchValidator,
} from "./../../middleware/validation/inputValidation";
import { Router } from "express";
import config from "../../config/env";
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
import { unfollowUser } from "../../controller/services/follow/unfollowUser";
import { like } from "../../controller/services/posts/likePost";
import { postComment } from "../../controller/services/posts/postComment";
import { getCommentByPost } from "../../controller/services/posts/getCommentsByPost";
import { getPostByFollowing } from "../../controller/services/posts/getPostByFollowing";
import { getMyPosts } from "../../controller/services/posts/getMyPosts";
import { getGuestPosts } from "../../controller/services/posts/getGuestPosts";
import { rePost } from "../../controller/services/posts/rePost";
import { postPhotoUpload } from "../../modules/handlePhotoUpload/postPhotoUpload";
import { getSinglePost } from "../../controller/services/posts/getSinglePost";
import { deletePostById } from "../../controller/services/posts/deletePostbyId";

const router = Router();
const isProduction = config.stage === "production";
router.post("/post", createPostValidator, handleErrors, postContent);
router.get("/all-posts", getPostsValidator, handleErrors, getAllPosts);
router.get("/random-posts", getRandomPosts);
router.get("/random-people", getRandomFollowers);
router.get("/search-posts", searchValidator, handleErrors, searchForPosts);
router.get("/search-people", searchValidator, handleErrors, searchPeople);
// router.post(
//   "/upload-photos",
//   isProduction && uploadOcean
//     ? uploadOcean.array("photos")
//     : upload.array("photos"),
//   postPhoto
// );

router.post("/upload-photo", upload.single("photo"), postPhotoUpload);

router.post(
  "/upload-video",
  isProduction && uploadOceanVideo
    ? uploadOceanVideo.single("video")
    : uploadVideo.single("video"),
  postVideo
);
router.post(
  "/upload-audio",
  isProduction && uploadOceanAudio
    ? uploadOceanAudio.single("audio")
    : uploadAudio.single("audio"),
  postAudio
);
router.get("/follow", followValidator, handleErrors, followUser);
router.get("/unfollow", followValidator, handleErrors, unfollowUser);
router.get("/like-post", likeValidator, handleErrors, like);
router.post("/post-comment", postCommentValidator, handleErrors, postComment);
router.get(
  "/get-postComment",
  getCommentValidator,
  handleErrors,
  getCommentByPost
);
router.get(
  "/followed-posts",
  getPostsValidator,
  handleErrors,
  getPostByFollowing
);
router.get("/my-posts", getPostsValidator, handleErrors, getMyPosts);
router.get("/single-post", getSinglePost);
router.get("/guest-posts", getPostsValidator, handleErrors, getGuestPosts);
router.get("/re-post", followValidator, handleErrors, rePost);
router.delete("/delete-post", deletePostById);

export default router;
