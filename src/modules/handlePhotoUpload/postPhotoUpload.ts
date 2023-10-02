import { NextFunction, Request, Response } from "express";
import imageSize from "image-size";
import { s3Config } from "../../config/multer/digitalOcean";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, unlink } from "fs";

export const postPhotoUpload = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const photo = req?.file;
  console.log("🚀 ~ file: postPhotoUpload.ts:13 ~ photo:", photo);
  if (!photo) {
    return res.status(400).json({ msg: "upload failed" });
  }
  imageSize(`./uploads/${photo?.filename}`, async (err, dimensions) => {
    const filetoUpload = readFileSync(`./uploads/${photo?.filename}`);
    console.log(
      "🚀 ~ file: profilePhotoUpload.ts:24 ~ filetoUpload:",
      filetoUpload
    );
    const fileResults: any = await s3Config.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_NAME as string,
        Key: `${photo?.filename}`,
        Body: filetoUpload,
        ContentType: "image/jpeg",
        ACL: "public-read",
      })
    );
    if (fileResults) {
      unlink(`./uploads/${photo?.filename}`, (err) => {
        if (err) {
          console.log("failed to delete");
        }
      });
      const image = {
        uri: `https://${process.env.SPACES_NAME}.${process.env.SPACES_ENDPOINT_WITHOUT_HTTPS}/${photo?.filename}`,
        width: dimensions?.width,
        height: dimensions?.height,
      };

      if (err) {
        return res.status(400).json({ msg: "upload failed" });
      }
      console.log("🚀 ~ file: postPhotoUpload.ts:48 ~ imageSize ~ image:", image)
      return res.json({ photo: image });
 
    }
    return res.json({ msg: "upload failed" });
  });
};
