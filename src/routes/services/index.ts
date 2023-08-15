import { NextFunction, Request, Response, Router } from "express";
import prisma from "../../lib/prisma/init";
import { upload } from "../../config/multer";
import sharp from "sharp";


const router = Router();

router.post("/post", async (req: any, res: Response, next: NextFunction) => {
  const { id } = req?.user;
  const { audioUri, audioTitle, videoUri, videoTitle, photoUri, postText } =
    req.body;

  try {
    const post = await prisma.post.create({
      data: {
        userId: id,
        photoUri,
        audioTitle,
        audioUri,
        videoUri,
        videoTitle,
        postText,
      },
    });
    if (post) {
      res.json({ msg: "posted" });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/upload-photos", upload.array("photos"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  if (Array.isArray(req.files))
    if (req.files?.length > 0) {
      const path: string[] = [];
      for (let i in req.files) {
        path.push(`${url}/api/pic/${req.files[i].path.split("\\")[1]}`);
      }
      console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);
      
      res.send({photo:path[0]});
    }
});


export default router;
