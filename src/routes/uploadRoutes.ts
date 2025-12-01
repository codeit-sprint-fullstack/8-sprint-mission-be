import { Router, Request, Response } from "express";
import express from "express";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

interface UploadedFile {
  filename: string;
}

router.post("/", upload.array("images", 3), (req: Request, res: Response) => {
  const files = (req.files as UploadedFile[]).map(
    (f) => `/uploads/${f.filename}`
  );
  res.status(201).json({ images: files });
});

export default router;
