import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

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

  if (file.mimetype.startsWith("image/")||file.mimetype.startsWith("video/")||file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter,
});
