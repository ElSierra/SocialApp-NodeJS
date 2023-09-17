import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { s3Config } from "../../config/multer/digitalOcean";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, unlink } from "fs";

export const profilePhotoUpload = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const photo = req?.file;
  console.log(
    "🚀 ~ file: profilePhotoUpload.ts:5 ~ profilePhotoUpload ~ photo:",
    photo
  );
  if (photo?.mimetype === "image/gif") {
    sharp(`./uploads/${photo?.filename}`, { animated: true })
      .gif()
      .resize(300, 300)
      .toFile(
        `./uploads/${photo?.filename.split(".")[0]}-sm.gif`,
        async (err, info) => {
          console.log(info);
          if (!info) {
            return;
          }
          const filetoUpload = readFileSync(
            `./uploads/${photo?.filename.split(".")[0]}-sm.gif`
          );

          console.log(
            "🚀 ~ file: profilePhotoUpload.ts:24 ~ filetoUpload:",
            filetoUpload
          );
          const fileResults: any = await s3Config.send(
            new PutObjectCommand({
              Bucket: process.env.SPACES_NAME as string,
              Key: `${photo?.filename.split(".")[0]}-sm.gif`,
              Body: filetoUpload,
              ContentType: "image/gif",
              ACL: "public-read",
            })
          );
          if (fileResults) {
            req.imageUri = `https://quick-chop.nyc3.cdn.digitaloceanspaces.com/${
              photo?.filename.split(".")[0]
            }-sm.gif`;
            unlink(
              `./uploads/${photo?.filename.split(".")[0]}-sm.gif`,
              (err) => {
                if (err) {
                  console.log("failed to delete");
                }
              }
            );
            unlink(`./uploads/${photo?.filename}`, (err) => {
              if (err) {
                console.log(err,"failed to delete");
              }
            });
            return next();
          }
        }
      );
  } else {
    sharp(`./uploads/${photo?.filename}`)
      .jpeg({ quality: 90 })
      .resize(600, 600)
      .toFile(
        `./uploads/${photo?.filename.split(".")[0]}-sm.jpg`,
        async (err, info) => {
          console.log(info);
          if (!info) {
            return;
          }
          const filetoUpload = readFileSync(
            `./uploads/${photo?.filename.split(".")[0]}-sm.jpg`
          );
          console.log(
            "🚀 ~ file: profilePhotoUpload.ts:24 ~ filetoUpload:",
            filetoUpload
          );
          const fileResults: any = await s3Config.send(
            new PutObjectCommand({
              Bucket: process.env.SPACES_NAME as string,
              Key: `${photo?.filename.split(".")[0]}-sm.jpg`,
              Body: filetoUpload,
              ContentType: "image/jpeg",
              ACL: "public-read",
            })
          );
          if (fileResults) {
            req.imageUri = `https://quick-chop.nyc3.cdn.digitaloceanspaces.com/${
              photo?.filename.split(".")[0]
            }-sm.jpg`;
            unlink(
              `./uploads/${photo?.filename.split(".")[0]}-sm.jpg`,
              (err) => {
                if (err) {
                  console.log("failed to delete");
                }
              }
            );
            unlink(`./uploads/${photo?.filename}`, (err) => {
              if (err) {
                console.log("failed to delete");
              }
            });
            return next();
          }
        }
      );
  }
};
