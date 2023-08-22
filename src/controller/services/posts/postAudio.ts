import { Response, Request, NextFunction } from "express";

export const postAudio = (req: Request, res: Response, next: NextFunction) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.file);
  const url = req.protocol + "://" + req.get("host");

  if (req.file) {
    const path = `${url}/api/pic/${req.file.path.split("\\")[1]}`;

    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ audio: path });
  } else {
    res.json({ msg: "Error in upload" });
  }
};
