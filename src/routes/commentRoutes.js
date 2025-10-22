import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:productId", getComments);
router.post("/:productId", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
