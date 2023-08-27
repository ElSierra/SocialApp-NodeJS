import { Response, Request } from "express";
import config from "../../../config/env/";
export const postPhoto = (req: any, res: Response) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.files);
  const url = req.protocol + "://" + req.get("host");
  if (config.stage === "production") {
    return res.send({ photo: req.files[0].location });
  }
  if (Array.isArray(req.files))
    if (req.files?.length > 0) {
      const path: string[] = [];
      for (let i in req.files) {
        path.push(`${url}/api/pic/${req.files[i].path.split("\\")[1]}`);
      }
      console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

      res.send({ photo: path[0] });
    } else {
      res.json({ msg: "Error in upload" });
    }
};
