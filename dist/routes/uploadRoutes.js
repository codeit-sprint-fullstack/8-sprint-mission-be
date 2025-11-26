import express from "express";
import { upload } from "../middlewares/multer";
const router = express.Router();
router.post("/", upload.array("images", 3), (req, res) => {
    const files = req.files.map((f) => `/uploads/${f.filename}`);
    res.status(201).json({ images: files });
});
export default router;
