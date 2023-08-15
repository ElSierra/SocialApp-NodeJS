import { Router } from "express";
import fs from "fs";
import path from "path";
const router = Router();
const rootDir = path.resolve(__dirname, "../../../");
console.log("🚀 ~ file: index.ts:6 ~ rootDir:", rootDir)
router.get("/", (req, res) => {
  res.status(200).json({
    msg: "server is up",
  });
});

router.get("/pic/:id", (req, res) => {
  const { id } = req.params;

  if (fs.existsSync(path.join(rootDir, "/uploads/", `${id}`))) {
    return res.sendFile(path.join(rootDir, "/uploads/", `${id}`));
  }
  return res.sendFile(path.join(rootDir, "/uploads/", `nopic.png`));
});
export default router;
