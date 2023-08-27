import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();
const rootDir = path.resolve(__dirname, "../../../");
console.log("🚀 ~ file: index.ts:6 ~ rootDir:", rootDir);
router.get("/", (req, res) => {
  res.status(200).json({
    msg: "server is up",
  });
});

router.get("/pic/:id", (req, res) => {
  const { id } = req.params;
  const { d } = req.query;


  if (fs.existsSync(path.join(rootDir, "/uploads/", `${id}`))) {
    if (d) {

      return res.download(path.join(rootDir, "/uploads/", `${id}`));
    }
    return res.sendFile(path.join(rootDir, "/uploads/", `${id}`));
  }

  return res.sendFile(path.join(rootDir, "/uploads/", `nopic.png`));
});

router.get("/video/:id", (req, res) => {
  const { id } = req.params;

  if (fs.existsSync(path.join(rootDir, "/uploads/", `${id}`))) {
    return res.sendFile(path.join(rootDir, "/uploads/", `${id}`));
  }

  return res.json(null);
});

router.get("/audio/:id", (req, res) => {
  const { id } = req.params;

  if (fs.existsSync(path.join(rootDir, "/uploads/", `${id}`))) {
    return res.sendFile(path.join(rootDir, "/uploads/", `${id}`));
  }

  return res.json(null);
});
export default router;
