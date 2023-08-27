import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import multerS3 from "multer-s3";
import { SPACES_ACL, SpacesBucketName, s3Config } from "./digitalOcean";
import config from "../env";
const createUploadFolder = (folderName: string) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
};
createUploadFolder("./uploads/");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
  },
});

const fileFilter = function (
  req: any,
  file: Express.Multer.File,
  cb: Function
) {
  console.log(file);

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."));
  }
};
const fileFilterVideo = function (
  req: any,
  file: Express.Multer.File,
  cb: Function
) {
  console.log(file);

  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only MP4 is supported"));
  }
};

const fileFilterAudio = function (
  req: any,
  file: Express.Multer.File,
  cb: Function
) {
  console.log(file);

  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only MP4 is supported"));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
  fileFilter,
});

export const uploadVideo = multer({
  storage: storage,
  limits: { fileSize: 300000000 },
  fileFilter: fileFilterVideo,
});

export const uploadAudio = multer({
  storage: storage,
  limits: { fileSize: 20000000 },
  fileFilter: fileFilterAudio,
});

export const uploadOcean =
  config.stage === "production" &&
  multer({
    fileFilter,
    limits: { fileSize: 1000000 },
    storage: multerS3({
      s3: s3Config,
      bucket: SpacesBucketName,
      acl: SPACES_ACL.PUBLIC_READ,
      key: function (request: Request, file, cb) {
        cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
      },
    }),
  });

export const uploadOceanAudio =
  config.stage === "production" &&
  multer({
    fileFilter: fileFilterAudio,
    limits: { fileSize: 20000000 },
    storage: multerS3({
      s3: s3Config,
      bucket: SpacesBucketName,
      acl: SPACES_ACL.PUBLIC_READ,
      key: function (request: Request, file, cb) {
        cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
      },
    }),
  });

export const uploadOceanVideo =
  config.stage === "production" &&
  multer({
    fileFilter: fileFilterVideo,
    limits: { fileSize: 300000000 },
    storage: multerS3({
      s3: s3Config,
      bucket: SpacesBucketName,
      acl: SPACES_ACL.PUBLIC_READ,
      key: function (request: Request, file, cb) {
        cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
      },
    }),
  });
