import { Response, Request, NextFunction } from "express";
import config from "../../../config/env";
import ffmpeg from "fluent-ffmpeg";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { s3Config } from "../../../config/multer/digitalOcean";
export const postVideo = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.file);
  const url = req.protocol + "://" + req.get("host");
  if (config.stage === "production") {
    try {
      const videoKey: string = req.file.key;
      console.log(
        "🚀 ~ file: postVideo.ts:17 ~ postVideo ~ videoKey:",
        videoKey
      );
      const videoPresignedUrl = await getSignedUrl(
        s3Config,
        new GetObjectCommand({
          Bucket: process.env.SPACES_NAME as string,
          Key: videoKey,
        })
      );

      const screenshotBuffer: any = await new Promise((resolve, reject) => {
        ffmpeg()
          .input(videoPresignedUrl)
          .screenshots({
            timestamps: ["50%"], // Take a screenshot at 50% of the video's duration
            filename: `${videoKey.split(".")[0]}.jpg`,
            folder: "screenshots", // Optional: Folder within the S3 bucket
          })
          .on("end", () => {
            const screenshotData = fs.readFileSync(
              `./screenshots/${videoKey.split(".")[0]}.jpg`
            );
            console.log(
              "🚀 ~ file: postVideo.ts:35 ~ .on ~ screenshotData:",
              screenshotData
            );

            resolve(screenshotData);
          })
          .on("error", (err) => {
            reject(err);
          });
      });
      const screenshotUploadResult: any = await s3Config.send(
        new PutObjectCommand({
          Bucket: process.env.SPACES_NAME as string,
          Key: "screenshots/" + videoKey.split(".")[0] + "-screenshot.jpg",
          Body: screenshotBuffer,
          ContentType: "image/jpeg",
          ACL: "public-read", // Or your preferred ACL
        })
      );
      console.log(
        "🚀 ~ file: postVideo.ts:53 ~ postVideo ~ screenshotUploadResult:",
        screenshotUploadResult
      );
      if (screenshotUploadResult) {
        return res.send({
          video: req.file?.location,
          thumbNail: `https://quick-chop.nyc3.digitaloceanspaces.com/screenshots/${
            videoKey.split(".")[0]
          }-screenshot.jpg`,
        });
      }
    } catch (e) {
      next(e);
    }
    return res.send({
      video: req.file?.location,
    });
  }
  if (req.file) {
    const path = `${url}/api/video/${req.file.path.split("\\")[1]}`;

    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ video: path });
  } else {
    res.json({ msg: "Error in upload" });
  }
};
