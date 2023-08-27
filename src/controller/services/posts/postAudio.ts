import { Response, Request, NextFunction } from "express";
import config from "../../../config/env/";
export const postAudio = (req: any, res: Response, next: NextFunction) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.file);
  const url = req.protocol + "://" + req.get("host");
  if (config.stage === "production") {
    return res.send({ audio: req.file?.location });
  }
  if (req.file) {
    const path = `${url}/api/pic/${req.file.path.split("\\")[1]}`;

    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ audio: path });
  } else {
    res.json({ msg: "Error in upload" });
  }
};
