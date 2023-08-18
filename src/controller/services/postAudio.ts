import { Response, Request } from "express";

export const postAudio = (req: Request, res: Response) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.files);
  const url = req.protocol + "://" + req.get("host");

  if (req.file) {
    const path = `${url}/api/pic/${req.file.path.split("\\")[1]}`;

    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ audio: path });
  }
};
