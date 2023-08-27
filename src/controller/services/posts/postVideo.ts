import { Response, Request } from "express";
import config from '../../../config/env'
export const postVideo = (req: any, res: Response) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.files);
  const url = req.protocol + "://" + req.get("host");
  if (config.stage === "production") {
    return res.send({ video: req.file?.location });
  }
  if (req.file) {
    const path = `${url}/api/video/${req.file.path.split("\\")[1]}`;

    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ video: path });
  } else {
    res.json({ msg: "Error in upload" });
  }
};
