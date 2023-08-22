import { Response, Request } from "express";
import ffmpeg from "fluent-ffmpeg";
export const postVideo = (req: Request, res: Response) => {
  console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.files);
  const url = req.protocol + "://" + req.get("host");

  if (req.file) {
    const path = `${url}/api/video/${req.file.path.split("\\")[1]}`;
    const process = ffmpeg(`./uploads/${req.file?.path.split("\\")[1]}`);

    //- I generated a thumbnail here, on the frontend, I just need to split the video string and then add jpg 
    process.takeScreenshots({
      count:1,
      timemarks:['4'],
      filename: `${req.file?.path.split("\\")[1].split('.')[0]}.jpg`,
      folder: './uploads'
    })
    console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);

    res.send({ video: path });
  } else {
    res.json({ msg: "Error in upload" });
  }
};
